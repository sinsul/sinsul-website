import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

function isAuthed(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  const expected = Buffer.from(`sinsul:${process.env.ADMIN_PASSWORD}`).toString("base64");
  return token === expected;
}

const db = () => {
  if (!supabaseAdmin) throw new Error("Supabase 미설정");
  return supabaseAdmin;
};

/* 기본 컬럼 (항상 존재) */
const BASE = ["year", "client", "service", "count", "category", "featured"];

/** 컬럼 미존재 에러면 true */
function isMissingCol(msg: string) {
  return msg.toLowerCase().includes("could not find") || msg.toLowerCase().includes("column");
}

/** body에서 기본 컬럼만 추출 */
function baseOnly(body: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(body).filter(([k]) => BASE.includes(k)));
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  try {
    const { data, error } = await db()
      .from("projects")
      .select("*")
      .order("year", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const body = await req.json();

  // 빈 값 제거 (Supabase에 없는 컬럼 오류 방지)
  const cleaned: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body)) {
    if (v === "" || v === null || v === undefined) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    cleaned[k] = v;
  }

  const { data, error } = await db().from("projects").insert(cleaned).select().single();

  if (error) {
    if (isMissingCol(error.message)) {
      // tags/amount 컬럼 없음 → 기본 필드만 재시도
      const { data: d2, error: e2 } = await db().from("projects").insert(baseOnly(cleaned)).select().single();
      if (e2) return NextResponse.json({ error: e2.message, hint: "기본 저장은 완료됩니다. tags/amount 컬럼은 Supabase SQL로 추가하세요." }, { status: 500 });
      revalidatePath("/");
      return NextResponse.json({ ...d2, _fallback: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  revalidatePath("/");
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const { id, ...rest } = await req.json();

  const cleaned: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(rest)) {
    if (v === "" || v === null || v === undefined) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    cleaned[k] = v;
  }

  const { data, error } = await db().from("projects").update(cleaned).eq("id", id).select().single();

  if (error) {
    if (isMissingCol(error.message)) {
      const { data: d2, error: e2 } = await db().from("projects").update(baseOnly(cleaned)).eq("id", id).select().single();
      if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });
      revalidatePath("/");
      return NextResponse.json({ ...d2, _fallback: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  revalidatePath("/");
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const { id } = await req.json();
  const { error } = await db().from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
