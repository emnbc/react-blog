import dayjs from "dayjs";
import {
  Container,
  Group,
  Title,
  Text,
  Paper,
  Stack,
  Divider,
  Avatar,
  Badge,
} from "@mantine/core";
import { external } from "@/lib/http/external";
import { getAuthHeaders } from "@/lib/server/http";
import UserEditForm from "./UserEditForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  about?: string;
};

const UserPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const { data } = await external.get<User>(`/users/${id}`, {
    headers: await getAuthHeaders(),
  });


  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main>
      <Container size="xl" py="md">
        <Paper withBorder radius="md" p="lg">
          <Group align="center" justify="space-between">
            <Group align="center">
              <Avatar radius="xl" size={64}>
                {initials}
              </Avatar>
              <Stack gap="xs">
                <Title order={2}>{data.name}</Title>
                <Group gap="sm">
                  <Text c="dimmed">{data.email}</Text>
                  <Divider orientation="vertical" />
                  <Text c="dimmed">
                    Created: {dayjs(String(data.createdAt)).format("YYYY-MM-DD HH:mm")}
                  </Text>
                  <Badge variant="light">ID: {data.id}</Badge>
                </Group>
              </Stack>
            </Group>
          </Group>
        </Paper>

        <Stack gap="lg" mt="lg">
          <Paper withBorder radius="md" p="lg">
            <Title order={4}>About</Title>
            <Text mt="sm">{data.about ?? "No description yet."}</Text>
          </Paper>

          <Paper withBorder radius="md" p="lg">
            <Title order={4}>Edit</Title>
            <UserEditForm user={data} />
          </Paper>
        </Stack>
      </Container>
    </main>
  );
};

export default UserPage;
