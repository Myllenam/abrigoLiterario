"use server";

import { Autor, BookType, Categoria, LivroFilters } from "@/types/bookType";
import { UsuarioType } from "@/types/userType";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE = process.env.BACKEND!;
if (!BASE) throw new Error("BACKEND ausente no .env.local");

type LoginPayload = { email: string; senha: string };
type SignupPayload = {
  nome: string;
  email: string;
  senha: string;
  role: "ADMIN" | "LEITOR";
};
export type LivroSavePayload = {
  titulo: string;
  descricao: string;
  urlCapa?: string | null;
  autorId: string | number;
  categoriaId: string | number;
};

type CreateEmprestimoPayload = {
  livroId: number;
  dataDevolucao: string;
};

export type LoanType = {
  id: number;
  dataEmprestimo: string;
  dataDevolucao: string;
  livro: BookType;
};
function buildLivroBody(values: LivroSavePayload) {
  return {
    titulo: values.titulo,
    descricao: values.descricao,
    urlCapa: values.urlCapa ?? "",
    autor: { id: Number(values.autorId) },
    categoria: { id: Number(values.categoriaId) },
  };
}
async function api<T = any>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  const ct = res.headers.get("content-type");
  const isJson = ct?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data as T;
}

export async function loginAction(values: LoginPayload) {
  try {
    const user = await api<UsuarioType>("/api/usuarios/login", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const cookieStore = await cookies();

    cookieStore.set("user_role", user.role, {
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("user_id", String(user.id), {
      sameSite: "lax",
      path: "/",
    });

    return {
      success: true as const,
      message: "Usuário autenticado com sucesso",
      user,
    };
  } catch (e: any) {
    return {
      success: false as const,
      message: e?.message ?? "Erro ao autenticar o usuário",
      user: null,
    };
  }
}

export async function signupAction(values: SignupPayload) {
  try {
    const user = await api<UsuarioType>("/api/usuarios", {
      method: "POST",
      body: JSON.stringify(values),
    });

    return {
      success: true as const,
      message: "Usuário cadastrado com sucesso",
      user,
    };
  } catch (e: any) {
    return {
      success: false as const,
      message: e?.message ?? "Erro ao cadastrar o usuário",
      user: null,
    };
  }
}

export async function getCurrentUserAction() {
  try {
    const cookieStore = await cookies();
    const id = cookieStore.get("user_id")?.value;

    if (!id) {
      return {
        success: false as const,
        user: null as UsuarioType | null,
        message: "Usuário não autenticado",
      };
    }

    const user = await api<UsuarioType>(`/api/usuarios/${id}`, {
      method: "GET",
    });

    return {
      success: true as const,
      user,
    };
  } catch (e: any) {
    return {
      success: false as const,
      user: null as UsuarioType | null,
      message: e?.message ?? "Erro ao carregar usuário atual",
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("user_role");
  cookieStore.delete("user_id");

  redirect("/");
}

export async function getCategoriasAction() {
  try {
    const data = await api<Categoria[]>("/api/categorias", {
      method: "GET",
    });

    return {
      success: true as const,
      data,
    };
  } catch (e: any) {
    return {
      success: false as const,
      data: [] as Categoria[],
      message: e?.message ?? "Erro ao carregar categorias",
    };
  }
}

export async function getAutoresAction() {
  try {
    const data = await api<Autor[]>("/api/autores", {
      method: "GET",
    });

    return {
      success: true as const,
      data,
    };
  } catch (e: any) {
    return {
      success: false as const,
      data: [] as Autor[],
      message: e?.message ?? "Erro ao carregar autores",
    };
  }
}

export async function getLivrosAction(filters: LivroFilters) {
  try {
    const params = new URLSearchParams();

    if (filters.titulo) params.append("titulo", filters.titulo);
    if (filters.autorId) params.append("autor", filters.autorId);
    if (filters.categoriaId) params.append("categoria", filters.categoriaId);

    const query = params.toString();
    const q = query ? `?${query}` : "";

    const data = await api<BookType[]>(`/api/livros${q}`, {
      method: "GET",
    });

    return {
      success: true as const,
      data,
    };
  } catch (e: any) {
    return {
      success: false as const,
      data: [] as BookType[],
      message: e?.message ?? "Erro ao carregar livros",
    };
  }
}

export async function createLivroAction(values: LivroSavePayload) {
  try {
    const body = buildLivroBody(values);

    const data = await api<BookType>("/api/livros", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return {
      success: true as const,
      data,
      message: "Livro criado com sucesso",
    };
  } catch (e: any) {
    return {
      success: false as const,
      data: null as BookType | null,
      message: e?.message ?? "Erro ao criar o livro",
    };
  }
}

export async function updateLivroAction(
  id: number | string,
  values: LivroSavePayload
) {
  try {
    const body = {
      id,
      ...buildLivroBody(values),
    };

    const data = await api<BookType>(`/api/livros/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    return {
      success: true as const,
      data,
      message: "Livro atualizado com sucesso",
    };
  } catch (e: any) {
    return {
      success: false as const,
      data: null as BookType | null,
      message: e?.message ?? "Erro ao atualizar o livro",
    };
  }
}

export async function deleteLivroAction(id: number | string) {
  try {
    await api<unknown>(`/api/livros/${id}`, {
      method: "DELETE",
    });

    return {
      success: true as const,
      message: "Livro removido com sucesso",
    };
  } catch (e: any) {
    return {
      success: false as const,
      message: e?.message ?? "Erro ao remover o livro",
    };
  }
}

export async function createAutorAction(nome: string) {
  try {
    const body: {
      nome: string;
    } = { nome };

    const data = await api<Autor>("/api/autores", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return {
      success: true as const,
      data,
      message: "Autor criado com sucesso",
    };
  } catch (e: any) {
    return {
      success: false as const,
      data: null as Autor | null,
      message: e?.message ?? "Erro ao criar autor",
    };
  }
}

export async function createCategoriaAction(nome: string) {
  try {
    const body: {
      nome: string;
    } = { nome };

    const data = await api<Categoria>("/api/categorias", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return {
      success: true as const,
      data,
      message: "Categoria criada com sucesso",
    };
  } catch (e: any) {
    return {
      success: false as const,
      data: null as Categoria | null,
      message: e?.message ?? "Erro ao criar categoria",
    };
  }
}

export async function updateUserProfileAction(values: UsuarioType) {
  try {
    const body = {
      id: values.id,
      nome: values.nome,
      email: values.email,
      role: values.role,
      senha: values.senha,
    };

    const updatedUser = await api<UsuarioType>(`/api/usuarios/${values.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    return {
      success: true as const,
      user: updatedUser,
      message: "Perfil atualizado com sucesso",
    };
  } catch (e: any) {
    return {
      success: false as const,
      user: null,
      message: e?.message ?? "Erro ao atualizar o perfil",
    };
  }
}

export async function createEmprestimoAction(payload: CreateEmprestimoPayload) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return {
        success: false as const,
        message: "Usuário não autenticado",
        data: null,
      };
    }

    const body = {
      usuarioId: Number(userId),
      livroId: payload.livroId,
      dataDevolucao: payload.dataDevolucao,
    };

    const data = await api<any>("/api/emprestimos", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return {
      success: true as const,
      message: "Empréstimo registrado com sucesso",
      data,
    };
  } catch (e: any) {
    return {
      success: false as const,
      message: e?.message ?? "Erro ao registrar empréstimo",
      data: null,
    };
  }
}

export async function getEmprestimosCurrentUserAction() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return {
        success: false as const,
        data: [] as LoanType[],
        message: "Usuário não autenticado",
      };
    }

    const data = await api<LoanType[]>(`/api/emprestimos/usuario/${userId}`, {
      method: "GET",
    });

    return {
      success: true as const,
      data,
    };
  } catch (e: any) {
    return {
      success: false as const,
      data: [] as LoanType[],
      message: e?.message ?? "Erro ao carregar empréstimos",
    };
  }
}
