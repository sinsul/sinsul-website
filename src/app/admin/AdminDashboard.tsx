"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import SinsulLogo from "@/components/ui/SinsulLogo";
import { Plus, Pencil, Trash2, LogOut, X, Check, ExternalLink } from "lucide-react";
import type { ProjectRow, NewsRow } from "@/lib/supabase";
import { categoryLabel } from "@/data/projects";

type Tab = "projects" | "news";

// ── 모달 폼 ──────────────────────────────────────────────

function ProjectForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: Partial<ProjectRow>;
  onSave: (data: Partial<ProjectRow>) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    year: initial?.year ?? new Date().getFullYear().toString(),
    client: initial?.client ?? "",
    service: initial?.service ?? "",
    count: initial?.count ?? "",
    category: initial?.category ?? "network",
    featured: initial?.featured ?? false,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(initial?.id ? { ...form, id: initial.id } : form);
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="연도" required>
          <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2025" className={inputCls} required />
        </Field>
        <Field label="분류" required>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
            {Object.entries(categoryLabel).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="기관명" required>
        <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="제주○○학교" className={inputCls} required />
      </Field>
      <Field label="사업 내용" required>
        <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="무선 네트워크 구축" className={inputCls} required />
      </Field>
      <Field label="규모/수량" required>
        <input value={form.count} onChange={(e) => setForm({ ...form, count: e.target.value })} placeholder="AP 30대" className={inputCls} required />
      </Field>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-brand-accent" />
        <span className="text-white/70 text-sm">홈 화면에 노출</span>
      </label>
      <ModalButtons saving={saving} onClose={onClose} />
    </form>
  );
}

function NewsForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: Partial<NewsRow>;
  onSave: (data: Partial<NewsRow>) => Promise<void>;
  onClose: () => void;
}) {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="날짜" required>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} required />
        </Field>
        <Field label="분류" required>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
            {["공지", "소식", "채용", "이벤트"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="제목" required>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="공지사항 제목" className={inputCls} required />
      </Field>
      <Field label="요약 (목록에 표시)">
        <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="짧은 설명" className={inputCls} />
      </Field>
      <Field label="내용">
        <textarea value={form.content ?? ""} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} placeholder="상세 내용 입력" className={inputCls + " resize-none"} />
      </Field>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-brand-accent" />
        <span className="text-white/70 text-sm">게시 (체크 해제 시 비공개)</span>
      </label>
      <ModalButtons saving={saving} onClose={onClose} />
    </form>
  );
}

