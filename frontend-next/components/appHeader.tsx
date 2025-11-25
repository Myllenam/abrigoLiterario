"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/app/auth/actions";
import { toast } from "./toast";

type AppHeaderProps = {
  logoSrc?: string;
  appName?: string;
};

function getPageTitle(pathname: string): string {
  if (!pathname || pathname === "/") return "Início";

  const segments = pathname.split("/").filter(Boolean);
  const [section, page] = segments;

  if (section === "admin") {
    if (page === "dashboard") return "Dashboard do Admin";
    if (page === "books") return "Gerenciar Livros";
    if (page === "profile") return "Meu Perfil";
    return "Área Administrativa";
  }

  if (section === "reader") {
    if (page === "books") return "Livros para Leitura";
    if (page === "profile") return "Meu Perfil";
    if (page === "loans") return "Meus Empréstimos";
    return "Área do Leitor";
  }

  const last = segments[segments.length - 1];
  return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, " ");
}

export function AppHeader({
  logoSrc = "/logo.svg",
  appName = "Abrigo Literário",
}: AppHeaderProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname || "/");

  const logout = () => {
    logoutAction();
    toast.success("Usuário deslogado");
  };

  return (
    <header className="h-16 w-full bg-white text-gray-500 flex items-center gap-4 px-4 sm:px-6 border-b border-primary/40">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9 sm:h-10 sm:w-10">
            <Image
              src={logoSrc}
              alt={appName}
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <span className="hidden sm:inline text-lg font-semibold">
            {appName}
          </span>
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <h1 className="text-sm sm:text-base md:text-lg font-medium truncate max-w-[60vw] text-center">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center justify-end">
        <form action={logout}>
          <button
            type="submit"
            className="inline-flex items-center rounded-full border border-background-login-two/40
                       bg-background-login-two px-3 py-1.5 text-xs sm:text-sm font-medium
                       text-background-login hover:opacity-90 transition"
          >
            Sair
          </button>
        </form>
      </div>
    </header>
  );
}
