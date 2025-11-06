import "server-only";
import { cookies } from "next/headers";

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
