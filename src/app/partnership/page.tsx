import PageLayout from "@/components/layout/PageLayout";
import { company } from "@/data/company";

export const metadata = { title: "파트너십 | 주식회사 신설" };

const partners = [
  { icon: "📡", name: "LG U+", desc: "전국 통신망 구축 및 BS 대리점 파트너" },
  { icon: "🏫", name: "제주특별자치도교육청", desc: "학교 ICT 인프라 구축 파트너" },
  { icon: "🏛️", name: "인천광역시교육청", desc: "테크원터 이용 용역 파트너" },
  { icon: "🔌", name: "볼트업 (LG U+ EV)", desc: "전기차 충전 인프라 구축 파트너" },
];

const benefits = [
  { icon: "💼", title: "사업 기회 확대", desc: "교육기관·공공기관·기업 등 다양한 프로젝트에 공동 참여 기회를 제공합니다." },
  { icon: "🤝", title: "기술 협력", desc: "통신·소프트웨어·전기공사 분야의 전문 기술력을 상호 공유하고 협력합니다." },
  { icon: "📈", title: "성장 지원", desc: "검증된 레퍼런스와 네트워크를 기반으로 파트너사의 성장을 함께 지원합니다." },
];

export default function PartnershipPage() {
  return (
    <PageLayout title="파트너십" subtitle="신설과 함께 성장하는 ICT 생태계를 만들어 갑니다" eyebrow="Partnership">
      {/* 파트너 */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0A2010", marginBottom: 32 }}>주요 파트너</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="partner-grid">
          {partners.map((p) => (
            <div key={p.name} style={{ background: "#F2F9F4", borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0A2010", marginBottom: 8 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: "#6A9E72", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 파트너십 혜택 */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0A2010", marginBottom: 32 }}>파트너십 혜택</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="benefit-grid">
          {benefits.map((b) => (
            <div key={b.title} style={{ border: "1px solid #E8F5EC", borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{b.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0A2010", marginBottom: 10 }}>{b.title}</div>
              <div style={{ fontSize: 14, color: "#6A9E72", lineHeight: 1.7 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 문의 */}
      <section style={{ background: "linear-gradient(135deg, #0A2010, #133A1C)", borderRadius: 20, padding: 48, textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: 16 }}>파트너십 문의</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>파트너십에 관심이 있으시면 언제든 연락해 주세요.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`tel:${company.phone}`} style={{ background: "#2D9E4F", color: "white", padding: "14px 32px", borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
            ☎ {company.phone}
          </a>
          <a href={`mailto:${company.email}`} style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)", padding: "14px 32px", borderRadius: 10, textDecoration: "none", fontSize: 15 }}>
            이메일 문의
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .partner-grid { grid-template-columns: repeat(2,1fr) !important; } .benefit-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .partner-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </PageLayout>
  );
}
