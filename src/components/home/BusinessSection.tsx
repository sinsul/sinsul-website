"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

export default function BusinessSection() {
  return (
    <section id="business" style={{ background: "#fff", padding: "var(--py) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, color: "#2D9E4F", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
          <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
          사업영역
        </div>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#0A2010", lineHeight: 1.3, marginBottom: 8 }}>6대 핵심 사업분야</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2F5C38", marginBottom: 64 }}>정보통신공사부터 소프트웨어, 전기공사, CCTV, BIS/BIT까지 ICT 인프라의 전 주기를 책임집니다.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "#C5DFC9", borderRadius: 16, overflow: "hidden" }} className="biz-grid">
          {services.map((s) => (
            <BizCard key={s.id} service={s} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .biz-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .biz-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function BizCard({ service }: { service: typeof services[0] }) {
  return (
    <Link
      href={`/services/${service.id}`}
      style={{
        display: "flex", flexDirection: "column",
        background: "#fff", padding: "44px 36px",
        position: "relative", overflow: "hidden",
        transition: "all 0.3s ease", textDecoration: "none",
        gridColumn: service.wide ? "span 2" : undefined,
      }}
      className="biz-card"
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "#0A2010";
        el.querySelectorAll<HTMLElement>("[data-title]").forEach(t => { t.style.color = "#fff"; });
        el.querySelectorAll<HTMLElement>("[data-desc]").forEach(t => { t.style.color = "rgba(255,255,255,0.55)"; });
        el.querySelectorAll<HTMLElement>("[data-num]").forEach(t => { t.style.color = "rgba(255,255,255,0.08)"; });
        el.querySelectorAll<HTMLElement>("[data-tag]").forEach(t => { t.style.background = "rgba(255,255,255,0.1)"; t.style.color = "rgba(255,255,255,0.6)"; });
        el.querySelectorAll<HTMLElement>("[data-arrow]").forEach(t => { t.style.borderColor = "rgba(255,255,255,0.2)"; t.style.color = "rgba(255,255,255,0.6)"; });
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "#fff";
        el.querySelectorAll<HTMLElement>("[data-title]").forEach(t => { t.style.color = "#0A2010"; });
        el.querySelectorAll<HTMLElement>("[data-desc]").forEach(t => { t.style.color = "#2F5C38"; });
        el.querySelectorAll<HTMLElement>("[data-num]").forEach(t => { t.style.color = "#C5DFC9"; });
        el.querySelectorAll<HTMLElement>("[data-tag]").forEach(t => { t.style.background = "#E8F5EC"; t.style.color = "#2F5C38"; });
        el.querySelectorAll<HTMLElement>("[data-arrow]").forEach(t => { t.style.borderColor = "#C5DFC9"; t.style.color = "#6A9E72"; });
      }}
    >
      <div data-num style={{ fontFamily: "var(--font-dm)", fontSize: 48, fontWeight: 200, color: "#C5DFC9", lineHeight: 1, marginBottom: 20, transition: "color 0.3s" }}>
        {service.num}
      </div>
      <div style={{ fontSize: 28, marginBottom: 20 }}>{service.icon}</div>
      <div data-title style={{ fontSize: 16, fontWeight: 700, color: "#0A2010", marginBottom: 10, transition: "color 0.3s" }}>
        {service.title}
      </div>
      <div data-desc style={{ fontSize: 13.5, color: "#2F5C38", lineHeight: 1.7, marginBottom: 16, flex: 1, transition: "color 0.3s" }}>
        {service.desc}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {service.tags.map((tag) => (
          <span key={tag} data-tag style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 20, background: "#E8F5EC", color: "#2F5C38", transition: "all 0.3s" }}>
            {tag}
          </span>
        ))}
      </div>
      {/* 화살표 아이콘 */}
      <div data-arrow style={{ position: "absolute", right: 24, bottom: 24, width: 32, height: 32, border: "1px solid #C5DFC9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#6A9E72", transition: "all 0.3s" }}>
        <ArrowRight size={14} />
      </div>
    </Link>
  );
}
