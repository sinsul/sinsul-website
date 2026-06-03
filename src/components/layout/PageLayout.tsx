import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, subtitle, eyebrow = "SINSUL", children }: Props) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "var(--nav-h)", minHeight: "100vh" }}>
        {/* 배너 */}
        <div style={{ background: "linear-gradient(135deg, #0A2010, #133A1C)", padding: "80px 0 60px", textAlign: "center" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)" }}>
            <div style={{ fontSize: 11, color: "#6A9E72", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16 }}>{eyebrow}</div>
            <h1 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>{title}</h1>
            {subtitle && <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{subtitle}</p>}
          </div>
        </div>
        {/* 본문 */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px var(--px)" }}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
