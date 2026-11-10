import { useState, useEffect, useMemo } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Head from "next/head";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import VideoWatchTimeSection from "@/components/admin/VideoWatchTimeSection";
import { MdRefresh, MdDownload } from "react-icons/md";

// Exact rupees, never rounded to "7.9K" -- the boss reads these as accounts.
function inr(n) {
  return "₹" + Math.round(Number(n) || 0).toLocaleString("en-IN");
}
const num = (n) => (Number(n) || 0).toLocaleString("en-IN");
const pct = (part, whole) => (whole > 0 ? Math.round((part / whole) * 100) + "%" : "—");

function fmtHours(hours) {
  const h = Number(hours) || 0;
  if (h <= 0) return "0 h";
  if (h < 1) return Math.round(h * 60) + " min";
  return (Math.round(h * 10) / 10).toLocaleString("en-IN") + " h";
}

function fmtDate(d) {
  return d
    ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })
    : "—";
}
function fmtTime(d) {
  return d ? new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }) : "";
}

const KIND = {
  real:  { label: "Paid (Razorpay)", counted: true },
  test:  { label: "₹1 test payment", counted: false },
  apple: { label: "Apple in-app (iPhone)", counted: false },
  free:  { label: "Free", counted: false },
};
const KIND_NOTE = {
  real:  "Money received through Razorpay on the website and the Android app.",
  test:  "₹1 payments made by the team to test the payment page. Not real sales.",
  apple: "Bought inside the iPhone app. The iOS app is not live on the App Store yet, so these are TestFlight test purchases (no real money). Once it is live, Apple pays this money out separately after its commission.",
  free:  "Free courses, or a coupon that made the course free.",
};

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

const matches = (term, values) => !term || values.some((v) => String(v || "").toLowerCase().includes(term));

// One titled block. Every table on the page sits in its own Section so no
// two subjects share a card.
function Section({ title, desc, right, children }) {
  return (
    <div className="an-card">
      <div className="an-card-head">
        <div>
          <div className="an-card-title">{title}</div>
          {desc && <div className="an-card-desc">{desc}</div>}
        </div>
        {right && <div className="an-card-right">{right}</div>}
      </div>
      {children}
    </div>
  );
}

function CsvButton({ onClick }) {
  return (
    <button className="an-btn" onClick={onClick}>
      <span className="an-ico"><MdDownload size={16} /></span> Download CSV
    </button>
  );
}

function Student({ name, phone, email }) {
  return (
    <>
      <div className="an-stu-name">{name}</div>
      <div className="an-stu-email">{[phone, email].filter(Boolean).join(" · ")}</div>
    </>
  );
}

function KindChip({ kind }) {
  return <span className={`an-chip ${kind === "real" ? "accent" : ""}`}>{KIND[kind]?.label || kind}</span>;
}

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "revenue", label: "Revenue & Payments" },
  { key: "enrollments", label: "Enrollments" },
  { key: "students", label: "Students" },
  { key: "courses", label: "Courses" },
  { key: "watch", label: "Video Watch Time" },
];

/* ───────────────────────────── Overview ───────────────────────────── */

