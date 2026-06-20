"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({ blogs: 0, faqs: 0 });
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then(r => r.json())
      .then(data => { if (data.role) setSession(data); })
      .catch(() => {});
  }, []);

  const isSuperAdmin = session?.role === "super";
  const permissions = session?.permissions || [];
  const canSee = (feature) => isSuperAdmin || permissions.includes(feature);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogRes, faqRes] = await Promise.all([
          fetch("/api/blogs/getAll"),
          fetch("/api/faqs/"),
        ]);
        const [blogData, faqData] = await Promise.all([blogRes.json(), faqRes.json()]);
        setStats({
          blogs: blogData?.data?.length || 0,
          faqs: faqData?.data?.length || 0,
        });
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    };
    fetchStats();
  }, []);

  const welcomeName = session?.role === "sub" ? session.name : "Admin";

  return (
    <div>
      <Topbar />
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />
        <div className="flex-grow-1 bg-light">
          <div className="container-fluid p-4">
            <h4 className="fw-bold mb-4 dashbaord-main-heading">
              Welcome, {welcomeName} 👋
            </h4>

            {/* Only show stats the sub-admin has permission for */}
            {(canSee("blogs") || canSee("faqs")) && (
              <div className="stats-cards">
                <div className="row g-3">
                  {canSee("blogs") && (
                    <div className="col-md-3 col-6">
                      <div className="stats-card stats-card-green">
                        <div className="stats-card-header">
                          <h6 className="stats-title">Total Blogs</h6>
                          <span className="stats-number">{stats.blogs}</span>
                        </div>
                        <p className="stats-subtext mobile-none">{stats.blogs} this month</p>
                        <div className="desktop-none blogs-mob-btn">
                          <a href="/dashboard/admin/blogs/create" className="d-flex add-new-blogs">
                            <img src="/assets/icons/add-new.svg" className="me-2" /> Add New Blog
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {canSee("faqs") && (
                    <div className="col-md-3 col-6">
                      <div className="stats-card stats-card-blue">
                        <div className="stats-card-header">
                          <h6 className="stats-title">Total FAQs</h6>
                          <span className="stats-number">{stats.faqs}</span>
                        </div>
                        <p className="stats-subtext mobile-none">{stats.faqs} this month</p>
                        <div className="desktop-none faqs-mob-btn">
                          <a href="/dashboard/admin/faqs/" className="d-flex add-new-blogs">
                            <img src="/assets/icons/add-new.svg" className="me-2" /> Add New FAQ
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* No accessible stats message for sub-admins with no matching permissions */}
            {!session && null}
            {session && !canSee("blogs") && !canSee("faqs") && (
              <div style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "1rem" }}>
                No dashboard stats available for your account.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
});
