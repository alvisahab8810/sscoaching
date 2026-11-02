import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiAward, FiCheckCircle, FiCheckSquare, FiCreditCard, FiEdit3, FiFileText, FiHash, FiMapPin, FiPhone, FiShield, FiUser,
} from "react-icons/fi";
import { withAdminAuth } from "@/lib/withAdminAuth";
import { getCachedAdminSession, fetchAdminSession } from "@/lib/adminSession";
import DeskShell, { DESK, useStats } from "@/components/OnlineAdmission/DeskShell";
import { QUEUE_TABS, countOf } from "@/components/OnlineAdmission/queue";
import { rupee, dateOnly } from "@/components/OnlineAdmission/client";
import { Spinner, cx } from "@/components/OnlineAdmission/ui";
import d from "@/components/OnlineAdmission/Desk.module.css";

const QUEUE_ICONS = { verify: FiCheckSquare, changes: FiEdit3, payment: FiCreditCard, nios: FiFileText, enrol: FiHash, examfee: FiAward };

const RULES = [
  "The payment link opens for the student only after you approve every document.",
  "A NIOS form can be marked submitted only after a study centre is allotted and the checklist is complete.",
  "Internal notes on a file are never shown to the student.",
];

function Stat({ href, icon: Icon, label, value, sub, hot }) {
  const body = (
    <>
      <div className={d.statTop}>
        <span className={d.statLbl}>{label}</span>
        <span className={d.statIco}><Icon size={17} /></span>
      </div>
      <b>{value}</b>
      {sub && <span className={d.statSub}>{sub}</span>}
    </>
  );
  return href
    ? <Link href={href} className={cx(d.stat, hot && d.hot)}>{body}</Link>
    : <div className={d.stat}>{body}</div>;
}

export default function OnlineAdmissionsDesk() {
  const [session, setSession] = useState(() => getCachedAdminSession());
  const { stats, error } = useStats();

  useEffect(() => {
    if (!session) fetchAdminSession().then((data) => data && setSession(data));
  }, [session]);

  const firstName = (session?.name || session?.username || "").split(" ")[0];

  return (
    <DeskShell
      active="overview"
      title={firstName ? `Hello, ${firstName}` : "Online admissions"}
      sub="NIOS complete package admissions. Work the queue from left to right."
      isAdmin={stats?.is_admin}
      error={error}
    >
      {!stats ? <Spinner /> : (
        <>
          <div className={d.card}>
            <div className={d.cardHead}>
              <h3>Work queue</h3>
              <span>Open files by stage</span>
            </div>
            <div className={cx(d.grid, d.grid3)}>
              {QUEUE_TABS.slice(0, 6).map((t) => {
                const n = countOf(stats.by_status, t.status);
                const hot = t.key === "verify" && n > 0;
                return (
                  <Stat
                    key={t.key}
                    href={`${DESK}/applications?tab=${t.key}`}
                    icon={QUEUE_ICONS[t.key]}
                    label={t.label}
                    value={n}
                    hot={hot}
                    sub={hot ? <span className={d.badge}>Needs action</span> : n ? "View files" : "Nothing pending"}
                  />
                );
              })}
            </div>
          </div>

          <div className={d.split}>
            <div className={d.card}>
              <div className={d.cardHead}>
                <h3>At a glance</h3>
              </div>
              <div className={cx(d.grid, d.grid2)}>
                <Stat href={`${DESK}/applications?tab=all&mine=1`} icon={FiUser} label="Assigned to you" value={stats.mine} sub="Open files" />
                <Stat icon={FiCheckCircle} label="Payments received" value={rupee(stats.revenue)} sub="Package fees" />
                <Stat href={`${DESK}/leads`} icon={FiPhone} label="Interested" value={stats.interests} sub="Coming-soon list" />
                <Stat href={`${DESK}/centres`} icon={FiMapPin} label="Study centres" value="NIOS list" sub={`Synced ${dateOnly(stats.centres_synced_at)}`} />
              </div>
            </div>
            <div className={d.card}>
              <div className={d.cardHead}>
                <h3>Desk rules</h3>
              </div>
              <ul className={d.rules}>
                {RULES.map((r) => <li key={r}><FiShield size={15} /> {r}</li>)}
              </ul>
            </div>
          </div>
        </>
      )}
    </DeskShell>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
