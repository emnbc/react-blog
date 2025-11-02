"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { internal } from "@/lib/http/internal";
import { Button, Group, Text, Box } from "@mantine/core";

const AppHeader: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      <Box py="md">
        <Group justify="space-between">
          <Text fw={600}>React Blog</Text>
          <Button
            variant="light"
            color="red"
            onClick={onLogout}
            loading={loading}
          >
            Logout
          </Button>
        </Group>
      </Box>
    </header>
  );
};

export default AppHeader;
