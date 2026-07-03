"use client";

import { company } from "@/data/company";

export default function CtaSection() {
  return (
    <section id="contact" style={{ background: "#fff", padding: "var(--py) 0", borderTop: "1px solid #E8F5EC" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20, color: "#2D9E4F", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
            <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
            문의하기
            <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#0A2010", lineHeight: 1.3, marginBottom: 16 }}>프로젝트를 함께 시작해요</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2F5C38", maxWidth: 500, margin: "0 auto 40px" }}>
            ICT 인프라 구축, 네트워크 유지보수, 컨설팅에 관해 편하게 문의해 주세요.
          </p>

          {/* 버튼 */}
          <div className="cta-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`tel:${company.phone}`}
              style={{ background: "#0A2010", color: "white", padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#133A1C"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#0A2010"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              ☎ {company.phone}
            </a>
            <a
              href="/contact"
              style={{ color: "#0A2010", padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 400, border: "1px solid #C5DFC9", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2D9E4F"; e.currentTarget.style.color = "#2D9E4F"; e.currentTarget.style.background = "rgba(45,158,79,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#C5DFC9"; e.currentTarget.style.color = "#0A2010"; e.currentTarget.style.background = "transparent"; }}
            >
              이메일 문의
            </a>
          </div>

          {/* 연락처 정보 */}
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[
              { label: "주소", value: company.address },
              { label: "대표이사", value: company.ceo },
              { label: "대표전화", value: company.phone },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#6A9E72", marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 15, color: "#0A2010", fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .cta-btns { flex-direction: column; align-items: center; }
          .cta-btns a { width: 100%; max-width: 320px; text-align: center; }
        }
      `}</style>
    </section>
  );
}
