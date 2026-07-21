import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function isAuthed(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  const expected = Buffer.from(`sinsul:${process.env.ADMIN_PASSWORD}`).toString("base64");
  return token === expected;
}

const db = () => { if (!supabaseAdmin) throw new Error("Supabase 미설정"); return supabaseAdmin; };

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  try {
    const { data, error } = await db().from("inquiries").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? []);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const { id } = await req.json();
  const { error } = await db().from("inquiries").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
