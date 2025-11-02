import "server-only";
import { cookies } from "next/headers";
import { external } from "@/lib/http/external";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export type Session = { token: string; user: SessionUser } | null;

export async function getSession(): Promise<Session> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const { data: user } = await external.get<SessionUser>("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { token, user };
  } catch {
    return null;
  }
}
