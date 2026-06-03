import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import type { ProjectRow } from "@/lib/supabase";

const catConfig: Record<string, { icon: string; gradient: string }> = {
  network:    { icon: "📡", gradient: "linear-gradient(135deg, #0A2010, #1A5228)" },
  device:     { icon: "📱", gradient: "linear-gradient(135deg, #133A1C, #2D9E4F)" },
  security:   { icon: "🔒", gradient: "linear-gradient(135deg, #0F3D18, #1A8C6E)" },
  smart:      { icon: "🖥️", gradient: "linear-gradient(135deg, #0A2010, #133A1C)" },
  consulting: { icon: "📋", gradient: "linear-gradient(135deg, #1A5228, #2D9E4F)" },
  기타:       { icon: "🌐", gradient: "linear-gradient(135deg, #0A2010, #0F3D18)" },
};

const catLabel: Record<string, string> = {
  network: "네트워크", device: "디바이스", security: "보안",
  smart: "스마트교실", consulting: "컨설팅", 기타: "기타",
};

const staticProjects: ProjectRow[] = [
  { id: 1, year: "2024", client: "제주특별자치도교육청",      service: "테크원터 이용 용역사업",   count: "디바이스임대 설치 및 네트워크 A/S 관리",   category: "consulting", featured: true,  created_at: "" },
  { id: 2, year: "2024", client: "주식회사 엠지씨 플러스",   service: "LG U+ 개통공사",          count: "유·무선 통신망 구축 및 디바이스 설치",    category: "network",    featured: true,  created_at: "" },
  { id: 3, year: "2024", client: "인천광역시교육청",          service: "테크원터 이용 용역",       count: "네트워크 장비 관리 및 기술 지원",          category: "consulting", featured: true,  created_at: "" },
  { id: 4, year: "2023", client: "주식회사 엠지씨 플러스",   service: "LG U+ 개통공사",          count: "유·무선 통신망 구축 및 커버리지 확장",    category: "network",    featured: true,  created_at: "" },
  { id: 5, year: "2021", client: "주식회사 엠지씨 플러스",   service: "LG U+ 유지보수 공사",     count: "네트워크 장비 점검 및 장애 대응",          category: "network",    featured: true,  created_at: "" },
  { id: 6, year: "2021", client: "주식회사 엠지씨 플러스",   service: "지역 구내 관로공사",       count: "인터넷 인프라 구축",                       category: "network",    featured: false, created_at: "" },
];

async function getProject(id: number): Promise<ProjectRow | null> {
  if (supabase) {
    try {
      const { data } = await supabase.from("projects").select("*").eq("id", id).single();
      if (data) return data;
    } catch {}
  }
  return staticProjects.find((p) => p.id === id) ?? null;
}

async function getRelated(category: string, excludeId: number): Promise<ProjectRow[]> {
  if (supabase) {
    try {
      const { data } = await supabase
        .from("projects").select("*")
        .eq("category", category).neq("id", excludeId)
        .order("year", { ascending: false }).limit(6);
      if (data && data.length > 0) return data;
    } catch {}
  }
  return staticProjects.filter((p) => p.category === category && p.id !== excludeId);
}

