import { useState, useEffect, useMemo } from "react";
import { MdRefresh, MdFileDownload, MdClose } from "react-icons/md";

// "1h 05m", "12m 30s", "45s"
function fmtDur(sec) {
  const s = Math.round(Number(sec) || 0);
  if (s <= 0) return "0m";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h) return `${h}h ${String(m).padStart(2, "0")}m`;
  if (m) return `${m}m ${String(s % 60).padStart(2, "0")}s`;
  return `${s}s`;
}
// Decimal hours for the CSV, easier to add up in Excel.
const hrs = (sec) => (Math.round(((Number(sec) || 0) / 3600) * 100) / 100).toFixed(2);
const times = (x) => (x == null ? "—" : `${x}x`);
const sourceLabel = (s) => (s === "app" ? "App" : "Website");

function istDay(offsetDays = 0) {
  return new Date(Date.now() + 330 * 60 * 1000 - offsetDays * 86400000).toISOString().slice(0, 10);
}
function fmtDay(day) {
  if (!day) return "—";
  return new Date(day + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtDateTime(d) {
  return d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
}

const RANGES = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "month", label: "This month" },
  { key: "all", label: "All time" },
  { key: "custom", label: "Custom" },
];

function rangeDates(key, custom) {
  switch (key) {
    case "today": return { from: istDay(), to: istDay() };
    case "yesterday": return { from: istDay(1), to: istDay(1) };
    case "7d": return { from: istDay(6), to: istDay() };
    case "30d": return { from: istDay(29), to: istDay() };
    case "month": return { from: istDay().slice(0, 8) + "01", to: istDay() };
    case "custom": return custom;
    default: return { from: "", to: "" };
  }
}

function downloadCsv(name, header, rows) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

const TABS = [
  { key: "students", label: "Students" },
  { key: "courses", label: "Courses" },
  { key: "videos", label: "Videos" },
  { key: "repeated", label: "Repeated videos" },
  { key: "devices", label: "Devices" },
  { key: "days", label: "Day-wise" },
];
const SEARCHABLE = {
  students: "Search name, phone, email, class, course",
  videos: "Search video, chapter, course",
  repeated: "Search student, video, course",
  devices: "Search student, device, browser",
};

const matches = (term, values) => !term || values.some((v) => String(v || "").toLowerCase().includes(term));

