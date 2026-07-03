"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SinsulLogo from "@/components/ui/SinsulLogo";

const navItems = [
  { href: "#about",    label: "회사소개" },
  { href: "#business", label: "사업영역" },
  { href: "#history",  label: "연혁" },
  { href: "#projects", label: "주요실적" },
  { href: "#org",      label: "조직도" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 var(--px)", height: "var(--nav-h)",
        background: "rgba(255,255,255,0.98)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(45,158,79,0.15)",
        boxShadow: scrolled ? "0 4px 32px rgba(10,32,16,0.12)" : "0 2px 16px rgba(10,32,16,0.08)",
        transition: "box-shadow 0.3s ease",
      }}>
        <a href="#top" style={{ textDecoration: "none" }}>
          <SinsulLogo size="sm" />
        </a>

        {/* 데스크탑 메뉴 */}
        <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }} className="nav-desktop">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} style={{ color: "#2A4A30", textDecoration: "none", fontSize: "13.5px", fontWeight: 500, letterSpacing: "0.3px", transition: "color 0.2s", position: "relative" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2D9E4F")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2A4A30")}
              >{item.label}</a>
            </li>
          ))}
          <li>
            <a href="/contact" style={{ background: "#2D9E4F", color: "white", padding: "8px 20px", borderRadius: 6, textDecoration: "none", fontSize: "13.5px", fontWeight: 500, transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#5CC67A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2D9E4F")}
            >문의하기</a>
          </li>
        </ul>

        {/* 모바일 햄버거 */}
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#0A2010" }} className="nav-mobile" aria-label="메뉴">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 모바일 드로어 */}
      {open && (
        <div style={{ position: "fixed", top: "var(--nav-h)", left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(12px)", zIndex: 999, display: "flex", flexDirection: "column", padding: "32px var(--px)", overflowY: "auto" }}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={close} style={{ display: "block", padding: "16px 0", fontSize: 17, fontWeight: 500, color: "#2A4A30", textDecoration: "none", borderBottom: "1px solid #E8F5EC" }}>
              {item.label}
            </a>
          ))}
          <a href="/contact" onClick={close} style={{ marginTop: 20, background: "#2D9E4F", color: "white", borderRadius: 10, padding: 16, textAlign: "center", textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
            문의하기
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .nav-desktop { display: none !important; } }
        @media (min-width: 901px) { .nav-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
