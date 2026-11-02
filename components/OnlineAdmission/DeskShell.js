// Layout of the consultant desk pages inside the admin dashboard.
import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FiGrid, FiFileText, FiMapPin, FiPhone, FiSettings } from "react-icons/fi";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { api } from "./client";
import { cx } from "./ui";
import a from "./App.module.css";
import d from "./Desk.module.css";

export const DESK = "/dashboard/admin/online-admissions";

const SECTIONS = [
  { key: "overview", href: DESK, label: "Overview", icon: FiGrid },
  { key: "applications", href: `${DESK}/applications`, label: "Applications", icon: FiFileText },
  { key: "centres", href: `${DESK}/centres`, label: "Centre finder", icon: FiMapPin },
  { key: "leads", href: `${DESK}/leads`, label: "Interested students", icon: FiPhone },
  { key: "settings", href: `${DESK}/settings`, label: "Settings", icon: FiSettings, adminOnly: true },
];

/** Desk-wide numbers (queue counts, is_admin). `error` carries the API status for access problems. */
export function useStats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const reload = useCallback(async () => {
    try {
      setStats(await api("GET", "/staff/stats"));
    } catch (e) {
      setError(e);
    }
  }, []);
  useEffect(() => { reload(); }, [reload]);
  return { stats, error, reload };
}

export default function DeskShell({ active, title, sub, actions, isAdmin, error, children }) {
  return (
    <div>
      <Head><title>{`${title} | Online admissions`}</title></Head>
      <Topbar />
      <AdminOffcanvas />
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div className={cx("flex-grow-1", d.bg)} style={{ minWidth: 0 }}>
          <div className={cx("container-fluid p-4", a.app, a.deskUi, d.desk)}>
            <div className={d.head}>
              <div>
                <h1>{title}</h1>
                {sub && <p>{sub}</p>}
              </div>
              {actions}
            </div>
            <nav className={d.nav} aria-label="Online admissions sections">
              {SECTIONS.filter((s) => !s.adminOnly || isAdmin).map(({ key, href, label, icon: Icon }) => (
                <Link key={key} href={href} className={key === active ? d.on : ""} aria-current={key === active ? "page" : undefined}>
                  <Icon size={15} /> {label}
                </Link>
              ))}
            </nav>
            {error ? <DeskError error={error} /> : children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeskError({ error }) {
  const msg = error.status === 403
    ? "Your account does not have the Applications (admissions) permission. Ask the main admin to give it on the Sub-admins page."
    : error.message || "Something went wrong";
  return <div className={cx(a.note, a.noteBad)}>{msg}</div>;
}
