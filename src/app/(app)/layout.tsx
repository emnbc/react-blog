import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/server/auth";
import AppHeader from "@/components/layout/AppHeader";

const AppLayout: React.FC<{ children: ReactNode }> = async ({ children }) => {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <>
      <AppHeader userName={session.user.name} />
      <section>{children}</section>
    </>
  );
};

export default AppLayout;
