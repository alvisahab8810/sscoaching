import { useEffect, useState } from "react";
import Head from "next/head";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import SalesStyles from "@/components/dashboard/sales/SalesStyles";
import { featureLabel, fmtDate, initial } from "@/components/dashboard/sales/shared";

export default function ProfilePage() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setMe(data.data);
        else setError(data.message || "Could not load your profile");
      })
      .catch(() => setError("Could not load your profile"));
  }, []);

  const isSuper = me?.role === "super";
  const name = isSuper ? "Admin" : me?.name;
  const roleLabel = isSuper ? "System Administrator" : me?.isSales ? "Sales Executive" : "Sub-Admin";

  return (
    <div>
      <Head>
        <title>My Profile — SS Coaching</title>
      </Head>
      <SalesStyles />
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 sl-bg">
          <div className="container-fluid p-4">
            <div className="sl-head">
              <div>
                <h4 className="sl-title">My Profile</h4>
                <p className="sl-sub">Your account details.</p>
              </div>
            </div>

            {error && <p className="sl-empty">{error}</p>}
            {!me && !error && <p className="sl-empty">Loading…</p>}

            {me && (
              <div className="sl-grid-2">
                <div className="sl-card" style={{ alignSelf: "start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                    <span className="sl-avatar lg">{initial(name)}</span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <h5 className="sl-title" style={{ fontSize: "1.15rem" }}>{name}</h5>
                        {!isSuper && <span className={`sl-pill ${me.status}`}>{me.status}</span>}
                      </div>
                      <div className="sl-sub">{roleLabel}</div>
                    </div>
                  </div>

                  {isSuper ? (
                    <div className="sl-kv">
                      <span>Email</span>
                      <span>{me.email || "—"}</span>
                    </div>
                  ) : (
                    <>
                      {[
                        ["Full Name", me.name],
                        ["Username", me.username],
                        ["Email", me.email],
                        ["Phone", me.phone || "—"],
                        ["Member since", fmtDate(me.createdAt)],
                      ].map(([label, value]) => (
                        <div key={label} className="sl-kv">
                          <span>{label}</span>
                          <span>{value}</span>
                        </div>
                      ))}
                      <p className="sl-hint" style={{ marginTop: 12 }}>
                        To change your details or password, contact the administrator.
                      </p>
                    </>
                  )}
                </div>

                {!isSuper && (
                  <div className="sl-card" style={{ alignSelf: "start" }}>
                    <h6 className="sl-card-title">
                      Access <small>sections in your left menu</small>
                    </h6>
                    {(me.permissions || []).length === 0 ? (
                      <p className="sl-empty">No sections assigned yet.</p>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {me.permissions.map((p) => (
                          <span key={p} className="sl-tag">
                            {featureLabel(p)}
                          </span>
                        ))}
                      </div>
                    )}
                    {me.isSales && (
                      <p className="sl-hint" style={{ marginTop: 12 }}>
                        In Leads and Follow-ups you see only the leads assigned to you.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
