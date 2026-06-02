import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { services } from "@/data/services";
import { supabase } from "@/lib/supabase";
import type { ProjectRow } from "@/lib/supabase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* 카테고리 매핑: service.id → supabase category */
const categoryMap: Record<string, string[]> = {
  telecom:  ["network", "consulting"],
  software: ["network", "smart"],
  electric: ["consulting"],
  network:  ["network", "security"],
  cctv:     ["security"],
  bis:      ["consulting"],
  platform: ["network", "smart"],
};

async function getRelatedProjects(serviceId: string): Promise<ProjectRow[]> {
  const cats = categoryMap[serviceId] ?? [];
  if (!supabase || cats.length === 0) return [];
  try {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .in("category", cats)
      .order("year", { ascending: false })
      .limit(6);
    return data ?? [];
  } catch { return []; }
}

export async function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) notFound();

  const related = await getRelatedProjects(id);

  return (
    <>
      <Header />
      <main style={{ paddingTop: 72, minHeight: "100vh" }}>
        {/* 헤더 배너 */}
        <div style={{ background: "linear-gradient(135deg, #0A2010, #133A1C)", padding: "80px 0 60px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px" }}>
            <Link href="/#business" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#86C83A", textDecoration: "none", fontSize: 13, marginBottom: 32 }}>
              <ArrowLeft size={16} /> 사업영역 목록
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ fontSize: 48 }}>{service.icon}</div>
              <div>
                <div style={{ fontSize: 11, color: "#6A9E72", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>
                  {service.num} — 사업영역
                </div>
                <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
                  {service.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* 본문 */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 60, alignItems: "start" }} className="detail-grid">
            {/* 설명 */}
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A2010", marginBottom: 20 }}>서비스 개요</h2>
              <p style={{ fontSize: 16, lineHeight: 1.9, color: "#2F5C38", marginBottom: 36 }}>{service.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {service.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 20, background: "#E8F5EC", color: "#2F5C38" }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* 문의 사이드바 */}
            <div style={{ background: "#F2F9F4", borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A2010", marginBottom: 16 }}>이 서비스 문의하기</h3>
              <p style={{ fontSize: 13, color: "#2F5C38", lineHeight: 1.7, marginBottom: 24 }}>
                {service.title}에 대한 견적이나 상담이 필요하시면 언제든 연락주세요.
              </p>
              <a href="/#contact" style={{ display: "block", background: "#2D9E4F", color: "white", padding: "14px 20px", borderRadius: 10, textDecoration: "none", textAlign: "center", fontSize: 14, fontWeight: 600 }}>
                문의하기
              </a>
              <a href="tel:064-800-5575" style={{ display: "block", marginTop: 12, border: "1px solid #C5DFC9", color: "#0A2010", padding: "14px 20px", borderRadius: 10, textDecoration: "none", textAlign: "center", fontSize: 14 }}>
                ☎ 064-800-5575
              </a>
            </div>
          </div>

          {/* 관련 납품실적 */}
          {related.length > 0 && (
            <div style={{ marginTop: 80 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A2010", marginBottom: 32 }}>관련 납품실적</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {related.map((p) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: "#fff", borderRadius: 14, border: "1px solid #E8F5EC" }}>
                    <span style={{ color: "#2D9E4F", fontWeight: 700, fontSize: 18, width: 56, flexShrink: 0 }}>{p.year}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, color: "#0A2010", fontSize: 14, marginBottom: 2 }}>{p.client}</p>
                      <p style={{ color: "#6A9E72", fontSize: 13 }}>{p.service}</p>
                    </div>
                    <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, background: "#E8F5EC", color: "#2F5C38", flexShrink: 0 }}>{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
