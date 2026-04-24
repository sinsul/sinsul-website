import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { supabase } from "@/lib/supabase";
import { categoryLabel } from "@/data/projects";
import { projects as staticProjects } from "@/data/projects";
import type { ProjectRow } from "@/lib/supabase";

const categoryColor: Record<string, string> = {
  network:    "bg-green-500/15 text-green-300",
  device:     "bg-lime-500/15 text-lime-300",
  security:   "bg-emerald-500/15 text-emerald-300",
  smart:      "bg-teal-500/15 text-teal-300",
  consulting: "bg-green-700/15 text-green-400",
  기타:       "bg-white/10 text-white/50",
};

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
  return staticProjects
    .filter((p) => p.featured)
    .slice(0, 6)
    .map((p, i) => ({ ...p, id: i + 1, created_at: "", featured: p.featured ?? false }));
}

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <section className="py-24 bg-brand-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-brand-accent text-sm font-semibold tracking-widest uppercase">Projects</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">납품실적</h2>
              <p className="mt-2 text-white/50">신뢰할 수 있는 실적으로 증명합니다</p>
            </div>
            <Link href="/projects" className="hidden sm:flex items-center gap-1.5 text-brand-accent text-sm font-medium hover:gap-2.5 transition-all">
              전체 보기 <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        {/* 카드 리스트 */}
        <div className="space-y-3">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.06}>
              <div className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-6 py-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-brand-accent/30 transition-all">
                {/* 연도 */}
                <span className="text-brand-accent font-extrabold text-lg sm:text-xl w-16 shrink-0">
                  {p.year}
                </span>

                {/* 기관명 + 사업내용 */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm sm:text-base truncate">{p.client}</p>
                  <p className="text-white/45 text-xs sm:text-sm mt-0.5 truncate">{p.service}</p>
                </div>

                {/* 규모 + 분류 */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-lg bg-white/8 text-white/60 text-xs font-medium whitespace-nowrap">
                    {p.count}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${categoryColor[p.category] ?? "bg-white/10 text-white/50"}`}>
                    {categoryLabel[p.category as keyof typeof categoryLabel] ?? p.category}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-brand-accent text-sm font-medium">
              전체 보기 <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
