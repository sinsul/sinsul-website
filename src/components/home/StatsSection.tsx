"use client";

import { motion } from "framer-motion";
import CounterNumber from "@/components/ui/CounterNumber";
import { stats } from "@/data/company";

const icons = ["📅", "🏫", "💻", "⭐"];

export default function StatsSection() {
  return (
    <section className="py-20 bg-brand-primary relative overflow-hidden">
      {/* 배경 패턴 */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group text-center p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <div className="text-2xl mb-3">{icons[i]}</div>
              <div className="text-4xl lg:text-5xl font-extrabold text-white mb-1 tabular-nums">
                <CounterNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-green-100/80 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
