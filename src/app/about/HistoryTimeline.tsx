"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import { history } from "@/data/company";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CARD_W = 300;
const GAP = 20;
const STEP = CARD_W + GAP;

export default function HistoryTimeline() {
  const x = useMotionValue(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [revealed, setRevealed] = useState<Set<number>>(new Set([0]));
  const containerRef = useRef<HTMLDivElement>(null);

  // 컨테이너 너비에 따라 한번에 보이는 카드 수 계산
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setVisibleCount(Math.floor((w + GAP) / STEP) || 1);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // x 값 변화를 감지해 보이는 카드들을 revealed 상태에 추가
  useMotionValueEvent(x, "change", (val) => {
    const offset = -val;
    const firstVisible = Math.floor(offset / STEP);
    const newRevealed = new Set(revealed);
    for (let i = firstVisible; i <= firstVisible + visibleCount + 1; i++) {
      if (i >= 0 && i < history.length) newRevealed.add(i);
    }
    setRevealed(newRevealed);
    const idx = Math.round(offset / STEP);
    setActiveIdx(Math.max(0, Math.min(history.length - 1, idx)));
  });

  const maxDrag = -(history.length * STEP - visibleCount * STEP);

  const snapTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(history.length - 1, idx));
    setActiveIdx(clamped);
    // 보이는 범위 업데이트
    const newRevealed = new Set(revealed);
    for (let i = clamped; i <= clamped + visibleCount + 1; i++) {
      if (i >= 0 && i < history.length) newRevealed.add(i);
    }
    setRevealed(newRevealed);
    animate(x, -(clamped * STEP), { type: "spring", stiffness: 280, damping: 32 });
  };

  const handleDragEnd = () => {
    const currentX = x.get();
    const idx = Math.round(-currentX / STEP);
    snapTo(idx);
  };

  return (
    <div className="relative">
      {/* 드래그 힌트 */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-8 text-white/30 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ChevronLeft size={14} />
        <span>드래그하여 연혁 탐색</span>
        <ChevronRight size={14} />
      </motion.div>

      {/* 타임라인 트랙 */}
      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing select-none pb-2">
        <motion.div
          drag="x"
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
          style={{ x, gap: GAP, width: "max-content" }}
          className="flex items-start"
        >
          {history.map((item, i) => {
            const isActive = i === activeIdx;
            const isRevealed = revealed.has(i);

            return (
              <motion.div
                key={item.year}
                style={{ width: CARD_W }}
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: isRevealed ? 0.05 : 0 }}
                onClick={() => snapTo(i)}
                className={`shrink-0 relative p-6 rounded-2xl border transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "border-brand-accent bg-brand-accent/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                {/* 연도 배지 */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                  isActive ? "bg-brand-accent text-white" : "bg-white/10 text-white/50"
                }`}>
                  {item.year}
                </div>

                {/* 이벤트 */}
                <p className={`text-sm leading-relaxed ${isActive ? "text-white" : "text-white/60"}`}>
                  {item.event}
                </p>

                {/* 활성 글로우 */}
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 rounded-2xl ring-1 ring-brand-accent/50 shadow-[0_0_24px_rgba(63,174,54,0.15)]"
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 하단 연결선 + 점 네비게이션 */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {/* 점 인디케이터 */}
        <div className="flex gap-2">
          {history.map((_, i) => (
            <button
              key={i}
              onClick={() => snapTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeIdx
                  ? "w-6 h-2 bg-brand-accent"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* 화살표 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={() => snapTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="p-2 rounded-lg border border-white/15 text-white/40 hover:border-brand-accent hover:text-brand-accent disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="flex items-center text-white/30 text-xs px-2">
            {activeIdx + 1} / {history.length}
          </span>
          <button
            onClick={() => snapTo(activeIdx + 1)}
            disabled={activeIdx === history.length - 1}
            className="p-2 rounded-lg border border-white/15 text-white/40 hover:border-brand-accent hover:text-brand-accent disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