function OverviewTab({ data }) {
  const o = data.overview;
  const rows = [
    ["Revenue collected", "Real money received through Razorpay. Test payments are not included.", "revenue", inr],
    ["Successful payments", "Number of real course purchases.", "payments", num],
    ["Students who paid", "Different students who bought at least one course.", "payingStudents", num],
    ["Free enrollments", "Students who joined a free course.", "freeEnrollments", num],
    ["New students registered", "Sign-ups on the website and the app. All time = total registered today.", "newStudents", num],
    ["Test entries (not counted)", "₹1 test payments and iPhone TestFlight purchases. Kept out of every figure above.", "testEntries", num],
  ];

  return (
    <>
      <Section
        title="Key numbers"
        desc={`All time, this month (${data.thisMonthLabel}) and last month (${data.lastMonthLabel}).`}
      >
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th>What</th>
                <th className="r">All time</th>
                <th className="r">This month</th>
                <th className="r">Last month</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, help, key, f]) => (
                <tr key={key}>
                  <td>
                    <div className="an-strong">{label}</div>
                    <div className="an-help">{help}</div>
                  </td>
                  <td className="r an-big">{f(o.all[key])}</td>
                  <td className="r an-big">{f(o.thisMonth[key])}</td>
                  <td className="r an-big">{f(o.lastMonth[key])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Platform today" desc="Current totals across the website and the app.">
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th>What</th>
                <th className="r">Number</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="an-strong">Registered students</td>
                <td className="r an-big">{num(data.students.total)}</td>
                <td className="an-help">Accounts that are active. Deleted accounts ({num(data.students.deleted)}) are not counted.</td>
              </tr>
              <tr>
                <td className="an-strong">Students enrolled in a course</td>
                <td className="r an-big">{num(o.enrolledStudents)}</td>
                <td className="an-help">Have at least one course (paid, free or test). {pct(o.enrolledStudents, data.students.total)} of registered students.</td>
              </tr>
              <tr>
                <td className="an-strong">Published courses</td>
                <td className="r an-big">{num(o.publishedCourses)}</td>
                <td className="an-help">Courses visible to students right now.</td>
              </tr>
              <tr>
                <td className="an-strong">Video watch time</td>
                <td className="r an-big">{fmtHours(o.watchHours)}</td>
                <td className="an-help">Total time students spent watching course videos ({num(o.watchVideos)} videos, {num(o.watchStudents)} students).</td>
              </tr>
              <tr>
                <td className="an-strong">Average watch time per student</td>
                <td className="r an-big">{fmtHours(o.avgWatchHours)}</td>
                <td className="an-help">Only students who watched at least one video.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Month-wise summary" desc="One row per month. Revenue and paid enrollments are real payments only.">
        <MonthlySummaryTable monthly={data.monthly} />
      </Section>
    </>
  );
}

