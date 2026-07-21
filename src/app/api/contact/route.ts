import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const NOTIFY_EMAIL = "jss26925@sinsul.com";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, org, phone, email, content } = body;

  if (!name || !phone || !content) {
    return NextResponse.json({ error: "필수 항목을 입력해 주세요." }, { status: 400 });
  }

  // DB 저장
  if (supabaseAdmin) {
    try {
      await supabaseAdmin.from("inquiries").insert({ name, org: org || null, phone, email: email || null, content });
    } catch {}
  }

  // 이메일 알림
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "신설 문의 알림 <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `[신설 홈페이지 문의] ${name} / ${org || "없음"}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:12px;">
            <h2 style="color:#0A2010;margin-bottom:24px;">새 문의가 접수되었습니다</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;width:100px;">이름</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">회사/기관</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${org || "-"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">연락처</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${phone}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">이메일</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${email || "-"}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;vertical-align:top;">문의내용</td><td style="padding:10px 0;line-height:1.6;">${content.replace(/\n/g, "<br>")}</td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#fff;border-radius:8px;border-left:4px solid #2D9E4F;">
              <a href="https://sinsul.ai/admin" style="color:#2D9E4F;font-weight:600;">관리자 페이지에서 확인하기 →</a>
            </div>
          </div>
        `,
      });
    } catch (e) {
      console.error("이메일 발송 실패:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
