import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { ProjectRow } from "@/lib/supabase";

/* ── 카테고리별 스타일 ── */
const catConfig: Record<string, { icon: string; gradient: string; badge: string; color: string }> = {
  network:    { icon: "📡", gradient: "linear-gradient(135deg, #0A2010, #1A5228)", badge: "rgba(45,158,79,0.15)", color: "#86C83A" },
  device:     { icon: "📱", gradient: "linear-gradient(135deg, #133A1C, #2D9E4F)", badge: "rgba(134,200,58,0.15)", color: "#AEDE6A" },
  security:   { icon: "🔒", gradient: "linear-gradient(135deg, #0F3D18, #1A8C6E)", badge: "rgba(26,140,110,0.15)", color: "#5CC67A" },
  smart:      { icon: "🖥️", gradient: "linear-gradient(135deg, #0A2010, #133A1C)", badge: "rgba(45,158,79,0.12)", color: "#86C83A" },
  consulting: { icon: "📋", gradient: "linear-gradient(135deg, #1A5228, #2D9E4F)", badge: "rgba(134,200,58,0.12)", color: "#AEDE6A" },
  기타:       { icon: "🌐", gradient: "linear-gradient(135deg, #0A2010, #0F3D18)", badge: "rgba(45,158,79,0.1)",  color: "#5CC67A" },
};

const catLabel: Record<string, string> = {
  network: "네트워크", device: "디바이스", security: "보안",
  smart: "스마트교실", consulting: "컨설팅", 기타: "기타",
};

/* ── Supabase 없을 때 기본 데이터 ── */
const staticFeatured: ProjectRow[] = [
  { id: 1, year: "2025", client: "(주)엘지유플러스", service: "2025년 LG유플러스 개통공사", count: "제주도내 전체지역 대상, 정보화기기 설치·유지보수, 네트워크 설치·유지보수, 디바이스 설치·유지보수, 콜센터 운영", category: "network", featured: true, created_at: "" },
  { id: 2, year: "2024", client: "(주)엘지유플러스", service: "2024년 LG유플러스 개통공사", count: "제주도내 전체지역 대상, 정보화기기(PC·태블릿·노트북) 유지관리, 네트워크·CCTV·IoT 디바이스 A/S 및 유지보수, 개통 구축", category: "network", featured: true, created_at: "" },
  { id: 3, year: "2024", client: "울산광역시교육청", service: "2024년 울산광역시교육청 테크센터 운영용역", count: "울산역시 전체학교 대상, 통신설비구축, 정보통신공사, 유지보수, 네트워크 유지관리 콜센터 운영, 디바이스 A/S 및 유지보수", category: "consulting", featured: true, created_at: "" },
  { id: 4, year: "2023", client: "주식회사 엘지유플러스", service: "2023년 LG U+ 개통공사", count: "제주도내 전체지역 대상, 네트워크 유지관리 콜센터 운영, 태블릿·인터넷·IPTV·WiFi·IoT 디바이스 A/S 및 유지보수, 개통 구축", category: "network", featured: true, created_at: "" },
  { id: 5, year: "2022", client: "주식회사 엘지유플러스", service: "2022년 LG U+ 개통공사", count: "제주도내 전체지역 대상, 네트워크 유지관리 콜센터 운영, 태블릿·인터넷·IPTV·WiFi·IoT 디바이스 A/S 및 유지보수, 개통 구축", category: "network", featured: true, created_at: "" },
  { id: 6, year: "2021", client: "(주)엘지유플러스", service: "'21년 유지보수공사", count: "제주도내 전체지역 대상, 네트워크 유지관리 콜센터 운영, 태블릿·인터넷·IPTV·WiFi·IoT 디바이스 A/S 및 유지보수, 개통 구축", category: "network", featured: true, created_at: "" },
];

async function getFeaturedProjects(): Promise<ProjectRow[]> {
  if (supabase) {
    try {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("year", { ascending: false })
        .limit(6);
      if (data && data.length > 0) return data;
    } catch {}
  }
  return staticFeatured;
}

