import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiDownload, FiSearch } from "react-icons/fi";
import { withAdminAuth } from "@/lib/withAdminAuth";
import DeskShell, { DESK, useStats } from "@/components/OnlineAdmission/DeskShell";
import { QUEUE_TABS, countOf } from "@/components/OnlineAdmission/queue";
import { api, when } from "@/components/OnlineAdmission/client";
import { Pill, Spinner, cx } from "@/components/OnlineAdmission/ui";
import a from "@/components/OnlineAdmission/App.module.css";
import d from "@/components/OnlineAdmission/Desk.module.css";

const EMPTY = {
  verify: "Nothing waiting for verification. New submissions appear here.",
  changes: "No file is waiting for student corrections.",
  payment: "No verified file is waiting for payment.",
  nios: "No paid file is waiting for the NIOS form.",
  enrol: "No file is waiting for an enrollment number.",
  examfee: "No enrolled student is waiting for the exam fee.",
};

export default function AdmissionQueue() {
  const router = useRouter();
  const { tab: tabKey, q = "", mine = "" } = router.query;
  const tab = QUEUE_TABS.find((t) => t.key === (tabKey || "verify")) || QUEUE_TABS[0];
  const { stats, error: statsError } = useStats();
  const [list, setList] = useState(null);
  const [error, setError] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => { if (router.isReady) setTerm(String(q)); }, [router.isReady, q]);

  useEffect(() => {
    if (!router.isReady) return;
    setList(null);
    setError("");
    const p = new URLSearchParams({ status: tab.status.join(","), q: String(q), mine: mine === "1" ? "1" : "" });
    api("GET", `/staff/applications?${p}`)
      .then((r) => setList(r.applications))
      .catch((e) => setError(e.message));
  }, [router.isReady, tab.key, q, mine]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (next) => {
    const query = { tab: tab.key, ...next };
    Object.keys(query).forEach((k) => !query[k] && delete query[k]);
    router.push({ pathname: router.pathname, query });
  };
  const href = (k) => `${DESK}/applications?tab=${k}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

  return (
    <DeskShell
      active="applications"
      title="Applications"
      sub="Open a file to verify, allot a centre, or record NIOS updates."
      isAdmin={stats?.is_admin}
      error={statsError}
    >
      <form className={d.toolbar} onSubmit={(e) => { e.preventDefault(); go({ q: term.trim(), mine }); }}>
        <div className={d.search}>
          <FiSearch size={16} />
          <input
            placeholder="Search name, mobile, ref no. or enrollment no."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <button type="submit" className={cx(a.btn, a.sm)}>Search</button>
        <a className={cx(a.btn, a.ghost, a.sm)} href="/api/online-admission/staff/export"><FiDownload size={15} /> Export CSV</a>
      </form>

      <nav className={d.tabs} aria-label="Queue">
        {QUEUE_TABS.map((t) => {
          const n = countOf(stats?.by_status, t.status);
          return (
            <Link key={t.key} href={href(t.key)} className={cx(t.key === tab.key && d.on, t.key === "verify" && n > 0 && d.tabHot)}>
              {t.label} <b>{stats ? n : "…"}</b>
            </Link>
          );
        })}
      </nav>

      {(q || mine === "1") && (
        <p className={cx(a.small, a.muted)}>
          {mine === "1" && "Showing only files assigned to you. "}
          {q && <>Search: <b>{q}</b>. </>}
          <button type="button" className={a.linkBtn} onClick={() => { setTerm(""); go({}); }}>Clear</button>
        </p>
      )}

      {error ? (
        <div className={cx(a.note, a.noteBad)}>{error}</div>
      ) : !list ? (
        <Spinner />
      ) : !list.length ? (
        <div className={a.empty}>{q ? "No file matches this search." : EMPTY[tab.key] || "No applications here."}</div>
      ) : (
        <div className={d.tableWrap}>
          <table className={d.list}>
            <thead>
              <tr>{["Student", "Course", "From", "Status", "Consultant", "Updated"].map((t) => <th key={t}>{t}</th>)}</tr>
            </thead>
            <tbody>
              {list.map((x) => {
                const open = () => router.push(`${DESK}/applications/${x.id}`);
                return (
                  <tr key={x.id} className={d.click} tabIndex={0} onClick={open} onKeyDown={(e) => e.key === "Enter" && open()}>
                    <td>
                      <b>{x.name || "Not filled yet"}</b>{x.is_test && <> <Pill tone="warn">Test ₹{x.price}</Pill></>}
                      <div className={cx(a.small, a.muted, a.num)}>{[x.ref_no, x.mobile].filter(Boolean).join(", ")}</div>
                    </td>
                    <td>
                      Class {x.class}th
                      <div className={cx(a.small, a.muted)}>{x.stream === "2" ? "Stream 2" : `Stream 1, Block ${x.block}`}</div>
                    </td>
                    <td>
                      {x.district || ""}
                      <div className={cx(a.small, a.muted, a.num)}>{[x.state, x.pincode].filter(Boolean).join(", ")}</div>
                    </td>
                    <td>
                      <Pill status={x.status}>{x.status_label}</Pill>
                      {x.enrollment_no && <div className={cx(a.small, a.num)}>{x.enrollment_no}</div>}
                    </td>
                    <td className={a.small}>{x.consultant || <span className={a.muted}>Unassigned</span>}</td>
                    <td className={cx(a.small, a.muted)}>{when(x.updated_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DeskShell>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
