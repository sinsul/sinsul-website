"use client";

import { strengths } from "@/data/company";

export default function StrengthsSection() {
  return (
    <section style={{ background: "#0A2010", position: "relative", overflow: "hidden", padding: "100px 0" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(45,158,79,0.15) 0%, transparent 60%)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px", position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, color: "#86C83A", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
          <span style={{ width: 36, height: 1, background: "#86C83A", display: "inline-block" }} />
          핵심역량
        </div>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#fff", lineHeight: 1.3, marginBottom: 8 }}>왜 (주)신설인가</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", marginBottom: 64 }}>10년 이상 축적된 실적과 기술력, 그리고 지속 성장하는 신뢰</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }} className="str-grid">
          {strengths.map((s) => (
            <div
              key={s.num}
              style={{ background: "rgba(255,255,255,0.03)", padding: "40px 28px", transition: "background 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              <div style={{ fontFamily: "var(--font-dm)", fontSize: 13, fontWeight: 400, letterSpacing: 1, color: "#86C83A", marginBottom: 24 }}>{s.num}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.4 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .str-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .str-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
