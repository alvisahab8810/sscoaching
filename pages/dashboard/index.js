// "use client";
// import Sidebar from "@/components/dashboard/Sidebar";
// import Topbar from "@/components/dashboard/Topbar";
// import React from "react";

// export default function Dashboard() {
//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content Area */}
//       <div className="flex-grow-1 bg-light">
//         {/* Topbar */}
//         <Topbar />

//         {/* Dashboard Content */}
//         <div className="container-fluid p-4">
//           <h4 className="fw-bold mb-4">Welcome to Admin Dashboard</h4>

//           <div className="row g-3">
//             <div className="col-md-4">
//               <div className="card shadow-sm border-0">
//                 <div className="card-body">
//                   <h5 className="card-title mb-2">Total Blogs</h5>
//                   <p className="fs-4 fw-semibold text-primary">12</p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card shadow-sm border-0">
//                 <div className="card-body">
//                   <h5 className="card-title mb-2">Total Users</h5>
//                   <p className="fs-4 fw-semibold text-success">145</p>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card shadow-sm border-0">
//                 <div className="card-body">
//                   <h5 className="card-title mb-2">Pending Comments</h5>
//                   <p className="fs-4 fw-semibold text-warning">8</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    faqs: 0,
    users: 0,
    comments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch blogs count
        const blogRes = await fetch("/api/blogs/getAll");
        const blogData = await blogRes.json();

        // Fetch FAQs count
        const faqRes = await fetch("/api/faqs/");
        const faqData = await faqRes.json();

        // (Optional) Fetch users or comments if you have those APIs
        // const userRes = await fetch("/api/users");
        // const userData = await userRes.json();

        setStats({
          blogs: blogData?.data?.length || 0,
          faqs: faqData?.data?.length || 0,
          users: 145, // placeholder (replace if you fetch users)
          comments: 8, // placeholder (replace if you fetch comments)
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Topbar */}
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-grow-1 bg-light">
          {/* Dashboard Content */}
          <div className="container-fluid p-4">
            <h4 className="fw-bold mb-4">Welcome to Admin Dashboard</h4>


            <div className="stats-cards">
              <div className="row g-3">
                <div className="col-md-3 col-6">
                  <div className="stats-card stats-card-green">
                    <div className="stats-card-header">
                      <h6 className="stats-title">Total Blogs</h6>
                      <span className="stats-number">4</span>
                    </div>
                    <p className="stats-subtext">4 this month</p>
                  </div>
                </div>

                <div className="col-md-3 col-6">
                  <div className="stats-card stats-card-blue">
                    <div className="stats-card-header">
                      <h6 className="stats-title">Total FAQs</h6>
                      <span className="stats-number">24</span>
                    </div>
                    <p className="stats-subtext">4 this month</p>
                  </div>
                </div>
              </div>
            </div>


            {/* <div className="row g-3">
              <div className="col-md-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <h6 className="card-title text-muted mb-2">Total Blogs</h6>
                    <p className="fs-3 fw-bold text-primary">{stats.blogs}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <h6 className="card-title text-muted mb-2">Total FAQs</h6>
                    <p className="fs-3 fw-bold text-info">{stats.faqs}</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
