import { external } from "@/lib/http/external";
import UsersTable from "./UsersTable";
import { getAuthHeaders } from "@/lib/server/http";
import { Container } from "@mantine/core";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const UsersPage = async () => {
  const { data } = await external.get<User[]>("/users", {
    headers: await getAuthHeaders(),
  });
  return (
    <main>
      <Container size="xl" py="md">
        <UsersTable users={data} />
      </Container>
    </main>
  );
};

export default UsersPage;
