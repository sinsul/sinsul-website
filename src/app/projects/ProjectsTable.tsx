"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categoryLabel } from "@/data/projects";
import type { ProjectRow } from "@/lib/supabase";

const ALL = "전체" as const;
type FilterValue = typeof ALL | string;

const categoryColor: Record<string, string> = {
  network:    "bg-green-500/15 text-green-300",
  device:     "bg-lime-500/15 text-lime-300",
  security:   "bg-emerald-500/15 text-emerald-300",
  smart:      "bg-teal-500/15 text-teal-300",
  consulting: "bg-green-700/15 text-green-400",
  기타:       "bg-white/10 text-white/50",
};

export default function ProjectsTable({ projects }: { projects: ProjectRow[] }) {
  const [active, setActive] = useState<FilterValue>(ALL);

  const usedCategories = Array.from(new Set(projects.map((p) => p.category)));
  const filters: FilterValue[] = [ALL, ...usedCategories];
  const filtered = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* 필터 탭 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              active === f
                ? "bg-brand-accent text-white"
                : "border border-white/20 text-white/50 hover:border-brand-accent hover:text-white"
            }`}
          >
            {f === ALL ? "전체" : (categoryLabel[f as keyof typeof categoryLabel] ?? f)}
            {f === ALL && (
              <span className="ml-1.5 text-xs opacity-70">{projects.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* 카드 리스트 */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={`${p.id}-${p.year}-${p.client}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-6 py-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-brand-accent/30 transition-all"
            >
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
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-white/30 rounded-2xl border border-white/8">
            해당 분류의 실적이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
