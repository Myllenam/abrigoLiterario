export type Categoria = {
  id: number;
  nome: string;
};

export type Autor = {
  id: number;
  nome: string;
};

export type BookType = {
  id: number;
  titulo: string;
  descricao?: string;
  urlCapa?: string;
  autor?: Autor | null;
  categoria?: Categoria | null;
};

export type LivroFilters = {
  titulo?: string;
  autorId?: string;
  categoriaId?: string;
};
