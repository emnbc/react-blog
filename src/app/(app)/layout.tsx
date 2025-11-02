import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/server/auth";
import AppHeader from "@/components/layout/AppHeader";
import { Container } from "@mantine/core";

const AppLayout: React.FC<{ children: ReactNode }> = async ({ children }) => {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <Container size="xl">
      <AppHeader />
      <section>{children}</section>
    </Container>
  );
};

export default AppLayout;
