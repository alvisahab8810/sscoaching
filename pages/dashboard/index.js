"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React from "react";

export default function Dashboard() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1 bg-light">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <div className="container-fluid p-4">
          <h4 className="fw-bold mb-4">Welcome to Admin Dashboard</h4>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title mb-2">Total Blogs</h5>
                  <p className="fs-4 fw-semibold text-primary">12</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title mb-2">Total Users</h5>
                  <p className="fs-4 fw-semibold text-success">145</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title mb-2">Pending Comments</h5>
                  <p className="fs-4 fw-semibold text-warning">8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
