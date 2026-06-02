"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < 55; i++) {
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
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(92,198,122,${0.20 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(92,198,122,0.5)";
        ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} />;
}

export default function HeroSection() {
  return (
    <section
      id="top"
      style={{
        minHeight: "100vh", background: "#0A2010",
        position: "relative", display: "flex", alignItems: "center",
        overflow: "hidden", paddingTop: 72,
      }}
    >
      {/* 배경 그라디언트 */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(45,158,79,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(134,200,58,0.12) 0%, transparent 50%)",
      }} />

      {/* 그리드 패턴 */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <NetworkCanvas />

      {/* 콘텐츠 */}
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 60px", width: "100%" }}>
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32, color: "#86C83A", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}
        >
          <span style={{ width: 36, height: 1, background: "#86C83A", display: "inline-block" }} />
          첨단 ICT 인프라 전문기업
        </motion.div>

        {/* 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: 12 }}
        >
          고객 중심의 차별화된<br />
          <span style={{ color: "#5CC67A" }}>기술력으로 가치를</span><br />
          창조하는 신뢰의 파트너
        </motion.h1>

        {/* 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ maxWidth: 560, fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 48 }}
        >
          (주)신설은 첨단 ICT 인프라 구축과 이관에 특화된 정보통신 전문기업으로,
          SI·NI·정보보안·IT 인프라 구축 및 컨설팅 등 정보통신 관련 전 영역에서
          통합 솔루션을 제공합니다.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}
        >
          <a
            href="#business"
            style={{ background: "#2D9E4F", color: "white", padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#5CC67A"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#2D9E4F"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            사업영역 보기
          </a>
          <a
            href="#contact"
            style={{ color: "rgba(255,255,255,0.75)", padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: 14, border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
          >
            문의하기
          </a>
        </motion.div>

        {/* 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ position: "absolute", right: 60, bottom: -60, display: "flex", gap: 48 }}
          className="hero-stats"
        >
          {[
            { num: "10", unit: "년+", label: "사업 경력" },
            { num: "40", unit: "명", label: "전문 엔지니어" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "var(--font-dm), 'DM Sans', sans-serif", fontSize: 36, fontWeight: 300, color: "#ffffff", lineHeight: 1, marginBottom: 6 }}>
                {s.num}<span style={{ fontSize: 20, color: "#86C83A" }}>{s.unit}</span>
              </p>
              <p style={{ fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.4)", letterSpacing: "0.5px" }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 스크롤 유도 */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase" }}>
        <motion.div animate={{ height: [48, 32, 48], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 1, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
      </div>

      <style>{`
        @media (max-width: 600px) { .hero-stats { position: static !important; margin-top: 36px; flex-direction: row; flex-wrap: wrap; gap: 20px; } }
      `}</style>
    </section>
  );
}
