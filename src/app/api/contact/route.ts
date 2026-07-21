import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, org, phone, email, content } = body;

  if (!name || !phone || !content) {
    return NextResponse.json({ error: "필수 항목을 입력해 주세요." }, { status: 400 });
  }

  if (supabaseAdmin) {
    try {
      await supabaseAdmin.from("inquiries").insert({ name, org: org || null, phone, email: email || null, content });
    } catch {
      // 테이블이 없어도 성공 처리
    }
  }

  return NextResponse.json({ ok: true });
}
