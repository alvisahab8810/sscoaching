import { useEffect, useState } from "react";
import Head from "next/head";
import { toast } from "sonner";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { WEEK, dayName, fmt12, TEMPLATES, suggestTemplate } from "@/lib/classSchedule";

const daysText = (days) => WEEK.filter((w) => days.includes(w.d)).map((w) => w.short).join(", ");

export default function ClassSchedulePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null); // { course, active, days, slots, note }
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/class-schedule")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCourses(d.courses);
        else toast.error(d.message || "Could not load courses");
      })
      .catch(() => toast.error("Network error"))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const open = (course) => {
    const s = course.schedule;
    if (s) {
      setEdit({ course, active: s.active, days: [...s.days], slots: s.slots.map((x) => ({ ...x })), note: s.note || "" });
    } else {
      // New timetable: start from the matching printed timing, if any.
      const t = suggestTemplate(course.title);
      setEdit({
        course,
        active: true,
        days: t ? [...t.days] : [1, 3, 5],
        slots: t ? t.slots.map((x) => ({ ...x })) : [{ start: "", end: "", subject: "" }],
        note: t?.note || "",
        fromTemplate: t?.label || "",
      });
    }
  };

  const applyTemplate = (key) => {
    const t = TEMPLATES.find((x) => x.key === key);
    if (!t) return;
    setEdit((e) => ({ ...e, days: [...t.days], slots: t.slots.map((x) => ({ ...x })), note: t.note, fromTemplate: t.label }));
  };

  const toggleDay = (d) =>
    setEdit((e) => ({ ...e, days: e.days.includes(d) ? e.days.filter((x) => x !== d) : [...e.days, d] }));
  const setSlot = (i, key, value) =>
    setEdit((e) => ({ ...e, slots: e.slots.map((s, j) => (j === i ? { ...s, [key]: value } : s)) }));
  const addSlot = () =>
    setEdit((e) => {
      const last = e.slots[e.slots.length - 1];
      return { ...e, slots: [...e.slots, { start: last?.end || "", end: "", subject: "" }] };
    });
  const removeSlot = (i) => setEdit((e) => ({ ...e, slots: e.slots.filter((_, j) => j !== i) }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/class-schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: edit.course._id,
          active: edit.active,
          days: edit.days,
          slots: edit.slots,
          note: edit.note,
        }),
      });
      const d = await res.json();
      if (!d.success) throw new Error(d.message || "Could not save");
      toast.success("Schedule saved");
      setEdit(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Head><title>Class Schedule — Admin Dashboard</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 cs-bg" style={{ minWidth: 0 }}>
            <div className="container-fluid p-4">
              <div className="cs-page">
                <h4 className="cs-title">Class Schedule</h4>
                <p className="cs-sub">
                  Weekly class timing of each Pro batch. A student sees only the timing of the Pro batch they have bought,
                  on the website dashboard and in the app.
                </p>

                <div className="cs-card">
                  <div className="cs-table-wrap">
                    <table className="cs-table">
                      <thead>
                        <tr>
                          <th>Pro batch (bundle course)</th>
                          <th>Schedule</th>
                          <th>Days</th>
                          <th>Classes</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {loading && <tr><td colSpan={5} className="cs-empty">Loading…</td></tr>}
                        {!loading && courses.length === 0 && (
                          <tr><td colSpan={5} className="cs-empty">No bundle courses yet</td></tr>
                        )}
                        {!loading && courses.map((c) => {
                          const s = c.schedule;
                          return (
                            <tr key={c._id}>
                              <td>
                                <div className="cs-strong">{c.title}</div>
                                <div className="cs-muted">{c.batch}{c.status !== "published" ? " · Draft" : ""}</div>
                              </td>
                              <td>
                                {!s ? <span className="cs-chip">Not set</span>
                                  : s.active ? <span className="cs-chip on">Showing to students</span>
                                  : <span className="cs-chip">Hidden</span>}
                              </td>
                              <td className="cs-nowrap">{s ? daysText(s.days) || "—" : "—"}</td>
                              <td className="cs-list">
                                {s ? s.slots.map((x, i) => (
                                  <div key={i}>{fmt12(x.start)} – {fmt12(x.end)} · {x.subject}</div>
                                )) : "—"}
                              </td>
                              <td className="cs-right">
                                <button className="cs-btn" onClick={() => open(c)}>
                                  {s ? <><FiEdit2 size={14} /> Edit</> : <><FiPlus size={14} /> Set schedule</>}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && (
        <div className="cs-backdrop" onClick={() => !saving && setEdit(null)}>
          <div className="cs-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cs-modal-head">
              <div>
                <div className="cs-modal-title">Class schedule</div>
                <div className="cs-muted">{edit.course.title}</div>
              </div>
              <button className="cs-x" onClick={() => setEdit(null)} disabled={saving}>×</button>
            </div>

            <div className="cs-modal-body">
              <label className="cs-label">Fill from printed timing</label>
              <div className="cs-row">
                <select className="cs-input" value="" onChange={(e) => applyTemplate(e.target.value)}>
                  <option value="">Choose a batch timing…</option>
                  {TEMPLATES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
                </select>
                {edit.fromTemplate && <span className="cs-muted">Filled from {edit.fromTemplate}. Check before saving.</span>}
              </div>

              <label className="cs-label">Class days</label>
              <div className="cs-days">
                {WEEK.map((w) => (
                  <button
                    key={w.d}
                    type="button"
                    className={edit.days.includes(w.d) ? "on" : ""}
                    onClick={() => toggleDay(w.d)}
                    title={w.long}
                  >
                    {w.short}
                  </button>
                ))}
              </div>

              <label className="cs-label">Classes (IST)</label>
              <table className="cs-table cs-slots">
                <thead>
                  <tr><th>Start</th><th>End</th><th>Subject</th><th /></tr>
                </thead>
                <tbody>
                  {edit.slots.map((s, i) => (
                    <tr key={i}>
                      <td><input type="time" className="cs-input" value={s.start} onChange={(e) => setSlot(i, "start", e.target.value)} /></td>
                      <td><input type="time" className="cs-input" value={s.end} onChange={(e) => setSlot(i, "end", e.target.value)} /></td>
                      <td><input className="cs-input cs-wide" value={s.subject} placeholder="Subject" onChange={(e) => setSlot(i, "subject", e.target.value)} /></td>
                      <td>
                        <button className="cs-icon" onClick={() => removeSlot(i)} title="Remove"><FiTrash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="cs-btn" onClick={addSlot}><FiPlus size={14} /> Add class</button>

              <label className="cs-label">Note for students (optional)</label>
              <textarea
                className="cs-input cs-note"
                rows={3}
                value={edit.note}
                maxLength={500}
                onChange={(e) => setEdit((x) => ({ ...x, note: e.target.value }))}
                placeholder="Example: Offline and online classes both available."
              />

              <label className="cs-check">
                <input type="checkbox" checked={edit.active} onChange={(e) => setEdit((x) => ({ ...x, active: e.target.checked }))} />
                Show this schedule to enrolled students
              </label>

              {edit.days.length > 0 && edit.slots.some((s) => s.start && s.subject) && (
                <div className="cs-preview">
                  Students will see: {WEEK.filter((w) => edit.days.includes(w.d)).map((w) => dayName(w.d)).join(", ")} ·{" "}
                  {edit.slots.filter((s) => s.start && s.subject).length} classes
                </div>
              )}
            </div>

            <div className="cs-modal-foot">
              <button className="cs-btn" onClick={() => setEdit(null)} disabled={saving}>Cancel</button>
              <button className="cs-btn primary" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save schedule"}</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .cs-bg { background: #f1f5f9; }
        .cs-page { max-width: 1100px; }
        .cs-title { font-weight: 700; color: #0f172a; margin: 0; }
        .cs-sub { font-size: 0.86rem; color: #64748b; margin: 4px 0 16px; max-width: 720px; }
        .cs-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px; }
        .cs-table-wrap { overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 10px; }
        .cs-table { width: 100%; border-collapse: collapse; font-size: 0.86rem; }
        .cs-table th {
          text-align: left; font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase;
          letter-spacing: 0.04em; padding: 10px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; white-space: nowrap;
        }
        .cs-table td { padding: 11px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; color: #334155; }
        .cs-strong { font-weight: 600; color: #0f172a; }
        .cs-muted { font-size: 0.78rem; color: #94a3b8; }
        .cs-nowrap { white-space: nowrap; }
        .cs-list { font-size: 0.8rem; line-height: 1.6; min-width: 220px; }
        .cs-right { text-align: right; white-space: nowrap; }
        .cs-empty { text-align: center; color: #94a3b8; padding: 28px; }
        .cs-chip { display: inline-block; background: #f1f5f9; color: #475569; font-size: 0.72rem; font-weight: 700; padding: 3px 9px; border-radius: 6px; white-space: nowrap; }
        .cs-chip.on { background: #f1eefc; color: #4634ad; border: 1px solid #ded7f6; }
        .cs-btn {
          display: inline-flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e2e8f0; border-radius: 9px;
          padding: 7px 14px; font-size: 0.84rem; font-weight: 600; color: #334155; white-space: nowrap;
        }
        .cs-btn:hover:not(:disabled) { background: #f8fafc; }
        .cs-btn:disabled { opacity: 0.6; }
        .cs-btn.primary { background: #5641ce; border-color: #5641ce; color: #fff; }
        .cs-btn.primary:hover:not(:disabled) { background: #4634ad; }

        .cs-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45); z-index: 1050; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .cs-modal { background: #fff; border-radius: 14px; width: 100%; max-width: 640px; max-height: 92vh; display: flex; flex-direction: column; }
        .cs-modal-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 16px 18px; border-bottom: 1px solid #e2e8f0; }
        .cs-modal-title { font-weight: 700; color: #0f172a; font-size: 1rem; }
        .cs-x { background: none; border: none; font-size: 1.5rem; line-height: 1; color: #64748b; }
        .cs-modal-body { padding: 4px 18px 16px; overflow-y: auto; }
        .cs-modal-foot { display: flex; justify-content: flex-end; gap: 8px; padding: 12px 18px; border-top: 1px solid #e2e8f0; }
        .cs-label { display: block; font-size: 0.78rem; font-weight: 700; color: #334155; margin: 14px 0 6px; }
        .cs-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .cs-input { border: 1px solid #e2e8f0; border-radius: 9px; padding: 7px 10px; font-size: 0.86rem; color: #0f172a; background: #fff; min-width: 0; }
        .cs-input:focus { outline: none; border-color: #5641ce; }
        .cs-wide { width: 100%; }
        .cs-note { width: 100%; resize: vertical; }
        .cs-days { display: flex; gap: 6px; flex-wrap: wrap; }
        .cs-days button { border: 1px solid #e2e8f0; background: #fff; border-radius: 9px; padding: 7px 0; width: 56px; font-size: 0.84rem; font-weight: 600; color: #475569; }
        .cs-days button.on { background: #5641ce; border-color: #5641ce; color: #fff; }
        .cs-slots { margin-bottom: 10px; border: 1px solid #e2e8f0; }
        .cs-slots td { padding: 6px 8px; }
        .cs-icon { background: none; border: none; color: #94a3b8; padding: 4px; }
        .cs-icon:hover { color: #b91c1c; }
        .cs-check { display: flex; align-items: center; gap: 8px; font-size: 0.86rem; color: #334155; margin: 14px 0 0; }
        .cs-preview { margin-top: 12px; font-size: 0.8rem; color: #4634ad; background: #f1eefc; border-radius: 9px; padding: 9px 12px; }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
