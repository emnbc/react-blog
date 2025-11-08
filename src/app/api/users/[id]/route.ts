import { NextResponse } from "next/server";
import { external } from "@/lib/http/external";
import { getAuthHeaders } from "@/lib/server/http";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const name = body?.name;
    const about = body?.about;
    const email = body?.email;

    const authHeaders = await getAuthHeaders();
    if (!authHeaders?.Authorization) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload: Record<string, any> = {};
    if (typeof name === "string") payload.name = name;
    if (typeof about === "string" && about.length > 0) payload.about = about;
    if (typeof email === "string") payload.email = email;

    const response = await external.put(`/users/${id}`, payload, {
      headers: authHeaders,
    });

    const { data } = response;

    return NextResponse.json(data);
  } catch (e: any) {
    const status = e?.response?.status ?? 500;
    const message = e?.response?.data?.error || e?.response?.data?.message || "Unexpected error";
    return NextResponse.json({ error: message }, { status });
  }
}
