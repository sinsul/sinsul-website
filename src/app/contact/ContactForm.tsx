"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", org: "", phone: "", email: "", content: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle = { width: "100%", padding: "13px 16px", borderRadius: 12, background: "#F2F9F4", border: "1px solid #C5DFC9", color: "#0A2010", fontSize: 14, outline: "none", boxSizing: "border-box" as const, transition: "border-color 0.2s" };

  if (status === "success") {
    return (
      <div style={{ background: "#F2F9F4", borderRadius: 20, padding: 48, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0A2010", marginBottom: 12 }}>문의가 접수되었습니다</h3>
        <p style={{ fontSize: 14, color: "#6A9E72", lineHeight: 1.7 }}>빠른 시일 내에 연락드리겠습니다.<br />감사합니다.</p>
        <button onClick={() => { setStatus("idle"); setForm({ name: "", org: "", phone: "", email: "", content: "" }); }}
          style={{ marginTop: 24, padding: "12px 28px", background: "#2D9E4F", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          다시 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A2010", marginBottom: 16 }}>문의 양식</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6A9E72", marginBottom: 8 }}>이름 <span style={{ color: "#e53e3e" }}>*</span></label>
          <input value={form.name} onChange={set("name")} placeholder="홍길동" required style={inputStyle} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6A9E72", marginBottom: 8 }}>회사명 / 기관명</label>
          <input value={form.org} onChange={set("org")} placeholder="○○회사 / ○○학교" style={inputStyle} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6A9E72", marginBottom: 8 }}>연락처 <span style={{ color: "#e53e3e" }}>*</span></label>
          <input value={form.phone} onChange={set("phone")} placeholder="010-0000-0000" required style={inputStyle} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6A9E72", marginBottom: 8 }}>이메일</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="example@company.com" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, color: "#6A9E72", marginBottom: 8 }}>문의 내용 <span style={{ color: "#e53e3e" }}>*</span></label>
        <textarea value={form.content} onChange={set("content")} placeholder="문의하실 내용을 입력해 주세요." required rows={6}
          style={{ ...inputStyle, resize: "none" as const }} />
      </div>
      {status === "error" && <p style={{ color: "#e53e3e", fontSize: 13 }}>전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>}
      <button type="submit" disabled={status === "loading"}
        style={{ width: "100%", padding: "15px", background: "#2D9E4F", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.7 : 1, transition: "all 0.2s" }}>
        {status === "loading" ? "전송 중..." : "문의 보내기"}
      </button>
    </form>
  );
}
