import {
  getAdminDashboardAction,
  getCurrentUserAction,
} from "@/app/auth/actions";

import { redirect } from "next/navigation";
import { UserRoles } from "@/types/userType";
import DashPage from "./dashPage";
import { AdminDashboardData } from "@/types/dashboardType";

const Page = async () => {
  const res = await getCurrentUserAction();

  if (!res.success || !res.user || res.user.role !== UserRoles.ADMIN) {
    redirect("/login");
  }
  const dashRes = await getAdminDashboardAction();
 

  return <DashPage data={dashRes.data as AdminDashboardData} />;
};

export default Page;
