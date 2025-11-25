import {
  getCurrentUserAction,
  getEmprestimosCurrentUserAction,
} from "@/app/auth/actions";

import { redirect } from "next/navigation";
import { UserRoles } from "@/types/userType";
import { ReaderProfileClient } from "./profileReader";

const Page = async () => {
  const res = await getCurrentUserAction();

  if (!res.success || !res.user || res.user.role !== UserRoles.LEITOR) {
    redirect("/login");
  }
  const loansRes = await getEmprestimosCurrentUserAction();
  return (
    <ReaderProfileClient
      user={res.user}
      loans={loansRes.success ? loansRes.data : []}
    />
  );
};

export default Page;
