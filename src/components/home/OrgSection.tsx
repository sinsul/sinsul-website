import { orgChart } from "@/data/projects";

export default function OrgSection() {
  return (
    <section id="org" style={{ background: "#fff", padding: "var(--py) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--px)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, color: "#2D9E4F", fontSize: 12, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase" }}>
          <span style={{ width: 36, height: 1, background: "#2D9E4F", display: "inline-block" }} />
          조직구성
        </div>
        <h2 style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#0A2010", lineHeight: 1.3, marginBottom: 8 }}>조직도 및 엔지니어 현황</h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2F5C38", marginBottom: 64 }}>전문성을 갖춘 각 본부와 팀이 유기적으로 협력하여 최고의 ICT 서비스를 제공합니다.</p>

        {/* 조직도 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* CEO */}
          <div style={{ background: "#2D9E4F", color: "white", borderRadius: 12, padding: "14px 48px", fontSize: 16, fontWeight: 700, letterSpacing: 1, boxShadow: "0 4px 20px rgba(45,158,79,0.3)" }}>
            CEO
          </div>
          <div style={{ width: 2, height: 36, background: "#C5DFC9" }} />

          {/* 3본부 행 — 가로선 + 각 본부 */}
          <div className="org-row" style={{ width: "100%", display: "flex", position: "relative" }}>
            {/* 가로선 */}
            <div style={{ position: "absolute", top: 0, left: "16%", right: "16%", height: 2, background: "#C5DFC9" }} />

            {orgChart.depts.map((dept) => (
              <div key={dept.name} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* CEO → 본부 수직선 */}
                <div style={{ width: 2, height: 36, background: "#C5DFC9" }} />
                {/* 본부 박스 */}
                <div style={{ background: dept.color, color: "white", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, textAlign: "center", minWidth: 130, whiteSpace: "nowrap" }}>
                  {dept.name}
                </div>
                {/* 본부 → 팀 수직선 */}
                <div style={{ width: 2, height: 32, background: "#C5DFC9" }} />
                {/* 팀 가로선 */}
                {dept.teams.length > 1 && (
                  <div style={{ position: "relative", width: "90%", height: 2, background: "#C5DFC9", marginBottom: 0 }} />
                )}
                {/* 팀 목록 (같은 높이) */}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
                  {dept.teams.map((team) => (
                    <div key={team} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 2, height: 24, background: "#C5DFC9" }} />
                      <div style={{
                        background: team.includes("연구") ? "rgba(134,200,58,0.12)" : "#F2F9F4",
                        color: team.includes("연구") ? "#2A4A10" : "#0A2010",
                        borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 600,
                        border: team.includes("연구") ? "1px solid rgba(134,200,58,0.4)" : "1px solid #C5DFC9",
                        textAlign: "center", whiteSpace: "nowrap",
                      }}>
                        {team}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 엔지니어 현황 테이블 */}
        <div style={{ marginTop: 64, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", maxWidth: 700, margin: "0 auto", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                {["구분", "H/W 분야", "S/W 분야", "통신 분야", "기타 분야"].map((h, i) => (
                  <th key={h} style={{
                    background: i === 0 ? "#0A2010" : "#2D9E4F",
                    color: "white", padding: "13px 20px", fontWeight: 600,
                    textAlign: "center", whiteSpace: "nowrap",
                    borderRadius: i === 0 ? "8px 0 0 0" : i === 4 ? "0 8px 0 0" : undefined,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orgChart.engineers.map((row, i) => {
                const isTotal = i === orgChart.engineers.length - 1;
                return (
                  <tr key={i} style={{ background: isTotal ? "#0A2010" : i % 2 === 0 ? "#fff" : "#F9FDF9" }}>
                    <td style={{ padding: "12px 20px", textAlign: "center", borderBottom: "1px solid #E8F5EC", color: isTotal ? "white" : "#0A2010", fontWeight: isTotal ? 700 : 600 }}>{row.grade}</td>
                    {[row.hw, row.sw, row.telecom, row.etc].map((v, j) => (
                      <td key={j} style={{ padding: "12px 20px", textAlign: "center", borderBottom: "1px solid #E8F5EC", color: isTotal ? "white" : "#2F5C38", fontWeight: isTotal ? 700 : 400 }}>{v}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        /* 모바일: 조직도 세로 스택 */
        @media (max-width: 600px) {
          .org-row {
            flex-direction: column !important;
            align-items: center;
            gap: 16px;
          }
          .org-row > div {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </section>
  );
}
