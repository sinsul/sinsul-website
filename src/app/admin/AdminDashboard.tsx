"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import SinsulLogo from "@/components/ui/SinsulLogo";
import { Plus, Pencil, Trash2, LogOut, X, Check, ExternalLink } from "lucide-react";
import type { ProjectRow, NewsRow } from "@/lib/supabase";

type InquiryRow = {
  id: number;
  name: string;
  org: string | null;
  phone: string;
  email: string | null;
  content: string;
  created_at: string;
};
import { categoryLabel } from "@/data/projects";
import { services } from "@/data/services";

/* 서비스 태그 전체 목록 */
const ALL_TAGS = Array.from(new Set(services.flatMap((s) => s.tags)));

type Tab = "projects" | "news" | "inquiries";

/* ── 색상 토큰 ── */
const C = {
  bg:        "#F2F9F4",
  white:     "#ffffff",
  dark:      "#0A2010",
  mid:       "#133A1C",
  main:      "#2D9E4F",
  light:     "#5CC67A",
  border:    "#C5DFC9",
  muted:     "#6A9E72",
  text:      "#0A2010",
  textSub:   "#2F5C38",
  inputBg:   "#F2F9F4",
};

/* ── 인풋 공통 스타일 ── */
const inputSt: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: 10,
  background: C.inputBg, border: `1px solid ${C.border}`,
  color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box",
};

/* ── Field ── */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>
        {label}{required && <span style={{ color: "#e53e3e", marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

/* ── Modal 버튼 ── */
function ModalButtons({ saving, onClose }: { saving: boolean; onClose: () => void }) {
  return (
    <div style={{ display: "flex", gap: 10, paddingTop: 8 }}>
      <button type="submit" disabled={saving}
        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "11px 0", background: C.main, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}>
        <Check size={15} />{saving ? "저장 중..." : "저장"}
      </button>
      <button type="button" onClick={onClose}
        style={{ padding: "11px 20px", border: `1px solid ${C.border}`, color: C.textSub, background: C.white, borderRadius: 10, fontSize: 14, cursor: "pointer" }}>
        취소
      </button>
    </div>
  );
}

/* ── Modal ── */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div style={{ width: "100%", maxWidth: 540, background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: 28, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: C.dark }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4 }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── TagSelector ── */
function TagSelector({ selected, onChange }: { selected: string[]; onChange: (tags: string[]) => void }) {
  const [custom, setCustom] = useState("");

  const toggle = (tag: string) => {
    onChange(selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag]);
  };

  const addCustom = () => {
    const t = custom.trim();
    if (t && !selected.includes(t)) { onChange([...selected, t]); }
    setCustom("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* 선택된 태그 */}
      {selected.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {selected.map((tag) => (
            <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, background: C.main, color: "#fff", fontSize: 12, fontWeight: 500 }}>
              {tag}
              <button type="button" onClick={() => toggle(tag)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)", padding: 0, lineHeight: 1, fontSize: 14 }}>×</button>
            </span>
          ))}
        </div>
      )}

      {/* 사전 정의 태그 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {ALL_TAGS.map((tag) => {
          const active = selected.includes(tag);
          return (
            <button key={tag} type="button" onClick={() => toggle(tag)}
              style={{ padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                background: active ? "rgba(45,158,79,0.15)" : C.bg,
                color: active ? C.main : C.textSub,
                border: active ? `1px solid ${C.main}` : `1px solid ${C.border}`,
              }}>
              {tag}
            </button>
          );
        })}
      </div>

      {/* 직접 입력 */}
      <div style={{ display: "flex", gap: 8 }}>
        <input value={custom} onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }}
          placeholder="직접 입력 후 Enter" style={{ ...inputSt, flex: 1 }} />
        <button type="button" onClick={addCustom}
          style={{ padding: "0 16px", background: C.mid, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
          추가
        </button>
      </div>
    </div>
  );
}