export default function VideoWatchTimeSection() {
  const [range, setRange] = useState("30d");
  const [custom, setCustom] = useState({ from: istDay(6), to: istDay() });
  const [courseId, setCourseId] = useState("");
  const [tab, setTab] = useState("students");
  const [q, setQ] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState(null); // { row, data, loading }

  const dates = rangeDates(range, custom);
  const params = () => {
    const p = new URLSearchParams();
    if (dates.from) p.set("from", dates.from);
    if (dates.to) p.set("to", dates.to);
    if (courseId) p.set("courseId", courseId);
    return p;
  };

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`/api/admin/watch-time?${params()}`);
      const d = await r.json();
      if (!d.success) throw new Error(d.message || "Could not load watch time");
      setData(d);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [range, custom.from, custom.to, courseId]); // eslint-disable-line react-hooks/exhaustive-deps

  const openStudent = async (row) => {
    setDetail({ row, data: null, loading: true });
    try {
      const p = params();
      p.set("studentId", row.studentId);
      const r = await fetch(`/api/admin/watch-time?${p}`);
      const d = await r.json();
      setDetail({ row, data: d.success ? d : null, loading: false });
    } catch {
      setDetail({ row, data: null, loading: false });
    }
  };

  const term = q.trim().toLowerCase();
  const students = useMemo(
    () => (data?.students || []).filter((s) => matches(term, [s.name, s.phone, s.email, s.className, ...s.courses])),
    [data, term]
  );
  const videos = useMemo(
    () => (data?.videos || []).filter((v) => matches(term, [v.title, v.chapter, v.course])),
    [data, term]
  );
  const repeated = useMemo(
    () => (data?.repeated || []).filter((r) => matches(term, [r.name, r.phone, r.video.title, r.video.course])),
    [data, term]
  );
  const devices = useMemo(
    () => (data?.deviceRows || []).filter((d) => matches(term, [d.name, d.phone, d.device, d.os, d.client])),
    [data, term]
  );

  const sum = data?.summary || { seconds: 0, webSeconds: 0, appSeconds: 0, students: 0, videos: 0, devices: 0, repeated: 0 };
  const rangeLabel = range === "all" ? "all-time" : `${dates.from || ""}_${dates.to || ""}`;

  const exportCsv = () => {
    if (!data) return;
    const file = (name) => `watch-time-${name}-${rangeLabel}.csv`;
    if (tab === "students") {
      downloadCsv(file("students"),
        ["#", "Student", "Phone", "Email", "Class", "Courses", "Total (h:m)", "Total hours", "Website hours", "App hours", "Devices", "Videos", "Repeated videos", "Days", "Last watched"],
        students.map((s, i) => [i + 1, s.name, s.phone, s.email, s.className, s.courses.join("; "), fmtDur(s.seconds), hrs(s.seconds), hrs(s.webSeconds), hrs(s.appSeconds),
          s.devices.map((d) => `${d.device} (${sourceLabel(d.source)})`).join("; "), s.videos, s.repeated, s.days, fmtDateTime(s.last)]));
    } else if (tab === "courses") {
      downloadCsv(file("courses"),
        ["#", "Course", "Total (h:m)", "Total hours", "Website hours", "App hours", "Students", "Videos", "Avg per student"],
        data.courseRows.map((c, i) => [i + 1, c.title, fmtDur(c.seconds), hrs(c.seconds), hrs(c.webSeconds), hrs(c.appSeconds), c.students, c.videos, fmtDur(c.students ? c.seconds / c.students : 0)]));
    } else if (tab === "videos") {
      downloadCsv(file("videos"),
        ["#", "Video", "Chapter", "Course", "Total (h:m)", "Total hours", "Website hours", "App hours", "Students", "Times started"],
        videos.map((v, i) => [i + 1, v.title, v.chapter, v.course, fmtDur(v.seconds), hrs(v.seconds), hrs(v.webSeconds), hrs(v.appSeconds), v.students, v.plays]));
    } else if (tab === "repeated") {
      downloadCsv(file("repeated"),
        ["#", "Student", "Phone", "Video", "Chapter", "Course", "Times started", "Time watched", "Video length", "Watched (times)", "Last watched"],
        repeated.map((r, i) => [i + 1, r.name, r.phone, r.video.title, r.video.chapter, r.video.course, r.plays, fmtDur(r.seconds), r.duration ? fmtDur(r.duration) : "", r.timesWatched ?? "", fmtDateTime(r.last)]));
    } else if (tab === "devices") {
      downloadCsv(file("devices"),
        ["#", "Student", "Phone", "Used on", "Device", "OS", "Browser / App version", "Watch time", "First used", "Last used"],
        devices.map((d, i) => [i + 1, d.name, d.phone, sourceLabel(d.source), d.device, d.os, d.client, fmtDur(d.seconds), fmtDateTime(d.first), fmtDateTime(d.last)]));
    } else {
      downloadCsv(file("days"),
        ["Date", "Total (h:m)", "Total hours", "Website hours", "App hours", "Students", "Videos"],
        data.days.map((d) => [d.date, fmtDur(d.seconds), hrs(d.seconds), hrs(d.webSeconds), hrs(d.appSeconds), d.students, d.videos]));
    }
  };

  const empty = (cols) => <tr><td colSpan={cols} className="an-empty">No watch time in this period</td></tr>;

  return (
    <div className="an-chart-card vw-card">
      <div className="vw-head">
        <div>
          <div className="an-chart-title">Video Watch Time</div>
          <div className="vw-sub">Exact time students spent playing course videos, on the website and the app.</div>
        </div>
        <div className="vw-actions">
          <button className="vw-btn" onClick={load} disabled={loading}><MdRefresh size={16} /> Refresh</button>
          <button className="vw-btn" onClick={exportCsv} disabled={!data}><MdFileDownload size={16} /> Export CSV</button>
        </div>
      </div>

      <div className="vw-filters">
        <select className="vw-input" value={range} onChange={(e) => setRange(e.target.value)}>
          {RANGES.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
        </select>
        {range === "custom" && (
          <>
            <input type="date" className="vw-input" value={custom.from} max={custom.to} onChange={(e) => setCustom({ ...custom, from: e.target.value })} />
            <input type="date" className="vw-input" value={custom.to} min={custom.from} onChange={(e) => setCustom({ ...custom, to: e.target.value })} />
          </>
        )}
        <select className="vw-input vw-course" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          <option value="">All courses</option>
          {(data?.courses || []).map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
        </select>
        {SEARCHABLE[tab] && (
          <input className="vw-input vw-search" placeholder={SEARCHABLE[tab]} value={q} onChange={(e) => setQ(e.target.value)} />
        )}
      </div>

      <div className="an-table-wrap vw-gap">
        <table className="an-table">
          <thead>
            <tr>
              <th>Total watch time</th>
              <th>Website</th>
              <th>App</th>
              <th>Students watched</th>
              <th>Avg per student</th>
              <th>Videos watched</th>
              <th>Repeated videos</th>
              <th>Devices</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="vw-strong vw-nowrap">{fmtDur(sum.seconds)}</td>
              <td className="vw-nowrap">{fmtDur(sum.webSeconds)}</td>
              <td className="vw-nowrap">{fmtDur(sum.appSeconds)}</td>
              <td>{sum.students}</td>
              <td className="vw-nowrap">{fmtDur(sum.students ? sum.seconds / sum.students : 0)}</td>
              <td>{sum.videos}</td>
              <td>{sum.repeated}</td>
              <td>{sum.devices}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="vw-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={tab === t.key ? "on" : ""} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {error && <div className="vw-error">{error}</div>}

      <div className="an-table-wrap vw-scroll">
        {loading && !data ? (
          <p className="an-empty">Loading…</p>
        ) : tab === "students" ? (
          <table className="an-table">
            <thead>
              <tr><th>#</th><th>Student</th><th>Class</th><th>Courses</th><th>Total</th><th>Website</th><th>App</th><th>Devices</th><th>Videos</th><th>Repeated</th><th>Days</th><th>Last watched</th><th></th></tr>
            </thead>
            <tbody>
              {students.length === 0 && empty(13)}
              {students.map((s, i) => (
                <tr key={s.studentId}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="an-stu-name">{s.name}</div>
                    <div className="an-stu-email">{[s.phone, s.email].filter(Boolean).join(" · ")}</div>
                  </td>
                  <td>{s.className || "—"}</td>
                  <td className="vw-list">{s.courses.length ? s.courses.map((c) => <div key={c}>{c}</div>) : "—"}</td>
                  <td className="vw-strong vw-nowrap">{fmtDur(s.seconds)}</td>
                  <td className="vw-nowrap">{fmtDur(s.webSeconds)}</td>
                  <td className="vw-nowrap">{fmtDur(s.appSeconds)}</td>
                  <td className="vw-list">
                    {s.devices.length ? s.devices.map((d, j) => <div key={j}>{d.device} <span className="vw-muted">({sourceLabel(d.source)})</span></div>) : "—"}
                  </td>
                  <td>{s.videos}</td>
                  <td>{s.repeated}</td>
                  <td>{s.days}</td>
                  <td className="an-date-cell">{fmtDateTime(s.last)}</td>
                  <td><button className="vw-link" onClick={() => openStudent(s)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : tab === "courses" ? (
          <table className="an-table">
            <thead>
              <tr><th>#</th><th>Course</th><th>Total</th><th>Website</th><th>App</th><th>Students</th><th>Videos</th><th>Avg per student</th></tr>
            </thead>
            <tbody>
              {(data?.courseRows || []).length === 0 && empty(8)}
              {(data?.courseRows || []).map((c, i) => (
                <tr key={String(c.courseId)}>
                  <td>{i + 1}</td>
                  <td className="an-stu-name">{c.title}</td>
                  <td className="vw-strong vw-nowrap">{fmtDur(c.seconds)}</td>
                  <td className="vw-nowrap">{fmtDur(c.webSeconds)}</td>
                  <td className="vw-nowrap">{fmtDur(c.appSeconds)}</td>
                  <td>{c.students}</td>
                  <td>{c.videos}</td>
                  <td className="vw-nowrap">{fmtDur(c.students ? c.seconds / c.students : 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : tab === "videos" ? (
          <table className="an-table">
            <thead>
              <tr><th>#</th><th>Video</th><th>Course</th><th>Total</th><th>Website</th><th>App</th><th>Students</th><th>Times started</th></tr>
            </thead>
            <tbody>
              {videos.length === 0 && empty(8)}
              {videos.map((v, i) => (
                <tr key={v.videoId}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="an-stu-name">{v.title}</div>
                    <div className="an-stu-email">{v.chapter}</div>
                  </td>
                  <td>{v.course}</td>
                  <td className="vw-strong vw-nowrap">{fmtDur(v.seconds)}</td>
                  <td className="vw-nowrap">{fmtDur(v.webSeconds)}</td>
                  <td className="vw-nowrap">{fmtDur(v.appSeconds)}</td>
                  <td>{v.students}</td>
                  <td>{v.plays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : tab === "repeated" ? (
          <table className="an-table">
            <thead>
              <tr><th>#</th><th>Student</th><th>Video</th><th>Course</th><th>Times started</th><th>Time watched</th><th>Video length</th><th>Watched</th><th>Last watched</th></tr>
            </thead>
            <tbody>
              {repeated.length === 0 && <tr><td colSpan={9} className="an-empty">No repeated videos in this period</td></tr>}
              {repeated.map((r, i) => (
                <tr key={`${r.studentId}-${r.videoId}`}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="an-stu-name">{r.name}</div>
                    <div className="an-stu-email">{r.phone}</div>
                  </td>
                  <td>
                    <div className="an-stu-name">{r.video.title}</div>
                    <div className="an-stu-email">{r.video.chapter}</div>
                  </td>
                  <td>{r.video.course}</td>
                  <td>{r.plays}</td>
                  <td className="vw-strong vw-nowrap">{fmtDur(r.seconds)}</td>
                  <td className="vw-nowrap">{r.duration ? fmtDur(r.duration) : "—"}</td>
                  <td className="vw-nowrap">{times(r.timesWatched)}</td>
                  <td className="an-date-cell">{fmtDateTime(r.last)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : tab === "devices" ? (
          <table className="an-table">
            <thead>
              <tr><th>#</th><th>Student</th><th>Used on</th><th>Device</th><th>OS</th><th>Browser / App version</th><th>Watch time</th><th>First used</th><th>Last used</th></tr>
            </thead>
            <tbody>
              {devices.length === 0 && empty(9)}
              {devices.map((d, i) => (
                <tr key={`${d.studentId}-${i}`}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="an-stu-name">{d.name}</div>
                    <div className="an-stu-email">{d.phone}</div>
                  </td>
                  <td>{sourceLabel(d.source)}</td>
                  <td>{d.device}</td>
                  <td className="vw-nowrap">{d.os}</td>
                  <td className="vw-nowrap">{d.client}</td>
                  <td className="vw-strong vw-nowrap">{fmtDur(d.seconds)}</td>
                  <td className="an-date-cell">{fmtDateTime(d.first)}</td>
                  <td className="an-date-cell">{fmtDateTime(d.last)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="an-table">
            <thead>
              <tr><th>Date</th><th>Total</th><th>Website</th><th>App</th><th>Students</th><th>Videos</th></tr>
            </thead>
            <tbody>
              {(data?.days || []).length === 0 && empty(6)}
              {(data?.days || []).map((d) => (
                <tr key={d.date}>
                  <td className="vw-nowrap">{fmtDay(d.date)}</td>
                  <td className="vw-strong vw-nowrap">{fmtDur(d.seconds)}</td>
                  <td className="vw-nowrap">{fmtDur(d.webSeconds)}</td>
                  <td className="vw-nowrap">{fmtDur(d.appSeconds)}</td>
                  <td>{d.students}</td>
                  <td>{d.videos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="vw-note">
        Counted only while a video is actually playing. Skipped parts, pauses and idle time are not counted. A video is repeated when it was started from the beginning twice or more, or watched for 1.5 times its length. YouTube lessons are not tracked. Data starts from the day this report went live.
      </p>

      {detail && (
        <div className="vw-backdrop" onClick={() => setDetail(null)}>
          <div className="vw-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vw-modal-head">
              <div>
                <div className="an-chart-title">{detail.row.name}</div>
                <div className="vw-sub">
                  {[detail.row.phone, detail.row.className].filter(Boolean).join(" · ")}
                  {" · "}Total {fmtDur(detail.row.seconds)} (Website {fmtDur(detail.row.webSeconds)}, App {fmtDur(detail.row.appSeconds)})
                </div>
              </div>
              <button className="vw-close" onClick={() => setDetail(null)} aria-label="Close"><MdClose size={20} /></button>
            </div>
            <div className="vw-modal-body">
              {detail.loading ? (
                <p className="an-empty">Loading…</p>
              ) : !detail.data ? (
                <p className="an-empty">Could not load this student</p>
              ) : (
                <>
                  <div className="vw-section">Courses</div>
                  <div className="an-table-wrap">
                    <table className="an-table">
                      <thead>
                        <tr><th>Course</th><th>Enrollment</th><th>Time watched</th><th>Website</th><th>App</th><th>Videos</th><th>Last watched</th></tr>
                      </thead>
                      <tbody>
                        {detail.data.courses.length === 0 && <tr><td colSpan={7} className="an-empty">No courses</td></tr>}
                        {detail.data.courses.map((c) => (
                          <tr key={c.courseId}>
                            <td className="an-stu-name">{c.title}</td>
                            <td className="vw-nowrap">
                              {c.enrolled ? `${c.type === "paid" ? "Paid" : c.type === "cod" ? "COD" : "Free"} · ${fmtDay(new Date(c.enrolledOn).toISOString().slice(0, 10))}` : "Not active"}
                            </td>
                            <td className="vw-strong vw-nowrap">{fmtDur(c.seconds)}</td>
                            <td className="vw-nowrap">{fmtDur(c.webSeconds)}</td>
                            <td className="vw-nowrap">{fmtDur(c.appSeconds)}</td>
                            <td>{c.videos}</td>
                            <td className="an-date-cell">{fmtDateTime(c.last)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="vw-section">Devices</div>
                  <div className="an-table-wrap">
                    <table className="an-table">
                      <thead>
                        <tr><th>Used on</th><th>Device</th><th>OS</th><th>Browser / App version</th><th>Watch time</th><th>First used</th><th>Last used</th></tr>
                      </thead>
                      <tbody>
                        {detail.data.devices.length === 0 && <tr><td colSpan={7} className="an-empty">No devices in this period</td></tr>}
                        {detail.data.devices.map((d, i) => (
                          <tr key={i}>
                            <td>{sourceLabel(d.source)}</td>
                            <td>{d.device}</td>
                            <td className="vw-nowrap">{d.os}</td>
                            <td className="vw-nowrap">{d.client}</td>
                            <td className="vw-strong vw-nowrap">{fmtDur(d.seconds)}</td>
                            <td className="an-date-cell">{fmtDateTime(d.first)}</td>
                            <td className="an-date-cell">{fmtDateTime(d.last)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="vw-section">Video-wise</div>
                  <div className="an-table-wrap">
                    <table className="an-table">
                      <thead>
                        <tr><th>#</th><th>Video</th><th>Course</th><th>Time watched</th><th>Website</th><th>App</th><th>Times started</th><th>Watched</th><th>Progress</th><th>Last watched</th></tr>
                      </thead>
                      <tbody>
                        {detail.data.videos.length === 0 && <tr><td colSpan={10} className="an-empty">No videos in this period</td></tr>}
                        {detail.data.videos.map((v, i) => (
                          <tr key={v.videoId}>
                            <td>{i + 1}</td>
                            <td>
                              <div className="an-stu-name">{v.title}{v.repeated && <span className="vw-tag">Repeated</span>}</div>
                              <div className="an-stu-email">{v.chapter}</div>
                            </td>
                            <td>{v.course}</td>
                            <td className="vw-strong vw-nowrap">{fmtDur(v.seconds)}</td>
                            <td className="vw-nowrap">{fmtDur(v.webSeconds)}</td>
                            <td className="vw-nowrap">{fmtDur(v.appSeconds)}</td>
                            <td>{v.plays}</td>
                            <td className="vw-nowrap">{times(v.timesWatched)}</td>
                            <td>{v.progress}%</td>
                            <td className="an-date-cell">{fmtDateTime(v.last)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="vw-section">Day-wise</div>
                  <div className="an-table-wrap">
                    <table className="an-table">
                      <thead>
                        <tr><th>Date</th><th>Time watched</th><th>Website</th><th>App</th><th>Videos</th></tr>
                      </thead>
                      <tbody>
                        {detail.data.days.length === 0 && <tr><td colSpan={5} className="an-empty">No days in this period</td></tr>}
                        {detail.data.days.map((d) => (
                          <tr key={d.date}>
                            <td className="vw-nowrap">{fmtDay(d.date)}</td>
                            <td className="vw-strong vw-nowrap">{fmtDur(d.seconds)}</td>
                            <td className="vw-nowrap">{fmtDur(d.webSeconds)}</td>
                            <td className="vw-nowrap">{fmtDur(d.appSeconds)}</td>
                            <td>{d.videos}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .vw-card { margin-top: 14px; }
        .vw-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .vw-sub { font-size: 0.8rem; color: #64748b; margin-top: 3px; }
        .vw-actions { display: flex; gap: 8px; }
        .vw-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          padding: 7px 12px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
        }
        .vw-btn:hover:not(:disabled) { background: #f8fafc; }
        .vw-btn:disabled { opacity: 0.6; }
        .vw-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
        .vw-input {
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          padding: 7px 10px;
          font-size: 0.84rem;
          color: #0f172a;
          background: #fff;
          min-width: 0;
        }
        .vw-input:focus { outline: none; border-color: #5641ce; }
        .vw-course { max-width: 280px; }
        .vw-search { flex: 1; min-width: 200px; }
        .vw-gap { margin-bottom: 14px; }
        .vw-strong { font-weight: 700; color: #0f172a; }
        .vw-nowrap { white-space: nowrap; }
        .vw-muted { color: #94a3b8; font-size: 0.78rem; }
        .vw-list { font-size: 0.8rem; min-width: 150px; line-height: 1.45; }
        .vw-tag {
          display: inline-block;
          margin-left: 6px;
          padding: 1px 8px;
          border-radius: 999px;
          background: #f1eefc;
          color: #5641ce;
          font-size: 0.68rem;
          font-weight: 700;
          vertical-align: middle;
        }
        .vw-tabs { display: flex; gap: 4px; border-bottom: 1px solid #e2e8f0; margin-bottom: 4px; overflow-x: auto; }
        .vw-tabs button {
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 8px 14px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748b;
          white-space: nowrap;
        }
        .vw-tabs button.on { color: #5641ce; border-bottom-color: #5641ce; }
        .vw-scroll { max-height: 560px; overflow-y: auto; }
        .vw-link {
          background: none;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 4px 12px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #5641ce;
        }
        .vw-link:hover { background: #f1eefc; }
        .vw-error { color: #b91c1c; font-size: 0.85rem; padding: 10px 0; }
        .vw-note { font-size: 0.75rem; color: #94a3b8; margin: 12px 0 0; }
        .vw-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .vw-modal {
          background: #fff;
          border-radius: 14px;
          width: 100%;
          max-width: 1080px;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
        }
        .vw-modal-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 18px;
          border-bottom: 1px solid #e2e8f0;
        }
        .vw-close { background: none; border: none; color: #64748b; padding: 2px; }
        .vw-modal-body { padding: 4px 18px 18px; overflow-y: auto; }
        .vw-section {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #94a3b8;
          margin: 16px 0 6px;
        }
        @media (max-width: 576px) {
          .vw-course, .vw-search { max-width: none; width: 100%; }
        }
      `}</style>
    </div>
  );
}
