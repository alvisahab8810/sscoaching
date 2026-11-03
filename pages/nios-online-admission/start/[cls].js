import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import StudentShell, { useStudent, toLogin } from "@/components/OnlineAdmission/StudentShell";
import { api } from "@/components/OnlineAdmission/client";
import { Spinner } from "@/components/OnlineAdmission/ui";
import a from "@/components/OnlineAdmission/App.module.css";

// Opens (or reuses) the student's application for the chosen class.
export default function StartAdmission() {
  const router = useRouter();
  const me = useStudent();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!me) return;
    const cls = router.query.cls;
    if (!["10", "12", "test"].includes(cls)) {
      router.replace("/nios-online-admission");
      return;
    }
    (async () => {
      try {
        const cfg = await api("GET", "/config");
        const r = await api("POST", "/my/applications", cls === "test"
          ? { class: "10", test: true, stream: "1", block: cfg.current_block }
          : { class: cls, stream: "1", block: cfg.current_block });
        router.replace(r.existing ? `/nios-online-admission/app/${r.id}` : `/nios-online-admission/app/${r.id}/edit/1`);
      } catch (e) {
        if (e.status === 401) toLogin(router);
        else setError(e.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return (
    <StudentShell title="Start admission" me={me}>
      {error ? (
        <div className={a.card}>
          <h3>Could not start the admission</h3>
          <p className={a.muted} style={{ marginTop: 8 }}>{error}</p>
          <Link href="/nios-online-admission" className={`${a.btn} ${a.ghost}`}>Go back</Link>
        </div>
      ) : (
        <Spinner />
      )}
    </StudentShell>
  );
}

// Server-rendered so the router (and the site header) knows the path on first paint.
export const getServerSideProps = async () => ({ props: {} });
