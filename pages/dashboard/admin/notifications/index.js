import { useState, useEffect } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Head from "next/head";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { MdNotifications, MdSend, MdCheckCircle, MdPeople, MdPhone, MdImage, MdClose } from "react-icons/md";
import { toast } from "sonner";

const MAX_BANNER_SIZE = 1 * 1024 * 1024; // 1MB

const QUICK = [
  { label: "New Live Class", title: "🔴 Live Class Starting!", body: "Your class is starting now. Join immediately!" },
  { label: "New Course", title: "📚 New Course Added!", body: "A new course has been added. Check it out now." },
  { label: "Offer", title: "🎉 Special Offer!", body: "Limited time offer on courses. Enroll today!" },
  { label: "Holiday", title: "🏖️ Holiday Notice", body: "No classes today. Classes resume tomorrow." },
  { label: "Result", title: "🏆 Results Announced!", body: "Exam results are now available. Check your dashboard." },
  { label: "Reminder", title: "⏰ Class Reminder", body: "Your next class starts in 30 minutes. Be ready!" },
];

export default function NotificationsPage() {
  const [title, setTitle]   = useState("");
  const [body, setBody]     = useState("");
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [stats, setStats]   = useState(null);

  const loadStats = async () => {
    try {
      const res = await fetch("/api/admin/notifications/stats");
      const data = await res.json();
      if (data.success) setStats(data);
    } catch {}
  };

  useEffect(() => { loadStats(); }, []);

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Sirf JPG, PNG ya WebP image allowed hai"); return;
    }
    if (file.size > MAX_BANNER_SIZE) {
      toast.error(`Banner image 1MB se choti honi chahiye (current: ${(file.size / 1024).toFixed(0)}KB)`); return;
    }
    setBanner(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const clearBanner = () => { setBanner(null); setBannerPreview(""); };

  const send = async () => {
    if (!title.trim() || !body.trim()) { toast.error("Title and message are required"); return; }
    setSending(true); setResult(null);
    try {
      let image = "";
      if (banner) {
        const fd = new FormData();
        fd.append("image", banner);
        const upRes  = await fetch("/api/upload/notification-banner", { method: "POST", body: fd });
        const upData = await upRes.json();
        if (!upData.success) {
          toast.error(upData.message || "Banner upload failed");
          setSending(false); return;
        }
        image = `https://sscoaching.in${upData.url}`;
      }

      const res  = await fetch("/api/admin/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), target: "all", image }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data);
        toast.success(`Sent to ${data.sent} students!`);
      } else {
        toast.error(data.message || "Failed to send");
      }
    } catch { toast.error("Network error"); }
    setSending(false);
  };

  const applyQuick = (q) => { setTitle(q.title); setBody(q.body); setResult(null); };

  return (
    <>
      <Head><title>Push Notifications — Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">

              {/* Header */}
              <div className="ntf-header">
                <div>
                  <h1 className="ntf-title"><MdNotifications size={26}/> Push Notifications</h1>
                  <p className="ntf-sub">Send notifications to all students on the SS Coaching app</p>
                </div>
              </div>

              {/* Token stats bar */}
              <div style={{ background: stats?.withToken > 0 ? "#f0fdf4" : "#fef9c3", border: `1px solid ${stats?.withToken > 0 ? "#bbf7d0" : "#fde68a"}`, borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <MdPeople size={20} color={stats?.withToken > 0 ? "#16a34a" : "#92400e"} />
                {stats ? (
                  <>
                    <span style={{ fontWeight: 700, color: stats.withToken > 0 ? "#15803d" : "#92400e" }}>
                      {stats.withToken} of {stats.total} students have notifications enabled
                    </span>
                    {stats.withToken === 0 && (
                      <span style={{ color: "#92400e", fontSize: 13 }}>— Students need to install the app and log in to save their token</span>
                    )}
                    <button onClick={loadStats} style={{ marginLeft: "auto", fontSize: 12, background: "none", border: "1px solid #d1d5db", borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}>Refresh</button>
                  </>
                ) : (
                  <span style={{ color: "#6b7280", fontSize: 13 }}>Loading stats...</span>
                )}
              </div>

              {stats?.samples?.length > 0 && (
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "#374151" }}>Students with tokens saved:</div>
                  {stats.samples.map(s => (
                    <div key={s._id} style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                      <b>{s.name}</b> ({s.phone}) — <code style={{ fontSize: 11 }}>{s.expoPushToken?.slice(0, 40)}…</code>
                    </div>
                  ))}
                </div>
              )}

              <div className="ntf-layout">

                {/* Compose */}
                <div className="ntf-card ntf-compose">
                  <div className="ntf-card-head">Compose Notification</div>

                  {/* Quick templates */}
                  <div className="ntf-quick-label">Quick Templates</div>
                  <div className="ntf-quick-grid">
                    {QUICK.map(q => (
                      <button key={q.label} className="ntf-quick-btn" onClick={() => applyQuick(q)}>
                        {q.label}
                      </button>
                    ))}
                  </div>

                  <div className="ntf-field">
                    <label className="ntf-label">Title <span className="ntf-req">*</span></label>
                    <input
                      className="ntf-input"
                      placeholder="e.g. New class added!"
                      value={title} onChange={e => setTitle(e.target.value)}
                      maxLength={60}
                    />
                    <div className="ntf-char">{title.length}/60</div>
                  </div>

                  <div className="ntf-field">
                    <label className="ntf-label">Message <span className="ntf-req">*</span></label>
                    <textarea
                      className="ntf-textarea"
                      placeholder="Write the notification message here..."
                      value={body} onChange={e => setBody(e.target.value)}
                      rows={4} maxLength={200}
                    />
                    <div className="ntf-char">{body.length}/200</div>
                  </div>

                  <div className="ntf-field">
                    <label className="ntf-label">Banner Image <span style={{ color: "#94a3b8", fontWeight: 400 }}>(optional)</span></label>
                    {bannerPreview ? (
                      <div className="ntf-banner-preview">
                        <img src={bannerPreview} alt="Banner" />
                        <button type="button" className="ntf-banner-remove" onClick={clearBanner}><MdClose size={16}/></button>
                      </div>
                    ) : (
                      <label className="ntf-banner-upload">
                        <MdImage size={22} color="#8491a8"/>
                        <span>Click to upload a banner — shown as a big image in the notification, like an offer banner</span>
                        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleBannerChange} hidden />
                      </label>
                    )}
                    <div className="ntf-char" style={{ textAlign: "left" }}>Recommended 1024×512px, JPG/PNG/WebP, max 1MB. Shows in the Android notification drawer.</div>
                  </div>

                  {/* Preview */}
                  {(title || body) && (
                    <div className="ntf-preview">
                      <div className="ntf-preview-label">Preview</div>
                      <div className="ntf-preview-box">
                        <div className="ntf-preview-app">
                          <img src="/favicon.ico" alt="" className="ntf-preview-icon" onError={e => e.target.style.display='none'}/>
                          <span>SS Coaching</span>
                        </div>
                        <div className="ntf-preview-title">{title || "Title"}</div>
                        <div className="ntf-preview-body">{body || "Message"}</div>
                        {bannerPreview && <img src={bannerPreview} alt="" className="ntf-preview-banner" />}
                      </div>
                    </div>
                  )}

                  <button className="ntf-send-btn" onClick={send} disabled={sending || !title || !body}>
                    {sending ? (
                      <><span className="ntf-spin"/> Sending...</>
                    ) : (
                      <><MdSend size={17}/> Send to All Students</>
                    )}
                  </button>

                  {/* Result */}
                  {result && (
                    <div className="ntf-result">
                      <MdCheckCircle size={20} color="#10b981"/>
                      <div>
                        <div className="ntf-result-title">Notification Sent!</div>
                        <div className="ntf-result-sub">
                          Delivered to <strong>{result.sent}</strong> of {result.total} students
                          {result.errors > 0 && ` (${result.errors} failed)`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div className="ntf-info-col">
                  <div className="ntf-card">
                    <div className="ntf-card-head">How it works</div>
                    <div className="ntf-steps">
                      {[
                        [<MdPhone size={16}/>, "Student opens app", "Notification permission granted automatically"],
                        [<MdNotifications size={16}/>, "Token saved", "Expo push token stored in your database"],
                        [<MdSend size={16}/>, "You send", "Click Send — all students get the notification instantly"],
                        [<MdCheckCircle size={16}/>, "Delivered", "Works even when app is closed"],
                      ].map(([icon, head, sub], i) => (
                        <div key={i} className="ntf-step">
                          <div className="ntf-step-icon">{icon}</div>
                          <div>
                            <div className="ntf-step-head">{head}</div>
                            <div className="ntf-step-sub">{sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ntf-card ntf-tips">
                    <div className="ntf-card-head">Tips</div>
                    <ul className="ntf-tip-list">
                      <li>Keep title short — max 60 characters</li>
                      <li>Use emojis to grab attention 🎯</li>
                      <li>Send at the right time — not too late at night</li>
                      <li>Students who haven't opened the app yet won't have a token</li>
                    </ul>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ntf-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
        }
        .ntf-title {
          font-size: 22px; font-weight: 800; color: #0f1f3d; margin: 0 0 4px;
          display: flex; align-items: center; gap: 8px;
          font-family: 'Poppins', sans-serif;
        }
        .ntf-sub { font-size: 13px; color: #8491a8; margin: 0; }

        .ntf-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 20px;
          align-items: start;
        }

        .ntf-card {
          background: #fff;
          border: 1.5px solid #e8eaf5;
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 16px;
        }
        .ntf-card-head {
          font-size: 14px; font-weight: 700; color: #0f1f3d;
          font-family: 'Poppins', sans-serif;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .ntf-quick-label {
          font-size: 11px; font-weight: 700; color: #8491a8;
          text-transform: uppercase; letter-spacing: 0.06em;
          margin-bottom: 10px;
        }
        .ntf-quick-grid {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;
        }
        .ntf-quick-btn {
          background: #f0eeff; color: #4441e5;
          border: 1.5px solid #c4b5fd; border-radius: 8px;
          padding: 6px 14px; font-size: 12px; font-weight: 700;
          cursor: pointer; transition: all 0.15s;
          font-family: 'Poppins', sans-serif;
        }
        .ntf-quick-btn:hover { background: #4441e5; color: #fff; border-color: #4441e5; }

        .ntf-field { margin-bottom: 16px; position: relative; }
        .ntf-label {
          display: block; font-size: 12px; font-weight: 700;
          color: #4b5563; margin-bottom: 6px;
        }
        .ntf-req { color: #ef4444; }
        .ntf-input, .ntf-textarea {
          width: 100%; padding: 10px 14px;
          border: 1.5px solid #e2e8f0; border-radius: 9px;
          font-size: 13.5px; color: #0f1f3d;
          font-family: 'Poppins', sans-serif;
          outline: none; resize: none; box-sizing: border-box;
          transition: border-color 0.15s;
        }
        .ntf-input:focus, .ntf-textarea:focus {
          border-color: #4441e5;
          box-shadow: 0 0 0 3px rgba(68,65,229,0.08);
        }
        .ntf-char {
          font-size: 11px; color: #94a3b8; text-align: right; margin-top: 4px;
        }

        /* Banner upload */
        .ntf-banner-upload {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          gap: 6px; padding: 22px 16px;
          border: 1.5px dashed #cbd5e1; border-radius: 10px;
          cursor: pointer; transition: border-color 0.15s, background 0.15s;
        }
        .ntf-banner-upload:hover { border-color: #4441e5; background: #f8f7ff; }
        .ntf-banner-upload span { font-size: 12px; color: #8491a8; max-width: 320px; }
        .ntf-banner-preview {
          position: relative; border-radius: 10px; overflow: hidden;
          border: 1.5px solid #e2e8f0;
        }
        .ntf-banner-preview img { display: block; width: 100%; max-height: 180px; object-fit: cover; }
        .ntf-banner-remove {
          position: absolute; top: 8px; right: 8px;
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(0,0,0,0.6); color: #fff; border: none;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .ntf-banner-remove:hover { background: rgba(0,0,0,0.8); }

        /* Preview */
        .ntf-preview { margin-bottom: 20px; }
        .ntf-preview-label {
          font-size: 11px; font-weight: 700; color: #8491a8;
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;
        }
        .ntf-preview-box {
          background: #1a1a2e; border-radius: 16px; padding: 16px;
          border: 1px solid #2d2d4a;
        }
        .ntf-preview-app {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: rgba(255,255,255,0.45);
          margin-bottom: 8px;
        }
        .ntf-preview-icon { width: 14px; height: 14px; border-radius: 3px; }
        .ntf-preview-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .ntf-preview-body { font-size: 12.5px; color: rgba(255,255,255,0.7); line-height: 1.5; }
        .ntf-preview-banner { width: 100%; max-height: 140px; object-fit: cover; border-radius: 8px; margin-top: 10px; }

        .ntf-send-btn {
          width: 100%; height: 46px;
          background: linear-gradient(135deg, #4441e5, #6b68ff);
          color: #fff; border: none; border-radius: 10px;
          font-size: 14px; font-weight: 700;
          font-family: 'Poppins', sans-serif;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.2s;
        }
        .ntf-send-btn:hover:not(:disabled) { opacity: 0.9; }
        .ntf-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .ntf-spin {
          width: 16px; height: 16px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: ntf-rot 0.7s linear infinite; display: inline-block;
        }
        @keyframes ntf-rot { to { transform: rotate(360deg); } }

        .ntf-result {
          display: flex; align-items: flex-start; gap: 12px;
          background: #d1fae5; border: 1.5px solid #6ee7b7;
          border-radius: 10px; padding: 14px; margin-top: 14px;
        }
        .ntf-result-title { font-size: 13px; font-weight: 700; color: #065f46; }
        .ntf-result-sub { font-size: 12px; color: #047857; margin-top: 2px; }

        /* Info panel */
        .ntf-info-col {}
        .ntf-steps { display: flex; flex-direction: column; gap: 16px; }
        .ntf-step { display: flex; gap: 12px; align-items: flex-start; }
        .ntf-step-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: #eef2ff; color: #4441e5;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ntf-step-head { font-size: 13px; font-weight: 700; color: #0f1f3d; }
        .ntf-step-sub { font-size: 11.5px; color: #94a3b8; margin-top: 2px; }

        .ntf-tips .ntf-card-head { margin-bottom: 12px; }
        .ntf-tip-list {
          margin: 0; padding-left: 18px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .ntf-tip-list li { font-size: 12.5px; color: #6b7a99; line-height: 1.5; }

        @media (max-width: 900px) {
          .ntf-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
