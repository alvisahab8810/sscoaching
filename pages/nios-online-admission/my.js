import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import StudentShell, { useStudent, toLogin } from "@/components/OnlineAdmission/StudentShell";
import { api } from "@/components/OnlineAdmission/client";
import { Pill, Spinner } from "@/components/OnlineAdmission/ui";
import a from "@/components/OnlineAdmission/App.module.css";

export default function MyAdmissions() {
  const router = useRouter();
  const me = useStudent();
  const [apps, setApps] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!me) return;
    api("GET", "/my/applications")
      .then(({ applications }) => {
        // Nothing to list for zero or one file: go straight to the packages or to that file.
        if (!applications.length) router.replace("/nios-online-admission");
        else if (applications.length === 1) router.replace(`/nios-online-admission/app/${applications[0].id}`);
        else setApps(applications);
      })
      .catch((e) => (e.status === 401 ? toLogin(router) : setError(e.message)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return (
    <StudentShell title="My admission" me={me}>
      <h2>My NIOS admission</h2>
      {error ? (
        <div className={`${a.note} ${a.noteBad}`} style={{ marginTop: 14 }}>{error}</div>
      ) : !apps?.length ? (
        <Spinner />
      ) : (
        <div className={a.stack} style={{ marginTop: 14 }}>
          {apps.map((x) => (
            <Link key={x.id} href={`/nios-online-admission/app/${x.id}`} className={`${a.card} ${a.flat}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              <div className={a.row}>
                <div className={a.grow}>
                  <h3>Class {x.class}th, {x.stream_info?.label || ""}</h3>
                  <div className={`${a.muted} ${a.small}`}>{x.ref_no || "Draft"}</div>
                </div>
                <Pill status={x.status}>{x.status_info?.label}</Pill>
              </div>
            </Link>
          ))}
        </div>
      )}
    </StudentShell>
  );
}
