import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, org, phone, content } = body;

  if (!name || !phone || !content) {
    return NextResponse.json({ error: "필수 항목을 입력해 주세요." }, { status: 400 });
  }

  // Supabase가 설정된 경우 저장 (inquiries 테이블이 없으면 생략)
  if (supabaseAdmin) {
    try {
      await supabaseAdmin.from("inquiries").insert({ name, org, phone, content });
    } catch {
      // 테이블이 없어도 성공 처리
    }
  }

  return NextResponse.json({ ok: true });
}
