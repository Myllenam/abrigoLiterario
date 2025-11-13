import type { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-offWhite">
      oi
      <main className="w-full flex-1 overflow-y-auto pr-[30px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