function MonthlySummaryTable({ monthly }) {
  const total = monthly.reduce(
    (a, m) => ({
      newStudents: a.newStudents + m.newStudents,
      paidEnrollments: a.paidEnrollments + m.paidEnrollments,
      freeEnrollments: a.freeEnrollments + m.freeEnrollments,
      revenue: a.revenue + m.revenue,
    }),
    { newStudents: 0, paidEnrollments: 0, freeEnrollments: 0, revenue: 0 }
  );
  return (
    <div className="an-table-wrap">
      <table className="an-table">
        <thead>
          <tr>
            <th>Month</th>
            <th className="r">New students</th>
            <th className="r">Paid enrollments</th>
            <th className="r">Free enrollments</th>
            <th className="r">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {monthly.map((m) => (
            <tr key={m.month}>
              <td className="an-strong">{m.label}</td>
              <td className="r">{num(m.newStudents)}</td>
              <td className="r">{num(m.paidEnrollments)}</td>
              <td className="r">{num(m.freeEnrollments)}</td>
              <td className="r an-strong">{inr(m.revenue)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td className="r">{num(total.newStudents)}</td>
            <td className="r">{num(total.paidEnrollments)}</td>
            <td className="r">{num(total.freeEnrollments)}</td>
            <td className="r">{inr(total.revenue)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/* ───────────────────────────── Revenue ───────────────────────────── */

function RevenueTab({ data }) {
  const [show, setShow] = useState("real");
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();

  const payments = useMemo(
    () =>
      data.enrollments.filter(
        (r) =>
          r.kind !== "free" &&
          (show === "all" || (show === "real" ? r.kind === "real" : r.kind !== "real")) &&
          matches(term, [r.studentName, r.studentPhone, r.studentEmail, r.courseTitle, r.invoice, r.coupon])
      ),
    [data.enrollments, show, term]
  );
  const paymentsTotal = payments.reduce((a, r) => a + r.amount, 0);
  const realType = data.paymentTypes.find((t) => t.kind === "real") || { count: 0, amount: 0, students: 0 };

  const totals = data.monthly.reduce(
    (a, m) => ({
      payments: a.payments + m.paidEnrollments,
      web: a.web + m.revenueWeb,
      app: a.app + m.revenueApp,
      revenue: a.revenue + m.revenue,
    }),
    { payments: 0, web: 0, app: 0, revenue: 0 }
  );

  return (
    <>
      <Section
        title="Revenue by payment type"
        desc="Every enrollment falls in one of these four types. Only the first one is real money."
      >
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th>Payment type</th>
                <th className="r">Entries</th>
                <th className="r">Students</th>
                <th className="r">Amount</th>
                <th>Counted in revenue?</th>
              </tr>
            </thead>
            <tbody>
              {data.paymentTypes.map((t) => (
                <tr key={t.kind}>
                  <td>
                    <div className="an-strong">{KIND[t.kind].label}</div>
                    <div className="an-help">{KIND_NOTE[t.kind]}</div>
                  </td>
                  <td className="r">{num(t.count)}</td>
                  <td className="r">{num(t.students)}</td>
                  <td className="r an-strong">{inr(t.amount)}</td>
                  <td>{KIND[t.kind].counted ? <span className="an-chip accent">Yes</span> : <span className="an-chip">No</span>}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Real revenue</td>
                <td className="r">{num(realType.count)}</td>
                <td className="r">{num(realType.students)}</td>
                <td className="r">{inr(realType.amount)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </Section>

      <Section title="Month-wise revenue" desc="Real Razorpay payments only, split by where the student paid.">
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th>Month</th>
                <th className="r">Payments</th>
                <th className="r">Students who paid</th>
                <th className="r">Website</th>
                <th className="r">App</th>
                <th className="r">Total revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.monthly.map((m) => (
                <tr key={m.month}>
                  <td className="an-strong">{m.label}</td>
                  <td className="r">{num(m.paidEnrollments)}</td>
                  <td className="r">{num(m.payingStudents)}</td>
                  <td className="r">{inr(m.revenueWeb)}</td>
                  <td className="r">{inr(m.revenueApp)}</td>
                  <td className="r an-strong">{inr(m.revenue)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="r">{num(totals.payments)}</td>
                <td className="r">{num(realType.students)}</td>
                <td className="r">{inr(totals.web)}</td>
                <td className="r">{inr(totals.app)}</td>
                <td className="r">{inr(totals.revenue)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Section>

      <Section
        title="Payment list"
        desc="Each payment with the student, course and invoice. Newest first."
        right={
          <CsvButton
            onClick={() =>
              downloadCsv(`payments-${show}.csv`,
                ["Date", "Time", "Student", "Phone", "Email", "Course", "Platform", "Amount", "Coupon", "Invoice", "Payment ID", "Type", "Status"],
                payments.map((r) => [fmtDate(r.date), fmtTime(r.date), r.studentName, r.studentPhone, r.studentEmail, r.courseTitle,
                  r.platform, r.amount, r.coupon, r.invoice, r.paymentId, KIND[r.kind].label, r.status]))
            }
          />
        }
      >
        <div className="an-filters">
          <select className="an-input" value={show} onChange={(e) => setShow(e.target.value)}>
            <option value="real">Real payments only</option>
            <option value="test">Test entries only</option>
            <option value="all">All</option>
          </select>
          <input className="an-input an-search" placeholder="Search student, phone, course, invoice" value={q} onChange={(e) => setQ(e.target.value)} />
          <span className="an-count">{num(payments.length)} payments · {inr(paymentsTotal)}</span>
        </div>
        <div className="an-table-wrap an-scroll">
          <table className="an-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Student</th>
                <th>Course</th>
                <th>Platform</th>
                <th className="r">Amount</th>
                <th>Coupon</th>
                <th>Invoice</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 && <tr><td colSpan={9} className="an-empty">No payments</td></tr>}
              {payments.map((r, i) => (
                <tr key={r._id}>
                  <td className="an-muted">{i + 1}</td>
                  <td className="an-nowrap">{fmtDate(r.date)}<div className="an-muted">{fmtTime(r.date)}</div></td>
                  <td><Student name={r.studentName} phone={r.studentPhone} email={r.studentEmail} /></td>
                  <td className="an-course-cell">{r.courseTitle}</td>
                  <td className="an-nowrap">{r.platform}</td>
                  <td className="r an-strong">{inr(r.amount)}</td>
                  <td>{r.coupon || <span className="an-muted">—</span>}</td>
                  <td className="an-nowrap">{r.invoice || <span className="an-muted">—</span>}</td>
                  <td><KindChip kind={r.kind} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

/* ─────────────────────────── Enrollments ─────────────────────────── */

function EnrollmentsTab({ data }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("");
  const term = q.trim().toLowerCase();
  const list = useMemo(
    () =>
      data.enrollments.filter(
        (r) => (!kind || r.kind === kind) && matches(term, [r.studentName, r.studentPhone, r.studentEmail, r.courseTitle, r.platform])
      ),
    [data.enrollments, kind, term]
  );

  const pTotal = data.platforms.reduce(
    (a, p) => ({ paid: a.paid + p.paid, free: a.free + p.free, test: a.test + p.test, total: a.total + p.total, revenue: a.revenue + p.revenue }),
    { paid: 0, free: 0, test: 0, total: 0, revenue: 0 }
  );
  const mTotal = data.monthly.reduce(
    (a, m) => ({ paid: a.paid + m.paidEnrollments, free: a.free + m.freeEnrollments, test: a.test + m.testEnrollments }),
    { paid: 0, free: 0, test: 0 }
  );

  return (
    <>
      <Section title="Enrollments by platform" desc="Where the student joined the course. Test = ₹1 test payments and iPhone TestFlight purchases.">
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th className="r">Paid</th>
                <th className="r">Free</th>
                <th className="r">Test</th>
                <th className="r">Total</th>
                <th className="r">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.platforms.map((p) => (
                <tr key={p.platform}>
                  <td className="an-strong">{p.platform}</td>
                  <td className="r">{num(p.paid)}</td>
                  <td className="r">{num(p.free)}</td>
                  <td className="r">{num(p.test)}</td>
                  <td className="r an-strong">{num(p.total)}</td>
                  <td className="r">{inr(p.revenue)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="r">{num(pTotal.paid)}</td>
                <td className="r">{num(pTotal.free)}</td>
                <td className="r">{num(pTotal.test)}</td>
                <td className="r">{num(pTotal.total)}</td>
                <td className="r">{inr(pTotal.revenue)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Section>

      <Section title="Month-wise enrollments" desc="New course enrollments each month.">
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th>Month</th>
                <th className="r">Paid</th>
                <th className="r">Free</th>
                <th className="r">Test</th>
                <th className="r">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.monthly.map((m) => (
                <tr key={m.month}>
                  <td className="an-strong">{m.label}</td>
                  <td className="r">{num(m.paidEnrollments)}</td>
                  <td className="r">{num(m.freeEnrollments)}</td>
                  <td className="r">{num(m.testEnrollments)}</td>
                  <td className="r an-strong">{num(m.paidEnrollments + m.freeEnrollments + m.testEnrollments)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="r">{num(mTotal.paid)}</td>
                <td className="r">{num(mTotal.free)}</td>
                <td className="r">{num(mTotal.test)}</td>
                <td className="r">{num(mTotal.paid + mTotal.free + mTotal.test)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Section>

      <Section
        title="Enrollment list"
        desc="Every student-course enrollment, newest first."
        right={
          <CsvButton
            onClick={() =>
              downloadCsv("enrollments.csv",
                ["Date", "Student", "Phone", "Email", "Course", "Platform", "Type", "Amount", "Status"],
                list.map((r) => [fmtDate(r.date), r.studentName, r.studentPhone, r.studentEmail, r.courseTitle, r.platform,
                  KIND[r.kind].label, r.amount, r.status]))
            }
          />
        }
      >
        <div className="an-filters">
          <select className="an-input" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="">All types</option>
            {Object.entries(KIND).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <input className="an-input an-search" placeholder="Search student, phone, course" value={q} onChange={(e) => setQ(e.target.value)} />
          <span className="an-count">{num(list.length)} enrollments</span>
        </div>
        <div className="an-table-wrap an-scroll">
          <table className="an-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Student</th>
                <th>Course</th>
                <th>Platform</th>
                <th>Type</th>
                <th className="r">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && <tr><td colSpan={8} className="an-empty">No enrollments</td></tr>}
              {list.map((r, i) => (
                <tr key={r._id}>
                  <td className="an-muted">{i + 1}</td>
                  <td className="an-nowrap">{fmtDate(r.date)}</td>
                  <td><Student name={r.studentName} phone={r.studentPhone} email={r.studentEmail} /></td>
                  <td className="an-course-cell">{r.courseTitle}</td>
                  <td className="an-nowrap">{r.platform}</td>
                  <td><KindChip kind={r.kind} /></td>
                  <td className="r">{r.amount ? inr(r.amount) : <span className="an-muted">—</span>}</td>
                  <td className="an-cap">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

/* ───────────────────────────── Students ───────────────────────────── */

function StudentsTab({ data }) {
  const s = data.students;
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const payers = data.payers.filter((p) => matches(term, [p.name, p.phone, p.email, ...p.courses]));
  const signTotal = data.monthly.reduce(
    (a, m) => ({ web: a.web + m.newStudentsWeb, app: a.app + m.newStudentsApp }),
    { web: 0, app: 0 }
  );

  const summary = [
    ["Registered students", s.total, "Active accounts on the website and the app."],
    ["Signed up on the app", s.app, "Account created from the Android or iPhone app."],
    ["Signed up on the website", s.web, "Account created on sscoaching.in."],
    ["Enrolled in at least one course", s.enrolled, "Paid, free or test enrollment."],
    ["Not enrolled in any course", s.notEnrolled, "Registered but have not joined a course yet."],
    ["Paid for a course", s.paying, "Made at least one real Razorpay payment."],
  ];

  return (
    <>
      <Section title="Student summary" desc={`Deleted accounts (${num(s.deleted)}) are left out of every number.`}>
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th>What</th>
                <th className="r">Students</th>
                <th className="r">% of registered</th>
              </tr>
            </thead>
            <tbody>
              {summary.map(([label, n, help]) => (
                <tr key={label}>
                  <td>
                    <div className="an-strong">{label}</div>
                    <div className="an-help">{help}</div>
                  </td>
                  <td className="r an-big">{num(n)}</td>
                  <td className="r">{pct(n, s.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="New students per month" desc="Sign-ups each month, split by where the account was created.">
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th>Month</th>
                <th className="r">Website</th>
                <th className="r">App</th>
                <th className="r">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.monthly.map((m) => (
                <tr key={m.month}>
                  <td className="an-strong">{m.label}</td>
                  <td className="r">{num(m.newStudentsWeb)}</td>
                  <td className="r">{num(m.newStudentsApp)}</td>
                  <td className="r an-strong">{num(m.newStudents)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="r">{num(signTotal.web)}</td>
                <td className="r">{num(signTotal.app)}</td>
                <td className="r">{num(signTotal.web + signTotal.app)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Section>

      <Section title="Students by class" desc="The class the student picked when signing up.">
        <div className="an-table-wrap">
          <table className="an-table">
            <thead>
              <tr>
                <th>Class</th>
                <th className="r">Students</th>
                <th className="r">Share</th>
              </tr>
            </thead>
            <tbody>
              {s.byClass.map((c) => (
                <tr key={c.className}>
                  <td className="an-strong">{c.className}</td>
                  <td className="r">{num(c.count)}</td>
                  <td className="r">{pct(c.count, s.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="r">{num(s.total)}</td>
                <td className="r">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Section>

      <Section
        title="Paying students"
        desc="Students who paid real money, highest amount first."
        right={
          <CsvButton
            onClick={() =>
              downloadCsv("paying-students.csv",
                ["Student", "Phone", "Email", "Courses bought", "Total paid", "First payment", "Last payment"],
                payers.map((p) => [p.name, p.phone, p.email, p.courses.join(" | "), p.amount, fmtDate(p.first), fmtDate(p.last)]))
            }
          />
        }
      >
        <div className="an-filters">
          <input className="an-input an-search" placeholder="Search student, phone, course" value={q} onChange={(e) => setQ(e.target.value)} />
          <span className="an-count">{num(payers.length)} students</span>
        </div>
        <div className="an-table-wrap an-scroll">
          <table className="an-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Courses bought</th>
                <th className="r">Total paid</th>
                <th>First payment</th>
                <th>Last payment</th>
              </tr>
            </thead>
            <tbody>
              {payers.length === 0 && <tr><td colSpan={6} className="an-empty">No paying students</td></tr>}
              {payers.map((p, i) => (
                <tr key={p.studentId}>
                  <td className="an-muted">{i + 1}</td>
                  <td><Student name={p.name} phone={p.phone} email={p.email} /></td>
                  <td className="an-list">{p.courses.map((c, j) => <div key={j}>{c}</div>)}</td>
                  <td className="r an-strong">{inr(p.amount)}</td>
                  <td className="an-nowrap">{fmtDate(p.first)}</td>
                  <td className="an-nowrap">{fmtDate(p.last)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

/* ───────────────────────────── Courses ───────────────────────────── */

function CoursesTab({ data }) {
  const [q, setQ] = useState("");
  const [onlyActive, setOnlyActive] = useState(false);
  const term = q.trim().toLowerCase();
  const list = data.courses.filter((c) => (!onlyActive || c.enrolled > 0) && matches(term, [c.title, c.subject]));
  const t = list.reduce(
    (a, c) => ({ enrolled: a.enrolled + c.enrolled, paid: a.paid + c.paid, free: a.free + c.free, test: a.test + c.test, revenue: a.revenue + c.revenue }),
    { enrolled: 0, paid: 0, free: 0, test: 0, revenue: 0 }
  );

  return (
    <Section
      title="Course-wise enrollments and revenue"
      desc="Counted from the actual enrollments, highest revenue first. Revenue is real Razorpay payments only."
      right={
        <CsvButton
          onClick={() =>
            downloadCsv("courses.csv",
              ["Course", "Subject", "Price", "Total students", "Paid", "Free", "Test", "Revenue"],
              list.map((c) => [c.title, c.subject, c.price ?? "", c.enrolled, c.paid, c.free, c.test, c.revenue]))
          }
        />
      }
    >
      <div className="an-filters">
        <input className="an-input an-search" placeholder="Search course or subject" value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="an-check">
          <input type="checkbox" checked={onlyActive} onChange={(e) => setOnlyActive(e.target.checked)} /> Only courses with students
        </label>
        <span className="an-count">{num(list.length)} courses</span>
      </div>
      <div className="an-table-wrap an-scroll">
        <table className="an-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course</th>
              <th className="r">Price</th>
              <th className="r">Total students</th>
              <th className="r">Paid</th>
              <th className="r">Free</th>
              <th className="r">Test</th>
              <th className="r">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && <tr><td colSpan={8} className="an-empty">No courses</td></tr>}
            {list.map((c, i) => (
              <tr key={c._id}>
                <td className="an-muted">{i + 1}</td>
                <td>
                  <div className="an-strong">{c.title}</div>
                  <div className="an-help">
                    {[c.subject, !c.published && "Not published"].filter(Boolean).join(" · ")}
                  </div>
                </td>
                <td className="r an-nowrap">{c.price === null ? "—" : c.isFree ? "Free" : inr(c.price)}</td>
                <td className="r an-strong">{num(c.enrolled)}</td>
                <td className="r">{num(c.paid)}</td>
                <td className="r">{num(c.free)}</td>
                <td className="r">{num(c.test)}</td>
                <td className="r an-strong">{inr(c.revenue)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td>Total</td>
              <td />
              <td className="r">{num(t.enrolled)}</td>
              <td className="r">{num(t.paid)}</td>
              <td className="r">{num(t.free)}</td>
              <td className="r">{num(t.test)}</td>
              <td className="r">{inr(t.revenue)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Section>
  );
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("overview");

  const load = () => {
    setLoading(true);
    setError(null);
    fetch("/api/admin/analytics")
      .then(r => r.json())
      .then(d => {
        if (d.success) setData(d);
        else setError("Failed to load analytics");
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    try {
      const saved = localStorage.getItem("an-tab");
      if (saved && TABS.some((t) => t.key === saved)) setTab(saved);
    } catch {}
  }, []);

  const pick = (key) => {
    setTab(key);
    try { localStorage.setItem("an-tab", key); } catch {}
  };

  return (
    <>
      <Head><title>Analytics — Admin Dashboard</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 an-bg" style={{ minWidth: 0 }}>
            <div className="container-fluid p-4">
          <div className="an-page">

            <div className="an-page-header">
              <div>
                <h4 className="an-page-title">Analytics</h4>
                <p className="an-page-sub">
                  All amounts in rupees, exact. Test payments are shown separately and never added to revenue.
                  {data?.generatedAt && <> Updated {fmtDate(data.generatedAt)}, {fmtTime(data.generatedAt)}.</>}
                </p>
              </div>
              <button className="an-btn" onClick={load} disabled={loading}>
                <span className="an-ico"><MdRefresh size={16} /></span>
                {loading ? "Loading…" : "Refresh"}
              </button>
            </div>

            <div className="an-tabs">
              {TABS.map((t) => (
                <button key={t.key} className={tab === t.key ? "on" : ""} onClick={() => pick(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>

            {error && <div className="an-error">{error}</div>}

            {tab === "watch" ? (
              <VideoWatchTimeSection />
            ) : loading && !data ? (
              <div className="an-card an-loading">Loading analytics…</div>
            ) : data && (
              <>
                {tab === "overview" && <OverviewTab data={data} />}
                {tab === "revenue" && <RevenueTab data={data} />}
                {tab === "enrollments" && <EnrollmentsTab data={data} />}
                {tab === "students" && <StudentsTab data={data} />}
                {tab === "courses" && <CoursesTab data={data} />}
              </>
            )}
          </div>
          </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .an-bg { background: #f1f5f9; }
        .an-page { max-width: 1200px; }

        /* react-icons renders its own svg, which styled-jsx will not scope,
           so every icon that needs sizing sits inside a span. */
        .an-ico { display: inline-flex; align-items: center; }

        /* Header */
        .an-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .an-page-title { font-weight: 700; color: #0f172a; margin: 0; }
        .an-page-sub { font-size: 0.86rem; color: #64748b; margin: 4px 0 0; max-width: 720px; }
        .an-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
          white-space: nowrap;
        }
        .an-btn:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; }
        .an-btn:disabled { opacity: 0.6; }

        /* Page tabs */
        .an-tabs {
          display: flex;
          gap: 4px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 5px;
          margin-bottom: 14px;
          overflow-x: auto;
        }
        .an-tabs button {
          background: none;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #475569;
          white-space: nowrap;
        }
        .an-tabs button:hover { background: #f8fafc; }
        .an-tabs button.on { background: #5641ce; color: #fff; }

        .an-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.85rem;
          margin-bottom: 14px;
        }

        /* Section card. an-chart-card is kept because VideoWatchTimeSection
           uses it for its own card. */
        .an-card, .an-chart-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 18px;
          margin-bottom: 14px;
        }
        .an-loading { color: #94a3b8; font-size: 0.9rem; text-align: center; padding: 40px; }
        .an-card-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .an-card-title, .an-chart-title { font-size: 1rem; font-weight: 700; color: #0f172a; }
        .an-card-desc { font-size: 0.8rem; color: #64748b; margin-top: 3px; max-width: 760px; }

        .an-filters { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 12px; }
        .an-input {
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          padding: 7px 10px;
          font-size: 0.84rem;
          color: #0f172a;
          background: #fff;
          min-width: 0;
        }
        .an-input:focus { outline: none; border-color: #5641ce; }
        .an-search { flex: 1; min-width: 200px; max-width: 360px; }
        .an-count { font-size: 0.8rem; color: #64748b; font-weight: 600; margin-left: auto; }
        .an-check { display: inline-flex; align-items: center; gap: 6px; font-size: 0.84rem; color: #334155; margin: 0; }

        /* Tables */
        .an-table-wrap { overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 10px; }
        .an-scroll { max-height: 620px; overflow-y: auto; }
        .an-table { width: 100%; border-collapse: collapse; font-size: 0.86rem; }
        .an-table th {
          text-align: left;
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 10px 12px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
          position: sticky;
          top: 0;
          z-index: 1;
        }
        .an-table td {
          padding: 11px 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #334155;
        }
        .an-table tbody tr:hover { background: #fafafe; }
        .an-table tfoot td {
          font-weight: 700;
          color: #0f172a;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: none;
        }
        .an-table .r { text-align: right; white-space: nowrap; }
        .an-strong { font-weight: 600; color: #0f172a; }
        .an-big { font-size: 1rem; font-weight: 700; color: #0f172a; }
        .an-help { font-size: 0.76rem; color: #94a3b8; margin-top: 2px; line-height: 1.4; }
        .an-muted { color: #94a3b8; font-size: 0.78rem; }
        .an-nowrap { white-space: nowrap; }
        .an-cap { text-transform: capitalize; }
        .an-list { font-size: 0.8rem; line-height: 1.5; min-width: 180px; }
        .an-stu-name { font-weight: 600; color: #0f172a; }
        .an-stu-email { font-size: 0.74rem; color: #94a3b8; margin-top: 2px; }
        .an-course-cell { min-width: 160px; max-width: 260px; color: #475569; }
        .an-date-cell { color: #94a3b8; font-size: 0.78rem; white-space: nowrap; }
        .an-empty { color: #94a3b8; font-size: 0.85rem; text-align: center; padding: 28px; }
        .an-chip {
          display: inline-block;
          background: #f1f5f9;
          color: #475569;
          font-size: 0.72rem;
          padding: 3px 9px;
          border-radius: 6px;
          font-weight: 700;
          white-space: nowrap;
        }
        .an-chip.accent { background: #f1eefc; color: #4634ad; border: 1px solid #ded7f6; }

        @media (max-width: 600px) {
          .an-count { margin-left: 0; width: 100%; }
          .an-search { max-width: none; }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async (context) => {
  return { props: {} };
});
