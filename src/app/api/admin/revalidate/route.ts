import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

function isAuthed(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  const expected = Buffer.from(`sinsul:${process.env.ADMIN_PASSWORD}`).toString("base64");
  return token === expected;
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  revalidatePath("/");
  revalidatePath("/news");
  return NextResponse.json({ ok: true });
}
