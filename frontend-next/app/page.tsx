"use client";

import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Image from "next/image";
import BookCard from "@/components/bookCard";
import { useState } from "react";
import BookDetailsModal from "@/components/bookDetailsModal";
export type FeaturedBook = {
  title: string;
  author: string;
  description?: string;
  imageSrc?: string;
  category?: string;
};

export const featuredBooks: FeaturedBook[] = [
  {
    title: "Dom Casmurro",
    author: "Machado de Assis",
    description:
      "Um clássico sobre memória, ciúme e a dúvida que atravessa a narrativa de Bentinho.",
    imageSrc: "https://m.media-amazon.com/images/I/41UQgnvavyL._SY445_SX342_ML2_.jpg",
    category: "Romance",
  },
  {
    title: "Grande Sertão: Veredas",
    author: "João Guimarães Rosa",
    description:
      "A travessia de Riobaldo pelo sertão mineiro em uma prosa inventiva e arrebatadora.",
    imageSrc: "https://m.media-amazon.com/images/I/51wIXN1Sh-L._SY445_SX342_ML2_.jpg",
    category: "Clássico",
  },
  {
    title: "Quincas Borba",
    author: "Machado de Assis",
    description:
      "O Humanitismo em foco: ambiguidade moral, ironia fina e crítica social.",
    imageSrc: "https://m.media-amazon.com/images/I/412+SGWI4PL._SY445_SX342_ML2_.jpg",
    category: "Romance",
  },
];
export default function Home() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    (typeof featuredBooks)[number] | null
  >(null);
  return (
    <main className="min-h-screen w-full bg-background-login text-background-login-two">
      <section className="w-full bg-primary text-background-login py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 shrink-0 ">
              <Image
                src="/logo.svg"
                alt="Abrigo Literário"
                fill
                className="object-contain"
                priority
                sizes="(min-width:1024px) 7rem, (min-width:640px) 6rem, 5rem"
              />
            </div>

            <div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Abrigo Literário
              </h1>
              <p className="mt-3 text-lg lg:text-xl max-w-2xl">
                Plataforma de gestão de livros para nossa biblioteca virtual.
                Explore obras em destaque, acompanhe eventos e participe da
                comunidade.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-background-login px-5 py-3 text-background-login-two border border-background-login-two hover:opacity-90 transition"
            >
              Entrar
            </Link>
            <Link
              href="/login/signup"
              className="rounded-lg bg-background-login-two px-5 py-3 text-background-login font-semibold border border-background-login hover:opacity-90 transition"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </section>

      <section id="livros" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl lg:text-3xl font-semibold">
          Livros em Destaque
        </h2>
        <p className="mt-2 text-sm text-background-login-two/80">
          Descubra seleções curadas pela nossa comunidade.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((b) => (
            <BookCard
              key={b.title}
              {...b}
              onViewDetails={() => {
                setSelected(b);
                setOpen(true);
              }}
            />
          ))}
        </div>
        <BookDetailsModal
          open={open}
          book={selected ?? undefined}
          onClose={() => {
            setOpen(false);
            setSelected(null);
          }}
        />
      </section>

      <section id="eventos" className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-2xl lg:text-3xl font-semibold">Próximos Eventos</h2>
        <p className="mt-2 text-sm text-background-login-two/80 max-w-2xl">
          Fique atento aos próximos eventos e workshops em nossa biblioteca!
        </p>

        <ul className="mt-6 space-y-4">
          <li className="rounded-xl border border-background-login-two/30 p-4">
            <p className="font-medium">
              Workshop de Escrita Criativa - 10 de Dezembro
            </p>
          </li>
          <li className="rounded-xl border border-background-login-two/30 p-4">
            <p className="font-medium">Clube do Livro - 15 de Dezembro</p>
          </li>
          <li className="rounded-xl border border-background-login-two/30 p-4">
            <p className="font-medium">
              Palestra sobre História da Literatura - 20 de Dezembro
            </p>
          </li>
        </ul>
      </section>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Link
          href="/login"
          aria-label="Ir para Login"
          className="group flex items-center gap-2 rounded-full shadow-lg border border-background-login-two/40
                     bg-background-login-two text-background-login p-3 hover:opacity-90 transition"
          title="Login"
        >
          <LoginIcon fontSize="small" />
          <span className="hidden sm:inline text-sm pr-1">Login</span>
        </Link>

        <Link
          href="/login/signup"
          aria-label="Ir para Cadastro"
          className="group flex items-center gap-2 rounded-full shadow-lg border border-background-login-two/40
                     bg-background-login-two text-background-login p-3 hover:opacity-90 transition"
          title="Cadastro"
        >
          <PersonAddAltIcon fontSize="small" />
          <span className="hidden sm:inline text-sm pr-1">Cadastro</span>
        </Link>
      </div>
    </main>
  );
}