export async function generateStaticParams() {
  if (supabase) {
    try {
      const { data } = await supabase.from("projects").select("id");
      if (data && data.length > 0) return data.map((p: { id: number }) => ({ id: String(p.id) }));
    } catch {}
  }
  return staticProjects.map((p) => ({ id: String(p.id) }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (isNaN(numId)) notFound();

  const project = await getProject(numId);
  if (!project) notFound();

  const related = await getRelated(project.category, numId);
  const cfg = catConfig[project.category] ?? catConfig["기타"];

  return (
    <>
      <Header />
      <main style={{ paddingTop: "var(--nav-h)", minHeight: "100vh" }}>

        {/* ─── 배너 ─── */}
        <div style={{ background: cfg.gradient, padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 70% 50%, rgba(45,158,79,0.2) 0%, transparent 60%)" }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)", position: "relative" }}>
            <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#86C83A", textDecoration: "none", fontSize: 13, marginBottom: 32 }}>
              <ArrowLeft size={16} /> 납품실적 전체보기
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div style={{ width: 80, height: 80, border: "2px solid rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>
                {cfg.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#86C83A", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>
                  {project.client}
                </div>
                <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
                  {project.service}
                </h1>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, padding: "6px 14px", borderRadius: 20, background: "rgba(45,158,79,0.2)", color: "#86C83A" }}>{project.year}년</span>
                  <span style={{ fontSize: 13, padding: "6px 14px", borderRadius: 20, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)" }}>
                    {catLabel[project.category] ?? project.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 본문 ─── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px var(--px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 60, alignItems: "start" }} className="proj-detail-grid">

            {/* 사업 상세 */}
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A2010", marginBottom: 24 }}>사업 개요</h2>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "#2F5C38", marginBottom: 32 }}>
                {project.client}에서 발주한 {project.service} 사업입니다.
              </p>
              <div style={{ background: "#F2F9F4", borderRadius: 16, padding: 28 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A2010", marginBottom: 20 }}>사업 상세</h3>
                {[
                  { label: "발주처",   value: project.client },
                  { label: "사업명",   value: project.service },
                  { label: "규모/수량", value: project.count },
                  { label: "시공연도", value: `${project.year}년` },
                  { label: "분야",     value: catLabel[project.category] ?? project.category },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: "1px solid #E8F5EC", fontSize: 14 }}>
                    <span style={{ color: "#6A9E72", width: 90, flexShrink: 0 }}>{item.label}</span>
                    <span style={{ color: "#0A2010", fontWeight: 600, flex: 1 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 사이드바 */}
            <div style={{ background: "#fff", border: "1px solid #E8F5EC", borderRadius: 16, padding: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A2010", marginBottom: 20 }}>유사 사업 문의</h3>
              <p style={{ fontSize: 13, color: "#6A9E72", lineHeight: 1.7, marginBottom: 20 }}>
                {catLabel[project.category] ?? project.category} 분야 사업에 관심이 있으시면 언제든 문의해 주세요.
              </p>
              <Link href="/contact" style={{ display: "block", background: "#2D9E4F", color: "white", padding: "13px", borderRadius: 10, textDecoration: "none", textAlign: "center", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                문의하기
              </Link>
              <a href="tel:064-800-5575" style={{ display: "block", border: "1px solid #C5DFC9", color: "#0A2010", padding: "13px", borderRadius: 10, textDecoration: "none", textAlign: "center", fontSize: 14 }}>
                ☎ 064-800-5575
              </a>
            </div>
          </div>

          {/* ─── 같은 분야 납품실적 ─── */}
          {related.length > 0 && (
            <div style={{ marginTop: 80 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A2010", marginBottom: 32 }}>
                같은 분야 납품실적{" "}
                <span style={{ fontSize: 14, color: "#6A9E72", fontWeight: 400 }}>
                  — {catLabel[project.category] ?? project.category}
                </span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="related-grid">
                {related.map((r) => {
                  const rcfg = catConfig[r.category] ?? catConfig["기타"];
                  return (
                    <Link key={r.id} href={`/projects/${r.id}`} className="proj-card"
                      style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E8F5EC", textDecoration: "none", display: "block", transition: "all 0.3s ease" }}>
                      <div style={{ height: 120, background: rcfg.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                        {rcfg.icon}
                      </div>
                      <div style={{ padding: 18 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#2D9E4F", marginBottom: 4 }}>
                          {r.client}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0A2010", marginBottom: 4 }}>{r.service}</div>
                        <div style={{ fontSize: 12, color: "#6A9E72" }}>{r.count}</div>
                        <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: "#2D9E4F" }}>{r.year}년</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style>{`
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(10,32,16,0.10); border-color: rgba(45,158,79,0.2) !important; }
        @media (max-width: 900px) { .proj-detail-grid { grid-template-columns: 1fr !important; } .related-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .related-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
