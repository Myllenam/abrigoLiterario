"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { ReactNode } from "react";

export type MenuItem = {
  label: string;
  href: string;
  icon?: ReactNode; 
};

type AppMenuProps = {
  items: MenuItem[];
  className?: string;
};

export function AppMenu({ items, className }: AppMenuProps) {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        "bg-[#FBF8F4] text-background-login border-b md:border-b-0 md:border-r border-background-login-two/20",
        "flex md:flex-col w-full md:w-64 md:min-h-[calc(100vh-64px)]",
        className
      )}
    >
      <ul className="flex md:flex-col w-full overflow-x-auto md:overflow-visible gap-3 lg:pt-3">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <li key={item.href} className="flex-1 md:flex-none">
              <Link
                href={item.href}
                className={clsx(
                  "flex items-center gap-2 px-4 py-3 text-sm md:text-base border-b md:border-b-0 md:border-l-4 transition",
                  isActive
                    ? "bg-primary text-background-login hover:bg-primary/90 md:border-l-primary"
                    : "bg-background-login text-background-login-two md:bg-background-login md:text-background-login-two md:border-l-transparent hover:bg-background-login/70"
                )}
              >
                {item.icon && (
                  <span className="flex items-center justify-center">
                    {item.icon}
                  </span>
                )}

                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
