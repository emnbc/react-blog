"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Group, Stack, TextInput, Textarea, Alert } from "@mantine/core";
import { internal } from "@/lib/http/internal";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  about?: string;
};

const UserEditForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const [name, setName] = useState<string>(user.name ?? "");
  const [about, setAbout] = useState<string>(user.about ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await internal.put(`/users/${user.id}`, { name, about, email: user.email });
      router.refresh();
    } catch (e: any) {
      const message =
        e?.response?.data?.error ||
        e?.response?.data?.message ||
        e?.message ||
        "Update failed";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        {error ? (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        ) : null}
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter name"
          required
        />
        <TextInput label="Email" value={user.email} disabled />
        <Textarea
          label="About"
          value={about}
          onChange={(e) => setAbout(e.currentTarget.value)}
          placeholder="Short introduction about the user"
          autosize
          minRows={3}
        />
        <Group justify="flex-end">
          <Button type="submit" loading={saving} disabled={saving}>
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default UserEditForm;
