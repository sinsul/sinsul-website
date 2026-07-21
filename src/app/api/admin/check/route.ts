import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

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

  const checks: Record<string, unknown> = {
    supabase_url: url.startsWith("https://") ? "ok" : `missing_or_wrong: "${url.slice(0, 20)}"`,
    supabase_url_value: url.slice(0, 40) + (url.length > 40 ? "..." : ""),
    anon_key: anonKey.length > 10 ? "ok" : "missing",
    service_role_key: serviceKey.length > 10 ? "ok" : "missing",
    admin_password: process.env.ADMIN_PASSWORD ? "ok" : "missing",
    supabase_configured: isSupabaseConfigured,
    supabase_admin_ready: supabaseAdmin !== null,
  };

  // 1) 원시 fetch로 Supabase REST endpoint 직접 테스트
  try {
    const rawRes = await fetch(`${url}/rest/v1/projects?select=id&limit=1`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });
    checks.raw_fetch_status = rawRes.status;
    checks.raw_fetch = rawRes.ok ? "ok" : `http_${rawRes.status}`;
    if (!rawRes.ok) {
      const body = await rawRes.text();
      checks.raw_fetch_body = body.slice(0, 200);
    }
  } catch (e: unknown) {
    checks.raw_fetch = `exception: ${(e as Error).message}`;
  }

  // 2) supabaseAdmin 클라이언트로 테스트
  let db_test = "skipped";
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.from("projects").select("id").limit(1);
      if (error) db_test = `error: ${error.message}`;
      else db_test = `ok (rows: ${data?.length ?? 0})`;
    } catch (e: unknown) {
      db_test = `exception: ${(e as Error).message}`;
    }
  }
  checks.db_test = db_test;

  // 3) anon 키로 읽기 테스트 (홈페이지가 실제로 읽는 방식)
  let anon_read = "skipped";
  if (supabase) {
    try {
      const { data, error } = await supabase.from("projects").select("id").limit(1);
      if (error) anon_read = `error: ${error.message}`;
      else anon_read = `ok (rows: ${data?.length ?? 0})`;
    } catch (e: unknown) {
      anon_read = `exception: ${(e as Error).message}`;
    }
  }
  checks.anon_read = anon_read;
  checks.anon_read_note = "홈페이지는 이 키로 읽음. 'ok (rows: 0)'이면 RLS 정책 미설정";

  return NextResponse.json(checks);
}
