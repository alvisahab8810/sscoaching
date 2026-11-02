import { useEffect, useState } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";
import DeskShell, { useStats } from "@/components/OnlineAdmission/DeskShell";
import { api, when } from "@/components/OnlineAdmission/client";
import { Spinner, cx } from "@/components/OnlineAdmission/ui";
import a from "@/components/OnlineAdmission/App.module.css";
import d from "@/components/OnlineAdmission/Desk.module.css";

export default function InterestedStudents() {
  const { stats, error } = useStats();
  const [list, setList] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api("GET", "/staff/interests").then((r) => setList(r.interests)).catch((e) => setErr(e.message));
  }, []);

  return (
    <DeskShell active="leads" title="Interested students" isAdmin={stats?.is_admin} error={error}
      sub="People who asked to be notified while the packages were marked coming soon.">
      {err ? <div className={cx(a.note, a.noteBad)}>{err}</div> : !list ? <Spinner /> : !list.length ? (
        <div className={a.empty}>No one yet.</div>
      ) : (
        <div className={d.tableWrap}>
          <table className={d.list}>
            <thead><tr>{["Name", "Mobile", "Class", "Pincode", "When"].map((t) => <th key={t}>{t}</th>)}</tr></thead>
            <tbody>
              {list.map((i) => (
                <tr key={i.id}>
                  <td>{i.name || "-"}</td>
                  <td><a href={`tel:${i.mobile}`} className={a.num}>{i.mobile}</a></td>
                  <td>{i.class ? `${i.class}th` : "-"}</td>
                  <td className={a.num}>{i.pincode || "-"}</td>
                  <td className={cx(a.small, a.muted)}>{when(i.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DeskShell>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
