import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

function isAuthed(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  const expected = Buffer.from(`sinsul:${process.env.ADMIN_PASSWORD}`).toString("base64");
  return token === expected;
}

const db = (): SupabaseClient => {
  if (!supabaseAdmin) throw new Error("Supabase 미설정");
  return supabaseAdmin as SupabaseClient;
};

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const { data, error } = await db()
    .from("projects")
    .select("*")
    .order("year", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const body = await req.json();
  const { data, error } = await db().from("projects").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const body = await req.json();
  const { id, ...rest } = body;
  const { data, error } = await db().from("projects").update(rest).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const { id } = await req.json();
  const { error } = await db().from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
