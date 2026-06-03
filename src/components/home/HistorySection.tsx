import { history } from "@/data/company";

export default function HistorySection() {
  return (
    <section id="history" style={{ background: "#F2F9F4", padding: "var(--py) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, color: "#2D9E4F", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
          <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
          연혁
        </div>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#0A2010", lineHeight: 1.3, marginBottom: 8 }}>10년의 성장 스토리</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2F5C38", marginBottom: 64 }}>2015년 창립 이래 끊임없는 기술 혁신과 사업 확장으로 제주 ICT를 선도해 왔습니다.</p>

        {/* 타임라인 */}
        <div style={{ position: "relative", paddingLeft: 40, borderLeft: "2px solid #C5DFC9" }}>
          {history.map((h, i) => (
            <div key={i} className="fade-up" style={{ position: "relative", paddingBottom: 48 }}>
              {/* 도트 */}
              <div style={{
                position: "absolute", left: -49, top: 4,
                width: 16, height: 16, borderRadius: "50%",
                background: "#2D9E4F", border: "3px solid #F2F9F4",
                boxShadow: "0 0 0 2px #2D9E4F",
              }} />
              {/* 연도 */}
              <div style={{ fontFamily: "var(--font-dm)", fontSize: 22, fontWeight: 300, color: "#2D9E4F", marginBottom: 12, letterSpacing: "-0.5px" }}>
                {h.period}
              </div>
              {/* 항목 */}
              <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {h.events.map((ev, j) => (
                  <li key={j} style={{ fontSize: 14, color: "#2F5C38", lineHeight: 1.6, listStyle: "none", paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#2D9E4F", fontSize: 18, lineHeight: "1.3" }}>·</span>
                    <span dangerouslySetInnerHTML={{ __html: ev.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#0A2010;font-weight:600">$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
