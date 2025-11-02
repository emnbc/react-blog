"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { internal } from "@/lib/http/internal";
import {
  Button,
  UnstyledButton,
  Group,
  Text,
  Container,
  Title,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Divider,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import styles from "./AppHeader.module.css";

const AppHeader: React.FC<{ userName: string }> = ({ userName }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  async function onLogout() {
    setLoading(true);
    try {
      await internal.post("/auth/logout");
      router.replace("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <header>
      <Container size="xl" py="md">
        <Group justify="space-between">
          <Title order={1}>
            <Link href="/home" style={{ textDecoration: "none", color: "inherit" }}>
              React Blog
            </Link>
          </Title>
          <Group gap="sm">
            <UnstyledButton
              component={Link}
              href="/home"
              aria-current={pathname === "/home" ? "page" : undefined}
              className={styles.navLink}
              style={{
                opacity: pathname === "/home" ? 1 : 0.8,
              }}
            >
              Home
            </UnstyledButton>
            <UnstyledButton
              component={Link}
              href="/users"
              aria-current={pathname.startsWith("/users") ? "page" : undefined}
              className={styles.navLink}
              style={{
                opacity: pathname.startsWith("/users") ? 1 : 0.8,
              }}
            >
              Users
            </UnstyledButton>
            <UnstyledButton
              component={Link}
              href="/posts"
              aria-current={pathname.startsWith("/posts") ? "page" : undefined}
              className={styles.navLink}
              style={{
                opacity: pathname.startsWith("/posts") ? 1 : 0.8,
              }}
            >
              All Posts
            </UnstyledButton>
          </Group>
          <Group gap="sm" align="center">
            <Text fw={500}>{userName}</Text>
            {mounted && (
              <ActionIcon
                variant="default"
                size="lg"
                aria-label="Toggle color scheme"
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light"
                  )
                }
              >
                {computedColorScheme === "dark" ? (
                  <IconSun size={20} />
                ) : (
                  <IconMoon size={20} />
                )}
              </ActionIcon>
            )}
            <Button
              variant="light"
              color="red"
              onClick={onLogout}
              loading={loading}
            >
              Logout
            </Button>
          </Group>
        </Group>
      </Container>
      <Divider />
    </header>
  );
};

export default AppHeader;
