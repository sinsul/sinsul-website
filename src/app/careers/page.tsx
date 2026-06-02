import PageLayout from "@/components/layout/PageLayout";
import { company } from "@/data/company";

export const metadata = { title: "채용 | 주식회사 신설" };

const positions = [
  { team: "네트워크팀", role: "네트워크 엔지니어", level: "경력 2년 이상", type: "정규직", desc: "LAN/WAN 구축·유지보수, 학교·기업 네트워크 설계 및 시공" },
  { team: "소프트웨어팀", role: "풀스택 개발자", level: "경력 3년 이상", type: "정규직", desc: "FastAPI 기반 백엔드, React Native 모바일 앱 개발" },
  { team: "CS팀", role: "IT 기술지원", level: "신입/경력", type: "정규직", desc: "고객사 방문 기술지원, 네트워크 장비 점검 및 A/S" },
  { team: "전기팀", role: "전기 기술자", level: "전기기사 자격 보유", type: "정규직", desc: "전기 설계·시공·감리, EV 충전기 설치 및 유지보수" },
];

const perks = [
  { icon: "🏥", label: "4대 보험" },
  { icon: "📚", label: "자격증 취득 지원" },
  { icon: "🚗", label: "업무용 차량 제공" },
  { icon: "🎯", label: "성과급 지급" },
  { icon: "🏖️", label: "연차 휴가" },
  { icon: "🎓", label: "외부 교육 지원" },
];

export default function CareersPage() {
  return (
    <PageLayout title="채용" subtitle="함께 성장할 ICT 전문가를 기다립니다" eyebrow="Careers">
      {/* 채용 포지션 */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0A2010", marginBottom: 32 }}>채용 포지션</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {positions.map((p) => (
            <div key={p.role} style={{ border: "1px solid #E8F5EC", borderRadius: 16, padding: "28px 32px", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 12, color: "#2D9E4F", fontWeight: 600, marginBottom: 6 }}>{p.team}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0A2010", marginBottom: 8 }}>{p.role}</div>
                <div style={{ fontSize: 14, color: "#6A9E72", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#E8F5EC", color: "#2F5C38", fontWeight: 500 }}>{p.level}</span>
                <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "rgba(45,158,79,0.1)", color: "#2D9E4F", fontWeight: 500, textAlign: "center" }}>{p.type}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 복리후생 */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0A2010", marginBottom: 32 }}>복리후생</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }} className="perks-grid">
          {perks.map((p) => (
            <div key={p.label} style={{ background: "#F2F9F4", borderRadius: 12, padding: "24px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0A2010" }}>{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 지원 방법 */}
      <section style={{ background: "linear-gradient(135deg, #0A2010, #133A1C)", borderRadius: 20, padding: 48, textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: 16 }}>지원하기</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>이력서 및 포트폴리오를 이메일로 제출해 주세요.</p>
        <p style={{ fontSize: 14, color: "#86C83A", marginBottom: 32 }}>{company.email}</p>
        <a href={`mailto:${company.email}?subject=입사지원`} style={{ background: "#2D9E4F", color: "white", padding: "14px 40px", borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
          이메일로 지원하기
        </a>
      </section>

      <style>{`
        @media (max-width: 900px) { .perks-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 600px) { .perks-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </PageLayout>
  );
}
