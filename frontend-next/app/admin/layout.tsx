import { AppHeader } from "@/components/appHeader";
import { AppMenu, MenuItem } from "@/components/appMenu";
import type { ReactNode } from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

const adminMenu: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <SpaceDashboardIcon />,
  },
  { label: "Livros", href: "/admin/books", icon: <LibraryBooksIcon /> },
    { label: "Perfil", href: "/admin/profile", icon: <RecentActorsIcon /> },

];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
      <AppHeader />

      <div className="flex flex-1 flex-col md:flex-row">
        <AppMenu items={adminMenu} />

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
