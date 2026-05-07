"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

// 캔버스 네트워크 노드 애니메이션
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const COUNT = 55;

    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1.5,
      });
    }

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 선 연결
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(26, 107, 58, ${0.22 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 노드 점
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(26, 107, 58, 0.45)";
        ctx.fill();

        // 글로우
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(63, 174, 54, 0.07)";
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />;
}

const words = ["네트워크", "디바이스", "전기공사", "소프트웨어"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#eaf5ea] via-brand-dark to-[#dff0df]" />

      {/* 네트워크 캔버스 */}
      <NetworkCanvas />

      {/* 빛나는 원형 오브젝트 */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(63,174,54,0.12) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/6 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(63,174,54,0.08) 0%, transparent 70%)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 콘텐츠 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full">
        <div className="max-w-3xl">

          {/* 뱃지 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/10 text-brand-accent text-sm font-medium mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-brand-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            제주 교육 IT 전문기업
          </motion.div>

          {/* 타이틀 */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
            >
              신뢰할 수 있는
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-green-500">
                통신 네트워크 파트너
              </span>
            </motion.h1>
          </div>

          {/* 서브타이틀 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-gray-500 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
          >
            정보통신 인프라 구축 기술을 기반으로<br className="hidden sm:block" />
            고객 맞춤형{" "}
            <RotatingWord words={words} />{" "}
            솔루션을 제안하고,<br className="hidden sm:block" />
            지속 가능한 IT 생태계를 함께 만들어 갑니다.
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/services"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent text-white font-semibold rounded-xl overflow-hidden transition-all hover:-translate-y-0.5 shadow-md shadow-brand-accent/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-accent to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                사업분야 보기
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white hover:border-brand-accent hover:text-brand-accent transition-all shadow-sm"
            >
              문의하기
            </Link>
          </motion.div>

          {/* 핵심 지표 미리보기 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-14 flex gap-8"
          >
            {[
              { value: "11년+", label: "사업 경력" },
              { value: "50+", label: "구축 학교" },
              { value: "19.5억", label: "2024 매출" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 스크롤 유도 */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-gray-400 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-gray-400" />
      </motion.div>
    </section>
  );
}

// 단어 순환 컴포넌트
function RotatingWord({ words }: { words: string[] }) {
  return (
    <motion.span
      key={words[0]}
      className="inline-block text-brand-accent font-bold"
      animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 0 }}
    >
      {words[0]}
    </motion.span>
  );
}