// ── 공통 UI 헬퍼 ─────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent transition-colors text-sm";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-white/50 text-xs mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function ModalButtons({ saving, onClose }: { saving: boolean; onClose: () => void }) {
  return (
    <div className="flex gap-2 pt-2">
      <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-accent text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50">
        <Check size={15} />{saving ? "저장 중..." : "저장"}
      </button>
      <button type="button" onClick={onClose} className="px-4 py-2.5 border border-white/20 text-white/60 text-sm rounded-lg hover:bg-white/5 transition-colors">
        취소
      </button>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-brand-dark border border-white/10 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold">{title}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── 메인 대시보드 ─────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [news, setNews] = useState<NewsRow[]>([]);
  const [modal, setModal] = useState<{ type: Tab; item?: ProjectRow | NewsRow } | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const loadProjects = useCallback(async () => {
    const res = await fetch("/api/admin/projects");
    if (res.ok) setProjects(await res.json());
  }, []);

  const loadNews = useCallback(async () => {
    const res = await fetch("/api/admin/news");
    if (res.ok) setNews(await res.json());
  }, []);

  useEffect(() => {
    Promise.all([loadProjects(), loadNews()]).finally(() => setLoading(false));
  }, [loadProjects, loadNews]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function saveProject(data: Partial<ProjectRow>) {
    const method = data.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      await loadProjects();
      setModal(null);
      showToast(data.id ? "수정되었습니다." : "등록되었습니다.");
    }
  }

  async function deleteProject(id: number) {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadProjects();
    showToast("삭제되었습니다.");
  }

  async function saveNews(data: Partial<NewsRow>) {
    const method = data.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/news", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      await loadNews();
      setModal(null);
      showToast(data.id ? "수정되었습니다." : "등록되었습니다.");
    }
  }

  async function deleteNews(id: number) {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch("/api/admin/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadNews();
    showToast("삭제되었습니다.");
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* 헤더 */}
      <header className="border-b border-white/10 bg-brand-darker px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SinsulLogo size="sm" />
          <span className="text-white/40 text-sm border-l border-white/10 pl-4">관리자</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors">
            <ExternalLink size={14} /> 사이트 보기
          </a>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-white/40 hover:text-red-400 text-sm transition-colors">
            <LogOut size={14} /> 로그아웃
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 탭 */}
        <div className="flex gap-2 mb-6">
          {([["projects", "납품실적"], ["news", "공지사항"]] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === key ? "bg-brand-accent text-white" : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
              <span className="ml-2 text-xs opacity-70">
                {key === "projects" ? projects.length : news.length}
              </span>
            </button>
          ))}
        </div>

        {/* 추가 버튼 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setModal({ type: tab })}
            className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-colors"
          >
            <Plus size={16} />
            {tab === "projects" ? "납품실적 추가" : "공지사항 작성"}
          </button>
        </div>

        {/* 테이블 */}
        {loading ? (
          <div className="text-center py-20 text-white/30">불러오는 중...</div>
        ) : (
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {tab === "projects" ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-white/50 text-sm">
                    <th className="px-5 py-3 text-left">연도</th>
                    <th className="px-5 py-3 text-left">기관명</th>
                    <th className="px-5 py-3 text-left hidden md:table-cell">사업내용</th>
                    <th className="px-5 py-3 text-left hidden sm:table-cell">규모</th>
                    <th className="px-5 py-3 text-center w-24">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3 text-brand-accent font-semibold text-sm">{p.year}</td>
                      <td className="px-5 py-3 text-white text-sm">{p.client}</td>
                      <td className="px-5 py-3 text-white/60 text-sm hidden md:table-cell">{p.service}</td>
                      <td className="px-5 py-3 text-white/60 text-sm hidden sm:table-cell">{p.count}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => setModal({ type: "projects", item: p })} className="text-white/40 hover:text-brand-accent transition-colors"><Pencil size={15} /></button>
                          <button onClick={() => deleteProject(p.id)} className="text-white/40 hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr><td colSpan={5} className="px-5 py-12 text-center text-white/30 text-sm">등록된 납품실적이 없습니다.</td></tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-white/50 text-sm">
                    <th className="px-5 py-3 text-left">날짜</th>
                    <th className="px-5 py-3 text-left">제목</th>
                    <th className="px-5 py-3 text-center hidden sm:table-cell w-20">분류</th>
                    <th className="px-5 py-3 text-center hidden sm:table-cell w-20">공개</th>
                    <th className="px-5 py-3 text-center w-24">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((n) => (
                    <tr key={n.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3 text-white/60 text-sm whitespace-nowrap">{n.date}</td>
                      <td className="px-5 py-3 text-white text-sm">{n.title}</td>
                      <td className="px-5 py-3 text-center hidden sm:table-cell">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-brand-accent/10 text-brand-accent">{n.category}</span>
                      </td>
                      <td className="px-5 py-3 text-center hidden sm:table-cell">
                        <span className={`text-xs ${n.published ? "text-green-400" : "text-white/30"}`}>{n.published ? "공개" : "비공개"}</span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => setModal({ type: "news", item: n })} className="text-white/40 hover:text-brand-accent transition-colors"><Pencil size={15} /></button>
                          <button onClick={() => deleteNews(n.id)} className="text-white/40 hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {news.length === 0 && (
                    <tr><td colSpan={5} className="px-5 py-12 text-center text-white/30 text-sm">등록된 공지사항이 없습니다.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* 모달 */}
      {modal && (
        <Modal
          title={
            modal.type === "projects"
              ? (modal.item ? "납품실적 수정" : "납품실적 추가")
              : (modal.item ? "공지사항 수정" : "공지사항 작성")
          }
          onClose={() => setModal(null)}
        >
          {modal.type === "projects" ? (
            <ProjectForm initial={modal.item as ProjectRow} onSave={saveProject} onClose={() => setModal(null)} />
          ) : (
            <NewsForm initial={modal.item as NewsRow} onSave={saveNews} onClose={() => setModal(null)} />
          )}
        </Modal>
      )}

      {/* 토스트 */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-brand-accent text-white text-sm rounded-full shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