function formatAmount(amount?: string): string {
  if (!amount) return "";
  const n = Number(amount);
  if (isNaN(n) || n === 0) return "";
  if (n >= 1_0000_0000) return `${(n / 1_0000_0000).toFixed(1)}억원`;
  if (n >= 1_0000) return `${(n / 1_0000).toFixed(0)}만원`;
  return `${n.toLocaleString("ko-KR")}원`;
}

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();
  const totalAmount = projects.reduce((sum, p) => sum + (Number((p as typeof projects[0] & { amount?: string }).amount) || 0), 0);

  return (
    <section id="projects" style={{ background: "#fff", padding: "var(--py) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)" }}>

        {/* 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16, color: "#2D9E4F", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
              <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
              주요실적
            </div>
            <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#0A2010", lineHeight: 1.3, marginBottom: 8 }}>
              주요 수행사업
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2F5C38" }}>
              고객 맞춤형 기술 솔루션으로 지속 가능한 IT 인프라 생태계를 구축합니다.
            </p>
          </div>
          <Link href="/projects" style={{ display: "flex", alignItems: "center", gap: 6, color: "#2D9E4F", textDecoration: "none", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
            전체 보기 →
          </Link>
        </div>

        {/* 합계 배너 */}
        {totalAmount > 0 && (
          <div style={{ display: "flex", gap: 32, padding: "20px 28px", background: "linear-gradient(135deg, #0A2010, #133A1C)", borderRadius: 14, marginBottom: 36, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 4 }}>주요 수행사업 계약금액 합계</p>
              <p style={{ fontSize: 26, fontWeight: 300, color: "#fff", lineHeight: 1 }}>
                {(totalAmount / 1_0000_0000).toFixed(1)}<span style={{ fontSize: 16, color: "#86C83A", marginLeft: 4 }}>억원</span>
              </p>
            </div>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.15)" }} />
            <div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 4 }}>표시 건수</p>
              <p style={{ fontSize: 26, fontWeight: 300, color: "#fff", lineHeight: 1 }}>
                {projects.length}<span style={{ fontSize: 16, color: "#86C83A", marginLeft: 4 }}>건</span>
              </p>
            </div>
          </div>
        )}

        {/* 카드 그리드 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="proj-grid">
          {projects.map((p) => {
            const cfg = catConfig[p.category] ?? catConfig["기타"];
            return (
              <Link key={p.id} href={`/projects/${p.id}`} className="proj-card"
                style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E8F5EC", textDecoration: "none", display: "block", transition: "all 0.3s ease" }}>

                {/* 상단 비주얼 */}
                <div style={{ height: 160, background: cfg.gradient, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(45,158,79,0.25) 0%, transparent 70%)" }} />
                  <div style={{ width: 64, height: 64, border: "2px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, position: "relative", zIndex: 1 }}>
                    {cfg.icon}
                  </div>
                </div>

                {/* 본문 */}
                <div style={{ padding: 24 }}>
                  {/* 발주처 */}
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#2D9E4F", marginBottom: 8 }}>
                    {p.client}
                  </div>
                  {/* 사업명 */}
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0A2010", lineHeight: 1.4, marginBottom: 8 }}>
                    {p.service}
                  </div>
                  {/* 규모/내용 */}
                  <div style={{ fontSize: 13, color: "#6A9E72", lineHeight: 1.6, marginBottom: 12 }}>
                    {p.count}
                  </div>
                  {/* 태그 */}
                  {(p.tags ?? []).length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                      {(p.tags ?? []).slice(0, 3).map((tag) => (
                        <span key={tag} style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 20, background: "rgba(45,158,79,0.08)", color: "#2D9E4F", border: "1px solid rgba(45,158,79,0.2)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* 연도 + 금액 + 카테고리 */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#0A2010" }}>{p.year}년</span>
                      {(p as typeof p & { amount?: string }).amount && (
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#2D9E4F" }}>
                          {formatAmount((p as typeof p & { amount?: string }).amount)}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: cfg.badge, color: cfg.color }}>
                      {catLabel[p.category] ?? p.category}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .proj-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(10,32,16,0.10);
          border-color: rgba(45,158,79,0.2) !important;
        }
        @media (max-width: 900px) { .proj-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .proj-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