/* ── ProjectForm ── */
function ProjectForm({ initial, onSave, onClose }: { initial?: Partial<ProjectRow>; onSave: (d: Partial<ProjectRow>) => Promise<void>; onClose: () => void }) {
  const [form, setForm] = useState({
    year: initial?.year ?? new Date().getFullYear().toString(),
    client: initial?.client ?? "",
    service: initial?.service ?? "",
    count: initial?.count ?? "",
    amount: initial?.amount ?? "",
    category: initial?.category ?? "network",
    featured: initial?.featured ?? true,
    tags: initial?.tags ?? [] as string[],
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(initial?.id ? { ...form, id: initial.id } : form);
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="연도" required>
          <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2025" style={inputSt} required />
        </Field>
        <Field label="분류" required>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputSt}>
            {Object.entries(categoryLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </Field>
      </div>
      <Field label="기관명" required>
        <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="제주○○학교" style={inputSt} required />
      </Field>
      <Field label="사업 내용" required>
        <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="무선 네트워크 구축" style={inputSt} required />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="규모/수량" required>
          <input value={form.count} onChange={(e) => setForm({ ...form, count: e.target.value })} placeholder="AP 30대" style={inputSt} required />
        </Field>
        <Field label="계약금액 (숫자만)">
          <div style={{ position: "relative" }}>
            <input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value.replace(/[^0-9]/g, "") })}
              placeholder="1361209000" style={{ ...inputSt, paddingRight: 36 }} />
            <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: C.muted }}>원</span>
          </div>
          {form.amount && (
            <span style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
              {Number(form.amount).toLocaleString("ko-KR")}원
            </span>
          )}
        </Field>
      </div>

      {/* 태그 */}
      <Field label="사업 태그">
        <TagSelector selected={form.tags} onChange={(tags) => setForm({ ...form, tags })} />
      </Field>

      <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} style={{ width: 16, height: 16, accentColor: C.main }} />
        <span style={{ fontSize: 14, color: C.textSub }}>주요실적 홈 화면에 노출</span>
      </label>
      <ModalButtons saving={saving} onClose={onClose} />
    </form>
  );
}

/* ── NewsForm ── */
function NewsForm({ initial, onSave, onClose }: { initial?: Partial<NewsRow>; onSave: (d: Partial<NewsRow>) => Promise<void>; onClose: () => void }) {
  const [form, setForm] = useState({
    date: initial?.date ?? new Date().toISOString().slice(0, 10),
    category: initial?.category ?? "공지",
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    published: initial?.published ?? true,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(initial?.id ? { ...form, id: initial.id } : form);
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="날짜" required>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={inputSt} required />
        </Field>
        <Field label="분류" required>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputSt}>
            {["공지", "소식", "채용", "이벤트"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label="제목" required>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="공지사항 제목" style={inputSt} required />
      </Field>
      <Field label="요약 (목록에 표시)">
        <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="짧은 설명" style={inputSt} />
      </Field>
      <Field label="내용">
        <textarea value={form.content ?? ""} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} placeholder="상세 내용 입력" style={{ ...inputSt, resize: "none" }} />
      </Field>
      <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} style={{ width: 16, height: 16, accentColor: C.main }} />
        <span style={{ fontSize: 14, color: C.textSub }}>게시 (체크 해제 시 비공개)</span>
      </label>
      <ModalButtons saving={saving} onClose={onClose} />
    </form>
  );
}

