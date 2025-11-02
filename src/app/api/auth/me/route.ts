import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { external } from "@/lib/http/external";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await external.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json(data);
  } catch (e: any) {
    const status = e?.response?.status ?? 401;
    return NextResponse.json({ error: "Unauthorized" }, { status });
  }
}
