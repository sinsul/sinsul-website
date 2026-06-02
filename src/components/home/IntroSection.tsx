import { company } from "@/data/company";
import SinsulLogo from "@/components/ui/SinsulLogo";

const values = [
  { icon: "🔩", title: "현장 중심의 기술력", desc: "네트워크 설계·구축·유지보수 전 과정을 현장에서 직접 수행하며 축적한 실무 역량으로 최적의 솔루션을 제공합니다." },
  { icon: "🌐", title: "종합 ICT 솔루션", desc: "통신공사·전기공사·소프트웨어·네트워크시스템 등 지역 기반 인프라와 기업 IT환경의 핵심을 담당하는 융합형 전문기업입니다." },
  { icon: "🤖", title: "AI 기반 미래 비전", desc: "데이터 기반 자동화 및 예측 기능을 갖춘 AI 플랫폼 고도화를 통해 미래지향적 비즈니스 모델로 진화해 나갑니다." },
];

export default function IntroSection() {
  return (
    <section id="about" style={{ background: "#F2F9F4", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="intro-grid">

          {/* 텍스트 */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, color: "#2D9E4F", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
              <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
              회사소개
            </div>
            <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#0A2010", lineHeight: 1.3, marginBottom: 16 }}>
              지속 가능한 IT 생태계를<br />현장 기술로 구현합니다
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2F5C38", maxWidth: 560 }}>
              {company.description}
            </p>

            <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 20 }}>
              {values.map((v, i) => (
                <div key={v.title} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: 20, borderBottom: i < values.length - 1 ? "1px solid #C5DFC9" : "none" }}>
                  <div style={{ width: 40, height: 40, flexShrink: 0, background: "rgba(45,158,79,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{v.icon}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#0A2010", marginBottom: 4 }}>{v.title}</p>
                    <p style={{ fontSize: 13.5, color: "#2F5C38", lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 비주얼 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="intro-visual">
            {/* Company Overview 카드 */}
            <div style={{
              background: "linear-gradient(145deg, #133A1C, #0A2010)",
              borderRadius: 20, padding: 36, color: "white", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle, rgba(45,158,79,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
              {/* 로고 */}
              <div style={{ marginBottom: 24, opacity: 0.9 }}>
                <SinsulLogo size="sm" />
              </div>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase", color: "#86C83A", marginBottom: 16 }}>Company Overview</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "대표이사", value: company.ceo },
                  { label: "설립일", value: company.foundedDate },
                  { label: "사업자등록번호", value: company.businessNumber },
                  { label: "주소", value: company.address },
                  { label: "대표전화", value: company.phone },
                  { label: "이메일", value: company.email },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 11, color: "#6A9E72", whiteSpace: "nowrap", minWidth: 96, paddingTop: 1 }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, wordBreak: "break-all" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 통계 카드 행 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#2D9E4F", borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-dm), sans-serif", fontSize: 40, fontWeight: 300, color: "white", lineHeight: 1 }}>
                  10<span style={{ fontSize: 20, color: "#AEDE6A" }}>년+</span>
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>사업 경력</span>
              </div>
              <div style={{ background: "#133A1C", borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-dm), sans-serif", fontSize: 40, fontWeight: 300, color: "white", lineHeight: 1 }}>
                  40<span style={{ fontSize: 20, color: "#86C83A" }}>명</span>
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>전문 엔지니어</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .intro-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
        @media (max-width: 600px) { .intro-visual { display: none !important; } }
      `}</style>
    </section>
  );
}