/* ══════════════════════════════════════
   메인 대시보드
══════════════════════════════════════ */
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [news, setNews] = useState<NewsRow[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [modal, setModal] = useState<{ type: Tab; item?: ProjectRow | NewsRow } | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"ok" | "warn" | "err">("ok");
  const [sqlBanner, setSqlBanner] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  const showToast = (msg: string, type: "ok" | "warn" | "err" = "ok") => {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(""), 3500);
  };

  const loadProjects = useCallback(async () => {
    const res = await fetch("/api/admin/projects");
    if (res.ok) { setProjects(await res.json()); }
    else { const j = await res.json().catch(() => ({})); setDbError(j.error ?? `납품실적 로드 실패 (${res.status})`); }
  }, []);

  const loadNews = useCallback(async () => {
    const res = await fetch("/api/admin/news");
    if (res.ok) { setNews(await res.json()); }
    else { const j = await res.json().catch(() => ({})); setDbError(j.error ?? `공지사항 로드 실패 (${res.status})`); }
  }, []);

  const loadInquiries = useCallback(async () => {
    const res = await fetch("/api/admin/inquiries");
    if (res.ok) { setInquiries(await res.json()); }
    // 문의내역은 테이블 미생성일 수 있으므로 조용히 처리
  }, []);

  useEffect(() => {
    Promise.all([loadProjects(), loadNews(), loadInquiries()]).finally(() => setLoading(false));
  }, [loadProjects, loadNews, loadInquiries]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function saveProject(data: Partial<ProjectRow>) {
    const method = data.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/projects", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const json = await res.json();
    if (res.ok) {
      await loadProjects();
      setModal(null);
      if (json._fallback) {
        setSqlBanner(true);
        showToast("기본 정보로 저장됐습니다. tags/amount는 SQL 추가 후 사용 가능합니다.", "warn");
      } else {
        showToast(data.id ? "수정되었습니다." : "등록되었습니다.", "ok");
      }
    } else {
      showToast(`저장 실패: ${json.error ?? "알 수 없는 오류"}`, "err");
    }
  }

  async function deleteProject(id: number) {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch("/api/admin/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await loadProjects(); showToast("삭제되었습니다.");
  }

  async function saveNews(data: Partial<NewsRow>) {
    const method = data.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/news", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const json = await res.json();
    if (res.ok) { await loadNews(); setModal(null); showToast(data.id ? "수정되었습니다." : "등록되었습니다."); }
    else { showToast(`저장 실패: ${json.error ?? "알 수 없는 오류"}`, "err"); }
  }

  async function deleteInquiry(id: number) {
    if (!confirm("문의를 삭제하시겠습니까?")) return;
    await fetch("/api/admin/inquiries", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await loadInquiries(); showToast("삭제되었습니다.");
  }

  async function deleteNews(id: number) {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch("/api/admin/news", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await loadNews(); showToast("삭제되었습니다.");
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "var(--font-dm), var(--font-noto), sans-serif" }}>

      {/* ── 헤더 ── */}
      <header style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 8px rgba(10,32,16,0.06)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <SinsulLogo size="sm" />
          <span style={{ fontSize: 13, color: C.muted, borderLeft: `1px solid ${C.border}`, paddingLeft: 16 }}>관리자</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button onClick={async () => {
            const res = await fetch("/api/admin/revalidate", { method: "POST" });
            if (res.ok) showToast("홈페이지 캐시를 새로고침했습니다.", "ok");
            else showToast("새로고침 실패", "err");
          }} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.muted, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.main)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
            ↻ 홈페이지 새로고침
          </button>
          <a href="/" target="_blank" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.muted, textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.dark)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
            <ExternalLink size={14} /> 사이트 보기
          </a>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.muted, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e53e3e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
            <LogOut size={14} /> 로그아웃
          </button>
        </div>
      </header>

      {/* ── DB 오류 배너 ── */}
      {dbError && (
        <div style={{ background: "#FEE2E2", borderBottom: "2px solid #DC2626", padding: "14px 32px", display: "flex", alignItems: "flex-start", gap: 12, fontSize: 13 }}>
          <span style={{ fontSize: 18 }}>🔴</span>
          <div>
            <strong style={{ color: "#7F1D1D", display: "block", marginBottom: 4 }}>데이터베이스 연결 오류</strong>
            <span style={{ color: "#991B1B" }}>{dbError}</span>
            <br />
            <span style={{ color: "#991B1B" }}>Vercel 환경변수에 <code style={{ background: "#FCA5A5", padding: "1px 6px", borderRadius: 4 }}>SUPABASE_SERVICE_ROLE_KEY</code>가 설정되어 있는지 확인하세요.</span>
            <br />
            <a href="/api/admin/check" target="_blank" style={{ color: "#B91C1C", fontSize: 12, textDecoration: "underline", marginTop: 4, display: "inline-block" }}>
              진단 페이지 열기 →
            </a>
          </div>
          <button onClick={() => setDbError(null)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#7F1D1D", fontSize: 18, flexShrink: 0 }}>×</button>
        </div>
      )}

      {/* ── SQL 안내 배너 ── */}
      {sqlBanner && (
        <div style={{ background: "#FFF8E1", borderBottom: "2px solid #F6C90E", padding: "14px 32px", display: "flex", alignItems: "flex-start", gap: 12, fontSize: 13 }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <div>
            <strong style={{ color: "#7B5800", display: "block", marginBottom: 4 }}>tags / amount 컬럼이 Supabase에 없습니다</strong>
            <span style={{ color: "#7B5800" }}>Supabase 대시보드 → SQL Editor 에서 아래 SQL을 실행하면 태그·금액 기능이 활성화됩니다.</span>
            <code style={{ display: "block", marginTop: 8, padding: "8px 12px", background: "#FFF3CD", borderRadius: 6, fontFamily: "monospace", fontSize: 12, color: "#5A3E00", whiteSpace: "pre-wrap" }}>
              {`ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';\nALTER TABLE projects ADD COLUMN IF NOT EXISTS amount text DEFAULT '';`}
            </code>
          </div>
          <button onClick={() => setSqlBanner(false)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#7B5800", fontSize: 18, flexShrink: 0 }}>×</button>
        </div>
      )}

      {/* ── 본문 ── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 24px" }}>

        {/* 탭 */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {([["projects", "납품실적"], ["news", "공지사항"], ["inquiries", "문의내역"]] as [Tab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ padding: "9px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                background: tab === key ? C.main : C.white,
                color: tab === key ? "#fff" : C.textSub,
                boxShadow: tab === key ? "0 4px 12px rgba(45,158,79,0.25)" : "none",
                border: tab === key ? `1px solid ${C.main}` : `1px solid ${C.border}`,
              }}>
              {label}
              <span style={{ marginLeft: 6, fontSize: 12, opacity: 0.7 }}>
                {key === "projects" ? projects.length : key === "news" ? news.length : inquiries.length}
              </span>
            </button>
          ))}

          {/* 추가 버튼 (우측) — 문의내역 탭에선 숨김 */}
          {tab !== "inquiries" && (
            <button onClick={() => setModal({ type: tab })}
              style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", background: C.dark, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.mid)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.dark)}>
              <Plus size={16} />
              {tab === "projects" ? "납품실적 추가" : "공지사항 작성"}
            </button>
          )}
        </div>

        {/* 테이블 */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: C.muted, fontSize: 15 }}>불러오는 중...</div>
        ) : (
          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 2px 12px rgba(10,32,16,0.06)" }}>
            {tab === "inquiries" ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                    {["접수일시", "이름", "회사/기관", "연락처", "이메일", "문의내용", "삭제"].map((h, i) => (
                      <th key={h} style={{ padding: "13px 20px", textAlign: i === 6 ? "center" : "left", fontSize: 13, fontWeight: 600, color: C.textSub, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((q) => (
                    <tr key={q.id} style={{ borderBottom: `1px solid ${C.bg}` }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td style={{ padding: "13px 20px", color: C.textSub, fontSize: 12, whiteSpace: "nowrap" }}>
                        {new Date(q.created_at).toLocaleString("ko-KR", { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td style={{ padding: "13px 20px", color: C.dark, fontSize: 14, fontWeight: 600 }}>{q.name}</td>
                      <td style={{ padding: "13px 20px", color: C.textSub, fontSize: 13 }}>{q.org ?? "-"}</td>
                      <td style={{ padding: "13px 20px", color: C.textSub, fontSize: 13, whiteSpace: "nowrap" }}>{q.phone}</td>
                      <td style={{ padding: "13px 20px", color: C.textSub, fontSize: 13 }}>{q.email ?? "-"}</td>
                      <td style={{ padding: "13px 20px", color: C.textSub, fontSize: 13, maxWidth: 240 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={q.content}>{q.content}</div>
                      </td>
                      <td style={{ padding: "13px 20px", textAlign: "center" }}>
                        <button onClick={() => deleteInquiry(q.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4, borderRadius: 6 }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#e53e3e")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr><td colSpan={7} style={{ padding: "60px 20px", textAlign: "center", color: C.muted, fontSize: 14 }}>접수된 문의가 없습니다.</td></tr>
                  )}
                </tbody>
              </table>
            ) : tab === "projects" ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                    {["연도", "기관명", "사업내용", "규모/수량", "계약금액", "태그", "관리"].map((h, i) => (
                      <th key={h} style={{ padding: "13px 20px", textAlign: i === 6 ? "center" : "left", fontSize: 13, fontWeight: 600, color: C.textSub, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} style={{ borderBottom: `1px solid ${C.bg}` }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td style={{ padding: "13px 20px", color: C.main, fontWeight: 700, fontSize: 14 }}>{p.year}</td>
                      <td style={{ padding: "13px 20px", color: C.dark, fontSize: 14, fontWeight: 500 }}>{p.client}</td>
                      <td style={{ padding: "13px 20px", color: C.textSub, fontSize: 13 }}>{p.service}</td>
                      <td style={{ padding: "13px 20px", color: C.textSub, fontSize: 13 }}>{p.count}</td>
                      <td style={{ padding: "13px 20px", color: C.dark, fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
                        {p.amount ? `${Number(p.amount).toLocaleString("ko-KR")}원` : "-"}
                      </td>
                      <td style={{ padding: "13px 20px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, maxWidth: 200 }}>
                          {(p.tags ?? []).slice(0, 3).map((tag) => (
                            <span key={tag} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "rgba(45,158,79,0.1)", color: C.main, whiteSpace: "nowrap" }}>
                              {tag}
                            </span>
                          ))}
                          {(p.tags ?? []).length > 3 && (
                            <span style={{ fontSize: 11, color: C.muted }}>+{(p.tags ?? []).length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "13px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                          <button onClick={() => setModal({ type: "projects", item: p })}
                            style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4, borderRadius: 6 }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = C.main)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => deleteProject(p.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4, borderRadius: 6 }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#e53e3e")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* 합계 행 */}
                  {projects.length > 0 && (() => {
                    const total = projects.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
                    return total > 0 ? (
                      <tr style={{ background: "#0A2010" }}>
                        <td colSpan={4} style={{ padding: "13px 20px", color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "right" }}>
                          전체 계약금액 합계
                        </td>
                        <td style={{ padding: "13px 20px", color: "#86C83A", fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" }}>
                          {total.toLocaleString("ko-KR")}원
                        </td>
                        <td colSpan={2} />
                      </tr>
                    ) : null;
                  })()}
                  {projects.length === 0 && (
                    <tr><td colSpan={7} style={{ padding: "60px 20px", textAlign: "center", color: C.muted, fontSize: 14 }}>등록된 납품실적이 없습니다.</td></tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                    {["날짜", "제목", "분류", "공개", "관리"].map((h, i) => (
                      <th key={h} style={{ padding: "13px 20px", textAlign: i >= 2 ? "center" : "left", fontSize: 13, fontWeight: 600, color: C.textSub, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {news.map((n) => (
                    <tr key={n.id} style={{ borderBottom: `1px solid ${C.bg}` }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <td style={{ padding: "13px 20px", color: C.textSub, fontSize: 13, whiteSpace: "nowrap" }}>{n.date}</td>
                      <td style={{ padding: "13px 20px", color: C.dark, fontSize: 14, fontWeight: 500 }}>{n.title}</td>
                      <td style={{ padding: "13px 20px", textAlign: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: "rgba(45,158,79,0.1)", color: C.main }}>{n.category}</span>
                      </td>
                      <td style={{ padding: "13px 20px", textAlign: "center" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: n.published ? "#16a34a" : C.muted }}>{n.published ? "공개" : "비공개"}</span>
                      </td>
                      <td style={{ padding: "13px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                          <button onClick={() => setModal({ type: "news", item: n })}
                            style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4 }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = C.main)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => deleteNews(n.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4 }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#e53e3e")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {news.length === 0 && (
                    <tr><td colSpan={5} style={{ padding: "60px 20px", textAlign: "center", color: C.muted, fontSize: 14 }}>등록된 공지사항이 없습니다.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* ── 모달 ── */}
      {modal && (
        <Modal
          title={modal.type === "projects" ? (modal.item ? "납품실적 수정" : "납품실적 추가") : (modal.item ? "공지사항 수정" : "공지사항 작성")}
          onClose={() => setModal(null)}
        >
          {modal.type === "projects"
            ? <ProjectForm initial={modal.item as ProjectRow} onSave={saveProject} onClose={() => setModal(null)} />
            : <NewsForm initial={modal.item as NewsRow} onSave={saveNews} onClose={() => setModal(null)} />
          }
        </Modal>
      )}

      {/* ── 토스트 ── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
          padding: "12px 24px", fontSize: 14, fontWeight: 500, borderRadius: 100,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 100, maxWidth: "90vw", textAlign: "center",
          background: toastType === "ok" ? C.main : toastType === "warn" ? "#D97706" : "#DC2626",
          color: "#fff",
        }}>
          {toastType === "ok" ? "✓ " : toastType === "warn" ? "⚠ " : "✕ "}{toast}
        </div>
      )}
    </div>
  );
}
