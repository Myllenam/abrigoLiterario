import { getCurrentUserAction } from "@/app/auth/actions";

import { redirect } from "next/navigation";
import { UserRoles } from "@/types/userType";
import BooksPage from "./booksPage";

const Page = async () => {
  const res = await getCurrentUserAction();

  if (!res.success || !res.user || res.user.role !== UserRoles.LEITOR) {
    redirect("/login");
  }

  return <BooksPage />;
};

export default Page;
