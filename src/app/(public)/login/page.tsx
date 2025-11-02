"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { internal } from "@/lib/http/internal";
import {
  Paper,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Alert,
  Container,
} from "@mantine/core";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("demo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await internal.post("/auth/login", { email, password });
      router.replace("/home");
      router.refresh();
    } catch (e: any) {
      const message =
        e?.response?.data?.error ||
        e?.response?.data?.message ||
        "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} py="xl">
      <Title order={2} mb="md">
        Login
      </Title>
      <Paper withBorder p="md" radius="md">
        <form onSubmit={onSubmit}>
          <Stack>
            {error ? (
              <Alert color="red" title="Error">
                {error}
              </Alert>
            ) : null}
            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              autoComplete="email"
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              autoComplete="current-password"
            />
            <Button type="submit" loading={loading} fullWidth>
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
