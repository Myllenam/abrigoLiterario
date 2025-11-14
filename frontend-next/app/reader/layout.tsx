import { AppHeader } from "@/components/appHeader";
import { AppMenu, MenuItem } from "@/components/appMenu";
import type { ReactNode } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

const readerMenu: MenuItem[] = [
  { label: "Livros", href: "/reader/books", icon: <LibraryBooksIcon /> },
  { label: "Perfil", href: "/reader/profile", icon: <RecentActorsIcon /> },
];

export default function ReaderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
      <AppHeader />

      <div className="flex flex-1 flex-col md:flex-row">
        <AppMenu items={readerMenu} />

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
