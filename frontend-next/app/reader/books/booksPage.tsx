"use client";

import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Autor, BookType, Categoria, LivroFilters } from "@/types/bookType";
import {
  createEmprestimoAction,
  getAutoresAction,
  getCategoriasAction,
  getLivrosAction,
} from "@/app/auth/actions";
import BookCard from "@/components/bookCard";
import BookDetailsModal from "@/components/bookDetailsModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/components/toast";

const defaultFilters: LivroFilters = {
  titulo: "",
  autorId: "",
  categoriaId: "",
};

const BooksPage = () => {
  const [livros, setLivros] = useState<BookType[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLivro, setSelectedLivro] = useState<BookType | null>(null);
  const [isPending, startTransition] = useTransition();
  const [borrowingBookId, setBorrowingBookId] = useState<number | null>(null);
  const { register, control, handleSubmit, reset, getValues } =
    useForm<LivroFilters>({
      defaultValues: defaultFilters,
    });

  const carregarFiltrosIniciais = async () => {
    try {
      const [autoresRes, categoriasRes] = await Promise.all([
        getAutoresAction(),
        getCategoriasAction(),
      ]);

      if (autoresRes.success) setAutores(autoresRes.data);
      if (categoriasRes.success) setCategorias(categoriasRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const carregarLivros = async (filtersParam?: LivroFilters) => {
    const filters = filtersParam ?? getValues();

    setLoading(true);
    setError(null);

    try {
      const res = await getLivrosAction(filters);
      if (!res.success) {
        setError(res.message ?? "Erro ao carregar livros");
        setLivros([]);
        return;
      }
      setLivros(res.data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Erro ao carregar livros");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (values: LivroFilters) => {
    carregarLivros(values);
  };

  const resetFilters = () => {
    reset(defaultFilters);
    carregarLivros(defaultFilters);
  };

  const handleBorrowBook = (livroId: number) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    const dueStr = dueDate.toISOString().slice(0, 10);

    startTransition(async () => {
      setBorrowingBookId(livroId);
      const res = await createEmprestimoAction({
        livroId,
        dataDevolucao: dueStr,
      });

      if (res.success) {
        toast.success("Empréstimo registrado com sucesso!");
      } else {
        toast.error(res.message ?? "Erro ao registrar empréstimo");
      }

      setBorrowingBookId(null);
    });
  };

  useEffect(() => {
    (async () => {
      await carregarFiltrosIniciais();
      await carregarLivros(defaultFilters);
    })();

    return () => {
      setAutores([]);
      setCategorias([]);
      setLivros([]);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <section className="mt-2 rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4 sm:p-5">
        <h2 className="text-lg font-semibold mb-3">Filtrar livros</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-background-login-two/80">
              Título
            </label>
            <Input placeholder="Digite o título" {...register("titulo")} />
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-medium text-background-login-two/80">
              Autor
            </label>
            <Controller
              control={control}
              name="autorId"
              render={({ field }) => (
                <Select
                  value={
                    field.value && field.value !== "" ? field.value : "all"
                  }
                  onValueChange={(value) =>
                    field.onChange(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {autores.map((a) => (
                      <SelectItem key={a.id} value={String(a.id)}>
                        {a.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-background-login-two/80">
              Categoria
            </label>
            <Controller
              control={control}
              name="categoriaId"
              render={({ field }) => (
                <Select
                  value={
                    field.value && field.value !== "" ? field.value : "all"
                  }
                  onValueChange={(value) =>
                    field.onChange(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categorias.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex items-end gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Filtrando..." : "Filtrar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={resetFilters}
              disabled={loading}
            >
              Limpar
            </Button>
          </div>
        </form>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Livros disponíveis</h2>

        {loading && livros.length === 0 ? (
          <p className="text-sm text-muted-foreground">Carregando livros...</p>
        ) : livros.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum livro encontrado com os filtros selecionados.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {livros.map((livro) => (
              <BookCard
                key={livro.id}
                title={livro.titulo}
                author={livro.autor?.nome ?? "Autor desconhecido"}
                description={livro.descricao}
                category={livro.categoria?.nome}
                imageSrc={livro.urlCapa}
                onViewDetails={() => setSelectedLivro(livro)}
                onBorrow={() => handleBorrowBook(livro.id)}
                borrowing={borrowingBookId === livro.id || isPending}
              />
            ))}
          </div>
        )}
      </section>

      <BookDetailsModal
        open={!!selectedLivro}
        onClose={() => setSelectedLivro(null)}
        book={
          selectedLivro
            ? {
                title: selectedLivro.titulo,
                author: selectedLivro.autor?.nome ?? "Autor desconhecido",
                description: selectedLivro.descricao,
                imageSrc: selectedLivro.urlCapa,
                category: selectedLivro.categoria?.nome,
              }
            : undefined
        }
      />
    </div>
  );
};

export default BooksPage;
