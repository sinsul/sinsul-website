import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectsTable from "./ProjectsTable";
import { supabase } from "@/lib/supabase";
import type { ProjectRow } from "@/lib/supabase";
import { projects as staticProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "납품실적",
  description: "주식회사 신설의 납품 및 구축 실적을 확인하세요.",
};

export const revalidate = 60; // 60초마다 최신 데이터 반영

async function getProjects(): Promise<ProjectRow[]> {
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
  // Supabase 미설정 시 정적 데이터로 fallback
  return staticProjects.map((p, i) => ({ ...p, id: i + 1, created_at: "", featured: p.featured ?? false }));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <section className="py-20 bg-gradient-to-b from-brand-primary/20 to-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">Projects</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">납품실적</h1>
            <p className="mt-4 text-white/50 text-lg">신뢰할 수 있는 실적으로 증명합니다</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-10 inline-flex gap-8 sm:gap-16">
              <div>
                <p className="text-3xl font-bold text-white">{projects.length}<span className="text-brand-accent">+</span></p>
                <p className="text-white/40 text-sm mt-1">총 프로젝트</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {new Set(projects.map((p) => p.year)).size}<span className="text-brand-accent">년</span>
                </p>
                <p className="text-white/40 text-sm mt-1">사업 연혁</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {new Set(projects.map((p) => p.client)).size}<span className="text-brand-accent">+</span>
                </p>
                <p className="text-white/40 text-sm mt-1">고객 기관</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsTable projects={projects} />
          <p className="mt-6 text-center text-white/30 text-sm">
            * 기관 정보는 일부 비공개 처리되었습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
