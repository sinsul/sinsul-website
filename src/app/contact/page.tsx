import { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import ContactForm from "./ContactForm";
import { company } from "@/data/company";

export const metadata: Metadata = { title: "문의하기 | 주식회사 신설" };

const contactItems = [
  { icon: "📞", label: "대표전화", value: company.phone, href: `tel:${company.phone}` },
  { icon: "✉️", label: "이메일", value: company.email, href: `mailto:${company.email}` },
  { icon: "📍", label: "주소", value: company.address },
  { icon: "🕐", label: "운영시간", value: "월~금 09:00 ~ 18:00" },
];

export default function ContactPage() {
  return (
    <PageLayout title="문의하기" subtitle="언제든지 연락주세요" eyebrow="Contact">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="contact-grid">
        {/* 연락처 정보 */}
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A2010", marginBottom: 32 }}>연락처 정보</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {contactItems.map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, background: "rgba(45,158,79,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 12, color: "#6A9E72", marginBottom: 4 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: 15, fontWeight: 600, color: "#0A2010", textDecoration: "none" }}>{item.value}</a>
                  ) : (
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#0A2010" }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 사업분야 안내 */}
          <div style={{ marginTop: 40, background: "#F2F9F4", borderRadius: 16, padding: 28 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A2010", marginBottom: 16 }}>문의 가능 분야</h3>
            {["통신공사업 / 네트워크 구축", "소프트웨어 개발 / 플랫폼", "전기공사 / EV 충전기", "AI CCTV / BIS·BIT 구축", "IT 유지보수 / 컨설팅"].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #E8F5EC", fontSize: 14, color: "#2F5C38" }}>
                <span style={{ color: "#2D9E4F" }}>✓</span> {s}
              </div>
            ))}
          </div>
        </div>

        {/* 문의 폼 */}
        <ContactForm />
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </PageLayout>
  );
}
