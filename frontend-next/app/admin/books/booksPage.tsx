"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/bookCard";
import BookDetailsModal from "@/components/bookDetailsModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createAutorAction,
  createCategoriaAction,
  createLivroAction,
  deleteLivroAction,
  getAutoresAction,
  getCategoriasAction,
  getLivrosAction,
  type LivroSavePayload,
  updateLivroAction,
} from "@/app/auth/actions";

import { Autor, BookType, Categoria, LivroFilters } from "@/types/bookType";

import { AddAuthorModal } from "./components/addAuthorModal";
import { AddCategoryModal } from "./components/addCategoryModal";
import { DeleteBookModal } from "./components/deleteBookModal";
import { toast } from "@/components/toast";

const defaultFilters: LivroFilters = {
  titulo: "",
  autorId: "",
  categoriaId: "",
};

const bookFormSchema = z.object({
  titulo: z.string().min(2, "O título deve ter ao menos 2 caracteres"),
  descricao: z.string().optional(),
  capaUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  autorId: z.string().min(1, "Selecione um autor"),
  categoriaId: z.string().min(1, "Selecione uma categoria"),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

const BooksPage = () => {
  const [livros, setLivros] = useState<BookType[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedLivro, setSelectedLivro] = useState<BookType | null>(null);

  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookType | null>(null);
  const [authorModalOpen, setAuthorModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookType | null>(null);

  const handleNewAuthor = () => setAuthorModalOpen(true);
  const handleNewCategory = () => setCategoryModalOpen(true);
  const handleAskDeleteBook = (book: BookType) => {
    setBookToDelete(book);
    setDeleteModalOpen(true);
  };

  const {
    register: registerFilter,
    control: controlFilter,
    handleSubmit: handleSubmitFilter,
    reset: resetFilter,
    getValues: getFilterValues,
  } = useForm<LivroFilters>({
    defaultValues: defaultFilters,
  });

  const {
    register: registerBook,
    control: controlBook,
    handleSubmit: handleSubmitBook,
    reset: resetBookForm,
    formState: { errors: bookErrors, isSubmitting: isSubmittingBook },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      capaUrl: "",
      autorId: "",
      categoriaId: "",
    },
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
    const filters = filtersParam ?? getFilterValues();

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

  const onSubmitFilters = (values: LivroFilters) => {
    carregarLivros(values);
  };

  const resetFilters = () => {
    resetFilter(defaultFilters);
    carregarLivros(defaultFilters);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNewBookModal = () => {
    setEditingBook(null);
    resetBookForm({
      titulo: "",
      descricao: "",
      capaUrl: "",
      autorId: "",
      categoriaId: "",
    });
    setBookModalOpen(true);
  };

  const openEditBookModal = (book: BookType) => {
    setEditingBook(book);
    resetBookForm({
      titulo: book.titulo ?? "",
      descricao: book.descricao ?? "",
      capaUrl: book.urlCapa ?? "",
      autorId: book.autor?.id ? String(book.autor.id) : "",
      categoriaId: book.categoria?.id ? String(book.categoria.id) : "",
    });
    setBookModalOpen(true);
  };

  const closeBookModal = () => {
    setBookModalOpen(false);
    setEditingBook(null);
  };

  const onSubmitBook = async (values: BookFormValues) => {
    if (
      values.descricao &&
      (values.descricao.length < 10 || values.descricao.length > 1000)
    ) {
      toast.error("A descrição deve ter entre 10 e 1000 caracteres");
      return;
    }

    const payload: LivroSavePayload = {
      titulo: values.titulo,
      descricao: values.descricao ?? "",
      urlCapa: values.capaUrl || "",
      autorId: values.autorId,
      categoriaId: values.categoriaId,
    };

    if (editingBook) {
      const res = await updateLivroAction(editingBook.id, payload);
      if (res.success) {
        toast.success(res.message);
        await carregarLivros();
        closeBookModal();
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await createLivroAction(payload);
      if (res.success) {
        toast.success(res.message);
        await carregarLivros();
        closeBookModal();
      } else {
        toast.error(res.message);
      }
    }
  };

  const handleConfirmDeleteBook = async () => {
    if (!bookToDelete) return;
    const res = await deleteLivroAction(bookToDelete.id);

    if (res.success) {
      toast.success(res.message);
      await carregarLivros();
    } else {
      toast.error(res.message);
    }

    setDeleteModalOpen(false);
    setBookToDelete(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <AddAuthorModal
        open={authorModalOpen}
        onClose={() => setAuthorModalOpen(false)}
        onConfirm={async (name) => {
          const res = await createAutorAction(name);

          if (res.success) {
            toast.success(res.message);
            await carregarFiltrosIniciais();
          } else {
            toast.error(res.message);
          }

          setAuthorModalOpen(false);
        }}
      />

      <AddCategoryModal
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onConfirm={async (name) => {
          const res = await createCategoriaAction(name);

          if (res.success) {
            toast.success(res.message);
            await carregarFiltrosIniciais();
          } else {
            toast.error(res.message);
          }

          setCategoryModalOpen(false);
        }}
      />

      <DeleteBookModal
        open={deleteModalOpen}
        bookTitle={bookToDelete?.titulo}
        onCancel={() => {
          setDeleteModalOpen(false);
          setBookToDelete(null);
        }}
        onConfirm={handleConfirmDeleteBook}
      />

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Gerenciar livros</h1>
          <p className="text-sm text-background-login-two/70">
            Cadastre novos livros, autores e categorias, além de gerenciar o
            acervo.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={openNewBookModal}>
            Novo livro
          </Button>
          <Button type="button" variant="outline" onClick={handleNewAuthor}>
            Novo autor
          </Button>
          <Button type="button" variant="outline" onClick={handleNewCategory}>
            Nova categoria
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-background-login-two/20 bg-[#FBF8F4] p-4 sm:p-5">
        <h2 className="text-lg font-semibold mb-3">Filtrar livros</h2>

        <form
          onSubmit={handleSubmitFilter(onSubmitFilters)}
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-background-login-two/80">
              Título
            </label>
            <Input
              placeholder="Digite o título"
              {...registerFilter("titulo")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-background-login-two/80">
              Autor
            </label>
            <Controller
              control={controlFilter}
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
                  <SelectTrigger className="h-9 w-full">
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
              control={controlFilter}
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
                  <SelectTrigger className="h-9 w-full">
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
        <h2 className="text-xl font-semibold">Acervo</h2>

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
                isAdmin
                onEdit={() => openEditBookModal(livro)}
                onDelete={() => handleAskDeleteBook(livro)}
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

      {bookModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeBookModal}
        >
          <div className="absolute inset-0 bg-black/50" />

          <div
            className="relative z-10 w-[92%] max-w-xl rounded-2xl bg-background-login text-background-login-two shadow-xl border border-background-login-two/30 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {editingBook ? "Editar livro" : "Novo livro"}
              </h2>
              <button
                type="button"
                onClick={closeBookModal}
                className="text-sm border border-background-login-two/40 rounded-md px-3 py-1 hover:bg-background-login-two/10"
              >
                Fechar
              </button>
            </div>

            <form
              onSubmit={handleSubmitBook(onSubmitBook)}
              className="space-y-3"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-background-login-two/80">
                  Título
                </label>
                <Input
                  placeholder="Título do livro"
                  {...registerBook("titulo")}
                />
                {bookErrors.titulo && (
                  <p className="text-xs text-red-500">
                    {bookErrors.titulo.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-background-login-two/80">
                  Descrição
                </label>
                <textarea
                  className="min-h-[80px] rounded-md border border-input bg-background-login px-3 py-2 text-sm outline-none"
                  placeholder="Breve descrição do livro"
                  {...registerBook("descricao")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-background-login-two/80">
                  URL da capa (opcional)
                </label>
                <Input placeholder="https://..." {...registerBook("capaUrl")} />
                {bookErrors.capaUrl && (
                  <p className="text-xs text-red-500">
                    {bookErrors.capaUrl.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-background-login-two/80">
                    Autor
                  </span>
                  <Controller
                    control={controlBook}
                    name="autorId"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder="Selecione um autor" />
                        </SelectTrigger>
                        <SelectContent>
                          {autores.map((a) => (
                            <SelectItem key={a.id} value={String(a.id)}>
                              {a.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {bookErrors.autorId && (
                    <p className="text-xs text-red-500">
                      {bookErrors.autorId.message}
                    </p>
                  )}
                </div>

                {/* Categoria */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-background-login-two/80">
                    Categoria
                  </span>
                  <Controller
                    control={controlBook}
                    name="categoriaId"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                              {c.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {bookErrors.categoriaId && (
                    <p className="text-xs text-red-500">
                      {bookErrors.categoriaId.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeBookModal}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmittingBook}>
                  {isSubmittingBook
                    ? "Salvando..."
                    : editingBook
                    ? "Salvar alterações"
                    : "Criar livro"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
