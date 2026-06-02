"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SinsulLogo from "@/components/ui/SinsulLogo";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error);
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A2010", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <SinsulLogo size="md" />
        </div>
        <div style={{ background: "#fff", border: "1px solid #E8F5EC", borderRadius: 20, padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <Lock size={18} color="#2D9E4F" />
            <h1 style={{ fontSize: 18, fontWeight: 600, color: "#0A2010" }}>관리자 로그인</h1>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#6A9E72", marginBottom: 8 }}>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="관리자 비밀번호 입력"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, background: "#F2F9F4", border: "1px solid #C5DFC9", color: "#0A2010", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                autoFocus
              />
            </div>
            {error && <p style={{ color: "#e53e3e", fontSize: 13 }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "14px", background: "#2D9E4F", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "확인 중..." : "로그인"}
            </button>
          </form>
        </div>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13 }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← 사이트로 돌아가기</a>
        </p>
      </div>
    </div>
  );
}
