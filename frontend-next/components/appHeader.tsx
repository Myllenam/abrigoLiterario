"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    if (page === "users") return "Gerenciar Usuários";
    if (page === "books") return "Gerenciar Livros";
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

  return (
    <header className="h-16 w-full bg-white text-gray-500 flex items-center justify-between px-4 sm:px-6 border-b border-primary/40">
      <div className="flex items-center gap-3">
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

      {/* Nome da página atual */}
      <div className="flex-1 flex justify-end sm:justify-center pr-2 sm:pr-0">
        <h1 className="text-sm sm:text-base md:text-lg font-medium truncate max-w-[60vw] text-right sm:text-center">
          {pageTitle}
        </h1>
      </div>
    </header>
  );
}
