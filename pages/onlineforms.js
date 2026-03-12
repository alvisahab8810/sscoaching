// /pages/admission.jsx
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";
import Head from "next/head";
import { useState } from "react";
import { toast } from "sonner";
import {
  FiUser, FiBook, FiPhone, FiMapPin, FiPaperclip,
  FiImage, FiFileText, FiSend, FiRefreshCw, FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";

const INITIAL = {
  studentName: "", fatherName: "", motherName: "", gender: "",
  dob: "", email: "", mobile: "", phone: "", nationality: "Indian",
  category: "", employmentStatus: "", courseApplying: "", toc: "",
  correspondingAddress: "", permanentAddress: "",
  pinCode: "", district: "", state: "",
};

export default function AdmissionPage() {
  const [form, setForm]         = useState(INITIAL);
  const [photo, setPhoto]       = useState(null);
  const [docs, setDocs]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (photo) fd.append("photo", photo);
    if (docs)  fd.append("documents", docs);
    try {
      const res  = await fetch("/api/admissions", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        toast.success("Application submitted successfully!");
        setForm(INITIAL);
        setPhoto(null);
        setDocs(null);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
    setLoading(false);
  };

  const handleReset = () => { setForm(INITIAL); setPhoto(null); setDocs(null); };

  return (
    <>
      <Head>
        <title>Apply Now — SS Coaching</title>
        <meta name="description" content="Apply online for admission at SS Coaching, Lucknow. NIOS coaching for 10th & 12th." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="faq-section">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        {/* ── Hero ── */}
        <div className="adm-hero">
          <div className="adm-hero-inner">
            <nav className="adm-breadcrumb">
              <a href="/">Home</a>
              <FiChevronRight size={11} />
              <span>Apply Now</span>
            </nav>
            <h1 className="adm-hero-title">
              Online <span>Admission Form</span>
            </h1>
            <p className="adm-hero-sub">Fill in your details below to apply for the 2025–26 batch</p>
          </div>
        </div>

        {/* ── Main ── */}
        <div className="adm-page-bg">
        <div className="adm-wrap">

          {/* Step Indicator */}
          {!submitted && (
            <div className="adm-steps">
              {[
                { n: 1, label: "Personal" },
                { n: 2, label: "Course" },
                { n: 3, label: "Contact" },
                { n: 4, label: "Address" },
                { n: 5, label: "Documents" },
              ].map((s, i, arr) => (
                <div className="adm-step" key={s.n}>
                  <div className="adm-step-dot">
                    <div className="adm-step-num done">{s.n}</div>
                    <div className="adm-step-lbl done">{s.label}</div>
                  </div>
                  {i < arr.length - 1 && <div className="adm-step-line done" />}
                </div>
              ))}
            </div>
          )}

          {/* ── Success ── */}
          {submitted && (
            <div className="adm-success-card">
              <div className="adm-success-icon">
                <FiCheckCircle size={56} color="#00cbb8" />
              </div>
              <h3>Application Submitted!</h3>
              <p>Thank you! Our team will contact you within 2–3 working days.</p>
              <button className="adm-btn-primary" onClick={() => setSubmitted(false)}>
                Submit Another Application
              </button>
            </div>
          )}

          {!submitted && (
            <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>

              {/* ── Section 1: Basic Details ── */}
              <div className="adm-card">
                <div className="adm-card-head">
                  <span className="adm-card-head-icon"><FiUser /></span>
                  <span className="adm-card-head-text">Basic Details</span>
                  <span className="adm-card-head-badge">Step 1</span>
                </div>
                <div className="adm-card-body">
                  <div className="adm-grid-2">

                    <div className="adm-field">
                      <label className="adm-label">Student Name <span className="adm-req">*</span></label>
                      <input className="adm-input" type="text" placeholder="Full name as per certificate"
                        value={form.studentName} onChange={set("studentName")} required />
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">Father's Name <span className="adm-req">*</span></label>
                      <input className="adm-input" type="text" placeholder="Father's full name"
                        value={form.fatherName} onChange={set("fatherName")} required />
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">Mother's Name <span className="adm-req">*</span></label>
                      <input className="adm-input" type="text" placeholder="Mother's full name"
                        value={form.motherName} onChange={set("motherName")} required />
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">Gender <span className="adm-req">*</span></label>
                      <select className="adm-select-field" value={form.gender} onChange={set("gender")} required>
                        <option value="">Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">Date of Birth <span className="adm-req">*</span></label>
                      <input className="adm-input" type="date"
                        value={form.dob} onChange={set("dob")} required />
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">Nationality</label>
                      <input className="adm-input" type="text" placeholder="e.g. Indian"
                        value={form.nationality} onChange={set("nationality")} />
                    </div>

                  </div>
                </div>
              </div>

              {/* ── Section 2: Course Details ── */}
              <div className="adm-card">
                <div className="adm-card-head">
                  <span className="adm-card-head-icon"><FiBook /></span>
                  <span className="adm-card-head-text">Course Details</span>
                  <span className="adm-card-head-badge">Step 2</span>
                </div>
                <div className="adm-card-body">
                  <div className="adm-grid-2">

                    <div className="adm-field">
                      <label className="adm-label">Course Applying For <span className="adm-req">*</span></label>
                      <select className="adm-select-field" value={form.courseApplying} onChange={set("courseApplying")} required>
                        <option value="">Select course</option>
                        <option>Secondary (10th)</option>
                        <option>Senior Secondary (12th)</option>
                        
                      </select>
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">TOC (If Any)</label>
                      <select className="adm-select-field" value={form.toc} onChange={set("toc")}>
                        <option value="">Select batch</option>
                        <option>Morning Batch</option>
                        <option>Evening Batch</option>
                        <option>Weekend Batch</option>
                        <option>Online Batch</option>
                      </select>
                    </div>

                    <div className="adm-field  adm-span-2">
                      <label className="adm-label">Category <span className="adm-req">*</span></label>
                      <select className="adm-select-field" value={form.category} onChange={set("category")} required>
                        <option value="">Select category</option>
                        <option>General</option>
                        <option>OBC</option>
                        <option>SC</option>
                        <option>ST</option>
                        <option>EWS</option>
                      </select>
                    </div>

                    {/* <div className="adm-field">
                      <label className="adm-label">Employment Status</label>
                      <select className="adm-select-field" value={form.employmentStatus} onChange={set("employmentStatus")}>
                        <option value="">Select status</option>
                        <option>Fresher</option>
                        <option>Employed — Government</option>
                        <option>Employed — Private</option>
                        <option>Self Employed</option>
                        <option>Unemployed</option>
                      </select>
                    </div> */}

                  </div>
                </div>
              </div>

              {/* ── Section 3: Contact ── */}
              <div className="adm-card">
                <div className="adm-card-head">
                  <span className="adm-card-head-icon"><FiPhone /></span>
                  <span className="adm-card-head-text">Contact Information</span>
                  <span className="adm-card-head-badge">Step 3</span>
                </div>
                <div className="adm-card-body">
                  <div className="adm-grid-2">

                    <div className="adm-field">
                      <label className="adm-label">Mobile No. <span className="adm-req">*</span></label>
                      <input className="adm-input" type="tel" placeholder="+91 XXXXX XXXXX"
                        value={form.mobile} onChange={set("mobile")} required />
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">Phone No. (Optional)</label>
                      <input className="adm-input" type="tel" placeholder="Landline / alternate"
                        value={form.phone} onChange={set("phone")} />
                    </div>

                    <div className="adm-field adm-span-2">
                      <label className="adm-label">Email Address</label>
                      <input className="adm-input" type="email" placeholder="example@mail.com"
                        value={form.email} onChange={set("email")} />
                    </div>

                  </div>
                </div>
              </div>

              {/* ── Section 4: Address ── */}
              <div className="adm-card">
                <div className="adm-card-head">
                  <span className="adm-card-head-icon"><FiMapPin /></span>
                  <span className="adm-card-head-text">Address Details</span>
                  <span className="adm-card-head-badge">Step 4</span>
                </div>
                <div className="adm-card-body">
                  <div className="adm-grid-2">

                    <div className="adm-field">
                      <label className="adm-label">Corresponding Address <span className="adm-req">*</span></label>
                      <textarea className="adm-textarea" placeholder="Current / mailing address"
                        value={form.correspondingAddress} onChange={set("correspondingAddress")} required />
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">Permanent Address</label>
                      <textarea className="adm-textarea" placeholder="Permanent address (if different)"
                        value={form.permanentAddress} onChange={set("permanentAddress")} />
                    </div>

                  </div>

                  <div className="adm-grid-3 adm-mt">

                    <div className="adm-field">
                      <label className="adm-label">Pin Code</label>
                      <input className="adm-input" type="text" placeholder="6-digit PIN"
                        maxLength={6} value={form.pinCode} onChange={set("pinCode")} />
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">District</label>
                      <input className="adm-input" type="text" placeholder="District"
                        value={form.district} onChange={set("district")} />
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">State <span className="adm-req">*</span></label>
                      <input className="adm-input" type="text" placeholder="State / UT"
                        value={form.state} onChange={set("state")} required />
                    </div>

                  </div>
                </div>
              </div>

              {/* ── Section 5: Documents ── */}
              <div className="adm-card">
                <div className="adm-card-head">
                  <span className="adm-card-head-icon"><FiPaperclip /></span>
                  <span className="adm-card-head-text">Photo &amp; Documents</span>
                  <span className="adm-card-head-badge">Step 5</span>
                </div>
                <div className="adm-card-body">
                  <div className="adm-grid-2">

                    <div className="adm-field">
                      <label className="adm-label">
                        Passport-size Photo <span className="adm-req">*</span>
                      </label>
                      <label className="adm-file-box" htmlFor="admPhoto">
                        <span className="adm-file-ico"><FiImage size={22} /></span>
                        <span className="adm-file-info">
                          <span className="adm-file-name">
                            {photo ? photo.name : "No file chosen"}
                          </span>
                          <span className="adm-file-hint">JPG / PNG · Max 2 MB</span>
                        </span>
                        <span className="adm-file-btn-lbl">Browse</span>
                        <input
                          id="admPhoto" type="file" accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => setPhoto(e.target.files[0] || null)}
                        />
                      </label>
                    </div>

                    <div className="adm-field">
                      <label className="adm-label">Documents (ID / Marksheet)</label>
                      <label className="adm-file-box" htmlFor="admDocs">
                        <span className="adm-file-ico"><FiFileText size={22} /></span>
                        <span className="adm-file-info">
                          <span className="adm-file-name">
                            {docs ? docs.name : "No file chosen"}
                          </span>
                          <span className="adm-file-hint">PDF / JPG · Max 5 MB</span>
                        </span>
                        <span className="adm-file-btn-lbl">Browse</span>
                        <input
                          id="admDocs" type="file" accept=".pdf,image/*"
                          style={{ display: "none" }}
                          onChange={(e) => setDocs(e.target.files[0] || null)}
                        />
                      </label>
                    </div>

                  </div>
                </div>
              </div>

              {/* ── Submit Row ── */}
              <div className="adm-submit-row">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={handleReset}
                >
                  <FiRefreshCw size={15} />
                  Reset
                </button>
                <button
                  type="submit"
                  className="adm-btn-primary"
                  disabled={loading}
                >
                  <FiSend size={15} />
                  {loading ? "Submitting…" : "Submit Application"}
                </button>
              </div>

            </form>
          )}
        </div>{/* /adm-wrap */}
        </div>{/* /adm-page-bg */}
        <Footer />
      </section>
    </>
  );
}