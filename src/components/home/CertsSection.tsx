"use client";

import { certifications } from "@/data/company";

export default function CertsSection() {
  return (
    <section id="certs" style={{ background: "#F2F9F4", padding: "var(--py) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, color: "#2D9E4F", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
          <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
          인증 및 면허
        </div>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#0A2010", lineHeight: 1.3, marginBottom: 8 }}>공인된 기술 경쟁력</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2F5C38", marginBottom: 48 }}>국가 인증과 파트너사 인가를 통해 기술 안정성과 품질 신뢰도를 지속적으로 강화합니다.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }} className="cert-grid">
          {certifications.map((c, i) => (
            <div
              key={i}
              className="fade-up"
              style={{ background: "#fff", borderRadius: 12, padding: "24px 16px", textAlign: "center", border: "1px solid #E8F5EC", transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(10,32,16,0.08)"; e.currentTarget.style.borderColor = "rgba(45,158,79,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E8F5EC"; }}
            >
              <div style={{ width: 44, height: 44, background: "rgba(45,158,79,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {c.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#0A2010", lineHeight: 1.4, textAlign: "center" }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#6A9E72" }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cert-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 600px) { .cert-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
