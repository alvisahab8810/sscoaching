import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { withAdminAuth } from "@/lib/withAdminAuth";
import DeskShell, { useStats } from "@/components/OnlineAdmission/DeskShell";
import CentreFinder from "@/components/OnlineAdmission/CentreFinder";
import { api, dateOnly } from "@/components/OnlineAdmission/client";
import { Spinner, cx } from "@/components/OnlineAdmission/ui";
import a from "@/components/OnlineAdmission/App.module.css";
import d from "@/components/OnlineAdmission/Desk.module.css";

export default function CentresPage() {
  const router = useRouter();
  const { stats, error } = useStats();
  const [s, setS] = useState(null);

  useEffect(() => { api("GET", "/staff/centres/states").then(setS).catch(() => setS({ failed: true })); }, []);

  const sub = s && !s.failed
    ? `${s.total.toLocaleString("en-IN")} active academic centres across ${s.states.length} states and UTs, from the official NIOS list (synced ${dateOnly(s.synced_at)}). Start with the student’s pincode.`
    : "Start with the student’s pincode.";

  return (
    <DeskShell active="centres" title="NIOS study centre finder" sub={sub} isAdmin={stats?.is_admin} error={error}>
      <div className={a.card}>
        {router.isReady ? <CentreFinder pin={String(router.query.pin || "")} /> : <Spinner />}
      </div>
      {s && !s.failed && (
        <details className={cx(a.card, d.fold)} style={{ marginTop: 14 }}>
          <summary>Centres by state <span>{s.states.length} states and UTs</span></summary>
          <div className={d.tableWrap}>
            <table className={d.list}>
              <thead><tr><th>State / UT</th><th>All centres</th><th>General</th><th>Districts</th></tr></thead>
              <tbody>
                {s.states.map((x) => (
                  <tr key={x.state}>
                    <td>{x.state}</td>
                    <td className={a.num}>{x.n}</td>
                    <td className={a.num}>{x.general}</td>
                    <td className={a.num}>{x.districts.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </DeskShell>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
