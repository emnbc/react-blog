import { NextResponse } from "next/server";
import { external } from "@/lib/http/external";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "email and password are required" }, { status: 400 });
    }

    const { data } = await external.post<{ accessToken?: string }>(
      "/auth/login",
      { email, password }
    );

    if (!data?.accessToken) {
      return NextResponse.json({ error: "No accessToken in response" }, { status: 502 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("token", data.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (e: any) {
    const status = e?.response?.status ?? 500;
    const message = e?.response?.data?.error || e?.response?.data?.message || "Unexpected error";
    return NextResponse.json({ error: message }, { status });
  }
}
