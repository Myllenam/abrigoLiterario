import { getCurrentUserAction } from "@/app/auth/actions";

import { redirect } from "next/navigation";
import { UserRoles } from "@/types/userType";
import { AdminProfileClient } from "./profileAdmin";

const Page = async () => {
  const res = await getCurrentUserAction();
console.log(res.user)
  if (!res.success || !res.user || res.user.role !== UserRoles.ADMIN) {
    redirect("/login");
  }

  return <AdminProfileClient user={res.user} />;
};

export default Page;
