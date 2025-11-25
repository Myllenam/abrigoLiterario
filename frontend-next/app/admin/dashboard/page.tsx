import { getCurrentUserAction } from "@/app/auth/actions";

import { redirect } from "next/navigation";
import { UserRoles } from "@/types/userType";
import DashPage from "./dashPage";

const Page = async () => {
  const res = await getCurrentUserAction();

  if (!res.success || !res.user || res.user.role !== UserRoles.ADMIN) {
    redirect("/login");
  }

  return <DashPage />;
};

export default Page;
