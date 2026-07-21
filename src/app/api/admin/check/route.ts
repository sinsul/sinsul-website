import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

function isAuthed(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  const expected = Buffer.from(`sinsul:${process.env.ADMIN_PASSWORD}`).toString("base64");
  return token === expected;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  const checks = {
    supabase_url: url.startsWith("https://") ? "ok" : "missing",
    anon_key: anonKey.length > 10 ? "ok" : "missing",
    service_role_key: serviceKey.length > 10 ? "ok" : "missing",
    admin_password: process.env.ADMIN_PASSWORD ? "ok" : "missing",
    supabase_configured: isSupabaseConfigured,
    supabase_admin_ready: supabaseAdmin !== null,
  };

  // DB 연결 테스트
  let db_test = "skipped";
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from("projects").select("id").limit(1);
      db_test = error ? `error: ${error.message}` : "ok";
    } catch (e) {
      db_test = `exception: ${(e as Error).message}`;
    }
  }

  return NextResponse.json({ ...checks, db_test });
}
