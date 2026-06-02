import PageLayout from "@/components/layout/PageLayout";
import { supabase } from "@/lib/supabase";
import type { ProjectRow } from "@/lib/supabase";
import Link from "next/link";

const catConfig: Record<string, { icon: string; gradient: string; badge: string; color: string }> = {
  network:    { icon: "📡", gradient: "linear-gradient(135deg, #0A2010, #1A5228)", badge: "rgba(45,158,79,0.15)", color: "#2D9E4F" },
  device:     { icon: "📱", gradient: "linear-gradient(135deg, #133A1C, #2D9E4F)", badge: "rgba(134,200,58,0.15)", color: "#5A8A1A" },
  security:   { icon: "🔒", gradient: "linear-gradient(135deg, #0F3D18, #1A8C6E)", badge: "rgba(26,140,110,0.15)", color: "#1A8C6E" },
  smart:      { icon: "🖥️", gradient: "linear-gradient(135deg, #0A2010, #133A1C)", badge: "rgba(45,158,79,0.12)", color: "#2D9E4F" },
  consulting: { icon: "📋", gradient: "linear-gradient(135deg, #1A5228, #2D9E4F)", badge: "rgba(134,200,58,0.12)", color: "#4A7A1A" },
  기타:       { icon: "🌐", gradient: "linear-gradient(135deg, #0A2010, #0F3D18)", badge: "rgba(45,158,79,0.1)",  color: "#2F5C38" },
};

const catLabel: Record<string, string> = {
  network: "네트워크", device: "디바이스", security: "보안",
  smart: "스마트교실", consulting: "컨설팅", 기타: "기타",
};

const staticAll: ProjectRow[] = [
  { id: 1, year: "2024", client: "제주특별자치도교육청", service: "테크원터 이용 용역사업", count: "디바이스임대 설치 및 네트워크 A/S 관리", category: "consulting", featured: true, created_at: "" },
  { id: 2, year: "2024", client: "주식회사 엠지씨 플러스", service: "LG U+ 개통공사", count: "유·무선 통신망 구축 및 디바이스 설치", category: "network", featured: true, created_at: "" },
  { id: 3, year: "2024", client: "인천광역시교육청", service: "테크원터 이용 용역", count: "네트워크 장비 관리 및 기술 지원", category: "consulting", featured: true, created_at: "" },
  { id: 4, year: "2023", client: "주식회사 엠지씨 플러스", service: "LG U+ 개통공사", count: "유·무선 통신망 구축 및 커버리지 확장", category: "network", featured: true, created_at: "" },
  { id: 5, year: "2021", client: "주식회사 엠지씨 플러스", service: "LG U+ 유지보수 공사", count: "네트워크 장비 점검 및 장애 대응", category: "network", featured: true, created_at: "" },
  { id: 6, year: "2021", client: "주식회사 엠지씨 플러스", service: "지역 구내 관로공사", count: "인터넷 인프라 구축", category: "network", featured: false, created_at: "" },
];

async function getAllProjects(): Promise<ProjectRow[]> {
  if (supabase) {
    try {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("year", { ascending: false })
        .order("created_at", { ascending: false });
      if (data && data.length > 0) return data;
    } catch {}
  }
  return staticAll;
}

export const metadata = { title: "납품실적 | 주식회사 신설" };

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <PageLayout title="납품실적" subtitle="신뢰할 수 있는 실적으로 증명합니다" eyebrow="Projects">
      {/* 카드 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="all-proj-grid">
        {projects.map((p) => {
          const cfg = catConfig[p.category] ?? catConfig["기타"];
          return (
            <Link key={p.id} href={`/projects/${p.id}`} className="proj-card"
              style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E8F5EC", textDecoration: "none", display: "block", transition: "all 0.3s ease" }}>
              <div style={{ height: 140, background: cfg.gradient, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(45,158,79,0.25) 0%, transparent 70%)" }} />
                <div style={{ width: 56, height: 56, border: "2px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, position: "relative", zIndex: 1 }}>
                  {cfg.icon}
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#2D9E4F", marginBottom: 6 }}>{p.client}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0A2010", lineHeight: 1.4, marginBottom: 6 }}>{p.service}</div>
                <div style={{ fontSize: 12, color: "#6A9E72", lineHeight: 1.6, marginBottom: 14 }}>{p.count}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0A2010" }}>{p.year}년</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: cfg.badge, color: cfg.color }}>
                    {catLabel[p.category] ?? p.category}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(10,32,16,0.10); border-color: rgba(45,158,79,0.2) !important; }
        @media (max-width: 900px) { .all-proj-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .all-proj-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </PageLayout>
  );
}
