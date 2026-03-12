"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  FaUser,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaFolder,
} from "react-icons/fa";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  // Filters
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [formType, setFormType] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(filtered.length / limit);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/get-leads");
      const data = await res.json();

      if (data.success) {
        setLeads(data.leads);
        setFiltered(data.leads);
      }
    } catch (err) {
      console.log("Error fetching leads:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Apply Filters
  useEffect(() => {
    let data = [...leads];

    if (searchName.trim() !== "") {
      data = data.filter((l) =>
        l.fullName.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchCity.trim() !== "") {
      data = data.filter((l) =>
        l.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }

    if (formType !== "all") {
      data = data.filter((l) => l.formType === formType);
    }

    if (dateFilter) {
      const selectedDate = new Date(dateFilter).toDateString();
      data = data.filter(
        (l) => new Date(l.createdAt).toDateString() === selectedDate
      );
    }

    setFiltered(data);
    setPage(1);
  }, [searchName, searchCity, formType, dateFilter, leads]);

  // Delete Lead
  const deleteLead = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    await fetch("/api/delete-lead", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    setLeads(leads.filter((l) => l._id !== id));
  };

  // Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "leads.xlsx"
    );
  };

  // Export CSV
  const exportCSV = () => {
    const rows = [
      ["Full Name", "Email", "Phone", "City", "Looking For", "Form Type", "Date"],
      ...filtered.map((l) => [
        l.fullName,
        l.email,
        l.phone,
        l.city,
        l.lookingFor,
        l.formType,
        new Date(l.createdAt).toLocaleString(),
      ]),
    ];

    let csvContent = rows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "leads.csv");
  };

  // Pagination Slice
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div>
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 bg-light">
          <div className="container-fluid p-4 leads-wrapper">
            <h4 className="fw-bold mb-4 dashbaord-main-heading">
             
            </h4>

         <div className="admin-row">
              <h4 className="fw-bold">Leads Management</h4>

            <div className="d-flex gap-2 mb-3 leads-export">
              <button className="btn btn-success" onClick={exportExcel}>
                Export Excel
              </button>
              <button className="btn btn-primary" onClick={exportCSV}>
                Export CSV
              </button>
            </div>
            </div>

            {/* Filters */}
            <div className="row g-2 leads-filters mb-5">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by City"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <select
                  className="form-select"
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                >
                  <option value="all">All Forms</option>
                  <option value="popup">Popup Form</option>
                  <option value="query">Query Form</option>
                </select>
              </div>

              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
          

            {/* Loader */}
            {loading && <p>Loading leads...</p>}

            {/* No Leads */}
            {!loading && filtered.length === 0 && <p>No leads found.</p>}

            {/* Leads Table */}
            {!loading && filtered.length > 0 && (
              <div className="table-responsive leads-table">
                <table className="table table-bordered align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      {/* <th>City</th> */}
                      {/* <th>Looking For</th> */}
                      <th>Form</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginated.map((lead, i) => (
                      <tr key={lead._id}>
                        <td>{(page - 1) * limit + i + 1}</td>
                        <td>{lead.fullName}</td>
                        <td>{lead.email}</td>
                        <td>{lead.phone}</td>
                        {/* <td>{lead.city}</td> */}
                        {/* <td>{lead.lookingFor}</td> */}

                        <td>
                          <span
                            className={`badge ${
                              lead.formType === "query"
                                ? "bg-info"
                                : "bg-success"
                            }`}
                          >
                            {lead.formType}
                          </span>
                        </td>

                        <td>
                          {new Date(lead.createdAt).toLocaleString()}
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteLead(lead._id)}
                          >
                           <FaTrash />  
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="d-flex justify-content-between mt-3 leads-pagination">
                  <button
                    className="btn btn-secondary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="btn btn-secondary"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unique CSS */}
      <style jsx>{`
        .leads-wrapper {
          background: #f5f7fa;
          border-radius: 8px;
        }

        .leads-table table {
          border-radius: 10px;
          overflow: hidden;
        }

        .leads-filters input,
        .leads-filters select {
          border-radius: 6px;
        }

        .leads-pagination span {
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .leads-filters {
            flex-direction: column;
          }
          .leads-export {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}



export const getServerSideProps = withAdminAuth(async () => {
  return {
    props: {},
  };
});