import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { toast } from "sonner";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiUsers, FiCopy } from "react-icons/fi";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import SalesStyles from "@/components/dashboard/sales/SalesStyles";

const EMPTY = {
  code: "",
  title: "",
  description: "",
  type: "percent",
  value: "",
  maxDiscount: "",
  minAmount: "",
  courses: [],
  startsAt: "",
  expiresAt: "",
  maxUses: "",
  perUserLimit: 1,
  firstPurchaseOnly: false,
  platform: "all",
  isPublic: true,
  isActive: true,
};

async function api(url, method = "GET", body) {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || "Something went wrong");
  return data;
}

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const day = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "");
// For <input type="datetime-local">, in the admin's own time zone.
const localInput = (d) => {
  if (!d) return "";
  const x = new Date(d);
  return new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

function status(c) {
  const t = Date.now();
  if (!c.isActive) return ["Off", "inactive"];
  if (c.expiresAt && new Date(c.expiresAt) < t) return ["Expired", "inactive"];
  if (c.maxUses > 0 && c.usedCount >= c.maxUses) return ["Used up", "inactive"];
  if (c.startsAt && new Date(c.startsAt) > t) return ["Scheduled", "scheduled"];
  return ["Live", "active"];
}

function discountText(c) {
  return c.type === "percent" ? `${c.value}% off${c.maxDiscount > 0 ? ` (max ${inr(c.maxDiscount)})` : ""}` : `${inr(c.value)} off`;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(null);
  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [courseQ, setCourseQ] = useState("");
  const [usesOf, setUsesOf] = useState(null); // { coupon, uses }

  const load = () =>
    api("/api/admin/coupons")
      .then((d) => {
        setCoupons(d.coupons);
        setCourses(d.courses);
      })
      .catch((e) => toast.error(e.message));

  useEffect(() => {
    load();
  }, []);

  const courseTitle = useMemo(() => Object.fromEntries(courses.map((c) => [c._id, c.title])), [courses]);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (coupons || []).filter((c) => {
      if (s && !`${c.code} ${c.title}`.toLowerCase().includes(s)) return false;
      if (filter === "live") return status(c)[0] === "Live";
      if (filter === "off") return status(c)[0] !== "Live";
      return true;
    });
  }, [coupons, q, filter]);

  const stats = useMemo(() => {
    const list = coupons || [];
    return {
      total: list.length,
      live: list.filter((c) => status(c)[0] === "Live").length,
      uses: list.reduce((s, c) => s + (c.usedCount || 0), 0),
      saved: list.reduce((s, c) => s + (c.saved || 0), 0),
    };
  }, [coupons]);

  const openForm = (c) => {
    setCourseQ("");
    setForm(
      c
        ? {
            ...EMPTY,
            ...c,
            maxDiscount: c.maxDiscount || "",
            minAmount: c.minAmount || "",
            maxUses: c.maxUses || "",
            startsAt: localInput(c.startsAt),
            expiresAt: localInput(c.expiresAt),
          }
        : { ...EMPTY }
    );
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const body = {
      ...form,
      startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : null,
      expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
    };
    delete body._id;
    try {
      if (form._id) await api(`/api/admin/coupons/${form._id}`, "PUT", body);
      else await api("/api/admin/coupons", "POST", body);
      toast.success(form._id ? "Coupon saved" : "Coupon created");
      setForm(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (c) => {
    try {
      await api(`/api/admin/coupons/${c._id}`, "PUT", { isActive: !c.isActive });
      setCoupons((list) => list.map((x) => (x._id === c._id ? { ...x, isActive: !c.isActive } : x)));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (c) => {
    if (!confirm(`Delete coupon ${c.code}?`)) return;
    try {
      const d = await api(`/api/admin/coupons/${c._id}`, "DELETE");
      toast.success(d.deactivated ? d.message : "Coupon deleted");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const showUses = async (c) => {
    try {
      const d = await api(`/api/admin/coupons/${c._id}`);
      setUsesOf({ coupon: c, uses: d.uses });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const copy = (code) => {
    navigator.clipboard?.writeText(code);
    toast.success(`${code} copied`);
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const pickedCourses = form ? courses.filter((c) => form.courses.includes(c._id)) : [];
  const courseMatches = form
    ? courses.filter((c) => !form.courses.includes(c._id) && (!courseQ || c.title.toLowerCase().includes(courseQ.toLowerCase()))).slice(0, 8)
    : [];

  return (
    <div>
      <Head>
        <title>Coupons — SS Coaching</title>
      </Head>
      <SalesStyles />
      <style jsx global>{`
        .cp-code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: 0.04em;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 6px;
          padding: 2px 8px;
        }
        .cp-copy {
          background: none;
          border: none;
          color: #94a3b8;
          padding: 0 4px;
        }
        .sl-pill.scheduled {
          background: #fef3c7;
          color: #b45309;
        }
        .cp-seg {
          display: flex;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }
        .cp-seg button {
          flex: 1;
          background: #fff;
          border: none;
          padding: 9px 10px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #475569;
        }
        .cp-seg button + button {
          border-left: 1px solid #e2e8f0;
        }
        .cp-seg button.on {
          background: #5641ce;
          color: #fff;
        }
        .cp-section {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #94a3b8;
          margin: 18px 0 8px;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }
        .cp-row {
          display: flex;
          gap: 10px;
        }
        .cp-row > div {
          flex: 1;
          min-width: 0;
        }
        .cp-check {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 8px 0;
        }
        .cp-check-text {
          font-size: 0.86rem;
          color: #334155;
        }
        .cp-check-text small {
          display: block;
          color: #94a3b8;
          font-size: 0.75rem;
        }
        .cp-picker {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          margin-top: 6px;
          max-height: 220px;
          overflow-y: auto;
        }
        .cp-picker button {
          display: flex;
          justify-content: space-between;
          width: 100%;
          background: #fff;
          border: none;
          border-bottom: 1px solid #f1f5f9;
          padding: 8px 12px;
          font-size: 0.84rem;
          text-align: left;
        }
        .cp-picker button:hover {
          background: #f8fafc;
        }
        .cp-picked {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f1eefc;
          color: #5641ce;
          border-radius: 999px;
          padding: 3px 6px 3px 12px;
          font-size: 0.78rem;
          font-weight: 600;
          margin: 0 6px 6px 0;
        }
        .cp-picked button {
          background: none;
          border: none;
          color: #5641ce;
          font-weight: 700;
          padding: 0 4px;
        }
        @media (max-width: 576px) {
          .cp-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 sl-bg" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">
            <div className="sl-head">
              <div>
                <h4 className="sl-title">Coupons</h4>
                <p className="sl-sub">Discount codes students can apply at checkout, on the website and in the Android app.</p>
              </div>
              <button className="sl-btn" onClick={() => openForm(null)}>
                <FiPlus size={16} /> New coupon
              </button>
            </div>

            <div className="sl-stats">
              {[
                { label: "Coupons", value: stats.total, note: "All codes" },
                { label: "Live", value: stats.live, note: "Can be used now", brand: true },
                { label: "Times used", value: stats.uses, note: "Paid orders with a coupon" },
                { label: "Discount given", value: inr(stats.saved), note: "Total saved by students" },
              ].map((s) => (
                <div key={s.label} className="sl-stat">
                  <div className="sl-stat-label">{s.label}</div>
                  <div className={`sl-stat-value ${s.brand ? "brand" : ""}`}>{coupons ? s.value : "—"}</div>
                  <div className="sl-stat-note">{s.note}</div>
                </div>
              ))}
            </div>

            <div className="sl-card">
              <div className="sl-toolbar">
                <div className="sl-search">
                  <span className="sl-search-icon">
                    <FiSearch size={15} />
                  </span>
                  <input placeholder="Search by code or title" value={q} onChange={(e) => setQ(e.target.value)} />
                </div>
                {[
                  ["all", "All"],
                  ["live", "Live"],
                  ["off", "Not live"],
                ].map(([k, label]) => (
                  <button key={k} className={`sl-chip ${filter === k ? "active" : ""}`} onClick={() => setFilter(k)}>
                    {label}
                  </button>
                ))}
              </div>

              <div className="sl-table-wrap">
                <table className="sl-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Discount</th>
                      <th>Applies to</th>
                      <th>Rules</th>
                      <th>Validity</th>
                      <th className="num">Used</th>
                      <th>Status</th>
                      <th className="num">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!coupons && (
                      <tr>
                        <td colSpan={8} className="sl-empty">Loading…</td>
                      </tr>
                    )}
                    {coupons && !shown.length && (
                      <tr>
                        <td colSpan={8} className="sl-empty">{coupons.length ? "No coupons match." : "No coupons yet. Create one to offer a discount."}</td>
                      </tr>
                    )}
                    {shown.map((c) => {
                      const [label, cls] = status(c);
                      const rules = [
                        c.minAmount > 0 && `Min ${inr(c.minAmount)}`,
                        c.perUserLimit > 0 ? `${c.perUserLimit}× per student` : "Unlimited per student",
                        c.firstPurchaseOnly && "First purchase",
                        c.platform !== "all" && (c.platform === "app" ? "App only" : "Website only"),
                        !c.isPublic && "Hidden",
                      ].filter(Boolean);
                      return (
                        <tr key={c._id}>
                          <td>
                            <span className="cp-code">{c.code}</span>
                            <button className="cp-copy" title="Copy code" onClick={() => copy(c.code)}>
                              <FiCopy size={13} />
                            </button>
                            {c.title && <div className="sl-faint" style={{ fontSize: "0.76rem", marginTop: 4 }}>{c.title}</div>}
                          </td>
                          <td className="sl-strong">{discountText(c)}</td>
                          <td style={{ whiteSpace: "normal", maxWidth: 220 }}>
                            {c.courses.length ? (
                              c.courses.length === 1 ? (
                                courseTitle[c.courses[0]] || "1 course"
                              ) : (
                                <span title={c.courses.map((id) => courseTitle[id]).filter(Boolean).join("\n")}>{c.courses.length} courses</span>
                              )
                            ) : (
                              <span className="sl-faint">All courses</span>
                            )}
                          </td>
                          <td style={{ whiteSpace: "normal", maxWidth: 240 }}>
                            {rules.map((r) => (
                              <span key={r} className="sl-tag">{r}</span>
                            ))}
                          </td>
                          <td style={{ fontSize: "0.8rem" }}>
                            {c.startsAt || c.expiresAt ? (
                              <>
                                {c.startsAt && <div>From {day(c.startsAt)}</div>}
                                {c.expiresAt && <div>Till {day(c.expiresAt)}</div>}
                              </>
                            ) : (
                              <span className="sl-faint">No end date</span>
                            )}
                          </td>
                          <td className="num">
                            {c.usedCount}
                            {c.maxUses > 0 && <span className="sl-faint"> / {c.maxUses}</span>}
                          </td>
                          <td>
                            <span className={`sl-pill ${cls}`}>{label}</span>
                          </td>
                          <td className="num">
                            <div className="d-inline-flex gap-1 align-items-center">
                              <button className={`sl-switch ${c.isActive ? "on" : ""}`} title={c.isActive ? "Switch off" : "Switch on"} onClick={() => toggle(c)} />
                              <button className="sl-icon-btn sm" title="Who used it" onClick={() => showUses(c)}>
                                <FiUsers size={14} />
                              </button>
                              <button className="sl-icon-btn sm brand" title="Edit" onClick={() => openForm(c)}>
                                <FiEdit2 size={14} />
                              </button>
                              <button className="sl-icon-btn sm danger" title="Delete" onClick={() => remove(c)}>
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="sl-hint" style={{ marginTop: 12 }}>
                Coupons are not offered on iPhone, where courses are bought through Apple at fixed prices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {form && (
        <div className="sl-modal-backdrop" onClick={() => !saving && setForm(null)}>
          <form className="sl-modal" style={{ maxWidth: 620 }} onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <div className="sl-modal-head">
              <h5 style={{ margin: 0, fontWeight: 700 }}>{form._id ? `Edit ${form.code}` : "New coupon"}</h5>
            </div>
            <div className="sl-modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              <div className="cp-row">
                <div>
                  <label className="sl-label">Code</label>
                  <input
                    className="sl-input"
                    style={{ textTransform: "uppercase", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}
                    maxLength={20}
                    placeholder="DIWALI20"
                    value={form.code}
                    onChange={(e) => set("code", e.target.value.toUpperCase().replace(/\s/g, ""))}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="sl-label">Title (shown to students)</label>
                  <input className="sl-input" maxLength={80} placeholder="Diwali offer" value={form.title} onChange={(e) => set("title", e.target.value)} />
                </div>
              </div>
              <label className="sl-label" style={{ marginTop: 12 }}>Description (optional)</label>
              <input className="sl-input" maxLength={300} value={form.description} onChange={(e) => set("description", e.target.value)} />

              <div className="cp-section">Discount</div>
              <div className="cp-row">
                <div>
                  <label className="sl-label">Type</label>
                  <div className="cp-seg">
                    <button type="button" className={form.type === "percent" ? "on" : ""} onClick={() => set("type", "percent")}>
                      Percentage
                    </button>
                    <button type="button" className={form.type === "flat" ? "on" : ""} onClick={() => set("type", "flat")}>
                      Flat amount
                    </button>
                  </div>
                </div>
                <div>
                  <label className="sl-label">{form.type === "percent" ? "Discount (%)" : "Discount (₹)"}</label>
                  <input type="number" min={1} max={form.type === "percent" ? 100 : undefined} className="sl-input" value={form.value} onChange={(e) => set("value", e.target.value)} />
                </div>
                {form.type === "percent" && (
                  <div>
                    <label className="sl-label">Max discount (₹)</label>
                    <input type="number" min={0} className="sl-input" placeholder="No cap" value={form.maxDiscount} onChange={(e) => set("maxDiscount", e.target.value)} />
                  </div>
                )}
              </div>

              <div className="cp-section">Applies to</div>
              <div className="cp-seg" style={{ marginBottom: 8 }}>
                <button type="button" className={!form.courses.length && !form.pickCourses ? "on" : ""} onClick={() => setForm({ ...form, courses: [], pickCourses: false })}>
                  All courses
                </button>
                <button type="button" className={form.courses.length || form.pickCourses ? "on" : ""} onClick={() => set("pickCourses", true)}>
                  Selected courses
                </button>
              </div>
              {(form.courses.length > 0 || form.pickCourses) && (
                <>
                  <div>
                    {pickedCourses.map((c) => (
                      <span key={c._id} className="cp-picked">
                        {c.title}
                        <button type="button" title="Remove" onClick={() => set("courses", form.courses.filter((id) => id !== c._id))}>
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input className="sl-input" placeholder="Search a course to add" value={courseQ} onChange={(e) => setCourseQ(e.target.value)} />
                  {courseMatches.length > 0 && (
                    <div className="cp-picker">
                      {courseMatches.map((c) => (
                        <button type="button" key={c._id} onClick={() => set("courses", [...form.courses, c._id])}>
                          <span>
                            {c.title}
                            {c.status !== "published" && <span className="sl-faint"> · {c.status}</span>}
                          </span>
                          <span className="sl-faint">{inr(c.price)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {!form.courses.length && <p className="sl-hint">Pick at least one course, or choose All courses.</p>}
                </>
              )}
              <label className="sl-label" style={{ marginTop: 12 }}>Minimum order (₹)</label>
              <input type="number" min={0} className="sl-input" placeholder="No minimum" value={form.minAmount} onChange={(e) => set("minAmount", e.target.value)} />
              <p className="sl-hint">Counted on the courses this coupon applies to.</p>

              <div className="cp-section">Validity and limits</div>
              <div className="cp-row">
                <div>
                  <label className="sl-label">Starts</label>
                  <input type="datetime-local" className="sl-input" value={form.startsAt} onChange={(e) => set("startsAt", e.target.value)} />
                </div>
                <div>
                  <label className="sl-label">Ends</label>
                  <input type="datetime-local" className="sl-input" value={form.expiresAt} onChange={(e) => set("expiresAt", e.target.value)} />
                </div>
              </div>
              <p className="sl-hint">Leave empty to start now and never end.</p>
              <div className="cp-row">
                <div>
                  <label className="sl-label">Total uses</label>
                  <input type="number" min={0} className="sl-input" placeholder="Unlimited" value={form.maxUses} onChange={(e) => set("maxUses", e.target.value)} />
                </div>
                <div>
                  <label className="sl-label">Uses per student</label>
                  <input type="number" min={0} className="sl-input" value={form.perUserLimit} onChange={(e) => set("perUserLimit", e.target.value)} />
                  <p className="sl-hint">0 = unlimited</p>
                </div>
              </div>
              <label className="sl-label">Where it works</label>
              <select className="sl-input" value={form.platform} onChange={(e) => set("platform", e.target.value)}>
                <option value="all">Website and Android app</option>
                <option value="web">Website only</option>
                <option value="app">Android app only</option>
              </select>

              <div className="cp-section">Options</div>
              {[
                ["firstPurchaseOnly", "First purchase only", "Only for students who have never bought a course"],
                ["isPublic", "Show on checkout", "Off: students must type the code to use it"],
                ["isActive", "Active", "Off: the coupon cannot be used"],
              ].map(([k, label, hint]) => (
                <div key={k} className="cp-check">
                  <div className="cp-check-text">
                    {label}
                    <small>{hint}</small>
                  </div>
                  <button type="button" className={`sl-switch ${form[k] ? "on" : ""}`} onClick={() => set(k, !form[k])} />
                </div>
              ))}
            </div>
            <div className="sl-modal-foot">
              <button type="button" className="sl-btn-ghost" disabled={saving} onClick={() => setForm(null)}>
                Cancel
              </button>
              <button type="submit" className="sl-btn" disabled={saving || (form.pickCourses && !form.courses.length)}>
                {saving ? "Saving…" : form._id ? "Save" : "Create coupon"}
              </button>
            </div>
          </form>
        </div>
      )}

      {usesOf && (
        <div className="sl-modal-backdrop" onClick={() => setUsesOf(null)}>
          <div className="sl-modal" style={{ maxWidth: 680 }} onClick={(e) => e.stopPropagation()}>
            <div className="sl-modal-head">
              <h5 style={{ margin: 0, fontWeight: 700 }}>
                {usesOf.coupon.code} <span className="sl-faint" style={{ fontSize: "0.85rem", fontWeight: 500 }}>· used {usesOf.uses.length} times</span>
              </h5>
            </div>
            <div className="sl-modal-body" style={{ maxHeight: "65vh", overflowY: "auto" }}>
              {!usesOf.uses.length ? (
                <p className="sl-empty">Nobody has used this coupon yet.</p>
              ) : (
                <div className="sl-table-wrap">
                  <table className="sl-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Phone</th>
                        <th className="num">Saved</th>
                        <th>From</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usesOf.uses.map((u) => (
                        <tr key={u._id}>
                          <td className="sl-strong">{u.name || "—"}</td>
                          <td>{u.phone || u.email || "—"}</td>
                          <td className="num">{inr(u.discount)}</td>
                          <td>{u.source === "app" ? "App" : "Website"}</td>
                          <td>{day(u.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="sl-modal-foot">
              <button className="sl-btn-ghost" onClick={() => setUsesOf(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }), { superAdminOnly: true });
