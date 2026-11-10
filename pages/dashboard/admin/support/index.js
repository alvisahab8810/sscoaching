import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { toast } from "sonner";
import { FiSearch, FiPhone, FiSend, FiX } from "react-icons/fi";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import SalesStyles from "@/components/dashboard/sales/SalesStyles";

const STATUS_LABELS = { bot: "With bot", waiting: "Waiting", assigned: "Open", closed: "Closed" };

const timeAgo = (d) => {
  if (!d) return "";
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};
const clock = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
const fullDate = (d) => (d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "—");

async function api(url, body) {
  const res = await fetch(url, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    const err = new Error(data.message || "Something went wrong");
    err.status = res.status;
    throw err;
  }
  return data;
}

export default function SupportInboxPage() {
  const [box, setBox] = useState("waiting");
  const [q, setQ] = useState("");
  const [list, setList] = useState(null);
  const [noAccess, setNoAccess] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [student, setStudent] = useState(null);
  const [reply, setReply] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef(null);
  const lastAt = useRef(null);

  const loadList = useCallback(async () => {
    try {
      const data = await api(`/api/admin/support/chats?box=${box}&q=${encodeURIComponent(q.trim())}`);
      setList(data);
    } catch (err) {
      if (err.status === 403) setNoAccess(true);
      else toast.error(err.message);
    }
  }, [box, q]);

  useEffect(() => {
    const t = setTimeout(loadList, q ? 300 : 0);
    const iv = setInterval(loadList, 10000);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [loadList, q]);

  const addMessages = (incoming) => {
    if (!incoming?.length) return;
    setMessages((prev) => {
      const seen = new Set(prev.map((m) => m._id));
      const next = [...prev, ...incoming.filter((m) => !seen.has(m._id))];
      lastAt.current = next[next.length - 1]?.createdAt || lastAt.current;
      return next;
    });
  };

  // Opening a chat loads everything; after that only new messages every 3s.
  useEffect(() => {
    if (!openId) return;
    let alive = true;
    setChat(null);
    setMessages([]);
    setStudent(null);
    lastAt.current = null;

    const poll = async (first) => {
      try {
        const after = !first && lastAt.current ? `?after=${encodeURIComponent(lastAt.current)}` : "";
        const data = await api(`/api/admin/support/chats/${openId}${after}`);
        if (!alive) return;
        setChat(data.chat);
        if (first) setStudent(data.student);
        addMessages(data.messages);
      } catch (err) {
        if (!alive) return;
        if (first) {
          toast.error(err.message);
          setOpenId(null);
        }
      }
    };
    poll(true);
    const iv = setInterval(() => poll(false), 3000);
    return () => {
      alive = false;
      clearInterval(iv);
    };
  }, [openId]);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [messages.length]);

  const act = async (body, ok) => {
    if (!chat) return;
    setBusy(true);
    try {
      const data = await api(`/api/admin/support/chats/${chat._id}`, body);
      setChat(data.chat);
      addMessages(data.messages);
      if (ok) toast.success(ok);
      loadList();
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const send = async (e) => {
    e.preventDefault();
    const text = reply.trim();
    if (!text) return;
    if (await act({ action: "reply", text })) setReply("");
  };

  const addNote = async () => {
    if (!note.trim()) return;
    if (await act({ action: "note", text: note.trim() }, "Note saved")) setNote("");
  };

  const call = () => {
    if (!chat?.studentPhone) return;
    act({ action: "call" });
    window.location.href = `tel:${chat.studentPhone}`;
  };

  const close = () => {
    if (window.confirm("Close this chat? The student will be asked to rate it.")) act({ action: "close" }, "Chat closed");
  };

  const me = list?.me;
  const isMine = chat && me && chat.agentId === me.id;
  const canReply = chat && (chat.status === "waiting" || (chat.status === "assigned" && isMine));
  const tabs = [
    { key: "waiting", label: "Waiting", count: list?.counts?.waiting },
    { key: "mine", label: "My chats", count: list?.counts?.mine },
    ...(me?.isSuper ? [{ key: "all", label: "All open" }] : []),
    { key: "closed", label: "Closed" },
  ];
  const onlineCount = (list?.agents || []).filter((a) => a.online).length;

  return (
    <div>
      <Head>
        <title>Support Inbox — SS Coaching</title>
      </Head>
      <SalesStyles />
      <style jsx global>{`
        .sp-grid {
          display: grid;
          grid-template-columns: 320px 1fr 300px;
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 1200px) {
          .sp-grid {
            grid-template-columns: 300px 1fr;
          }
          .sp-info {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 768px) {
          .sp-grid {
            grid-template-columns: 1fr;
          }
        }
        .sp-list {
          max-height: calc(100vh - 290px);
          min-height: 300px;
          overflow-y: auto;
          margin: 0 -16px -16px;
        }
        .sp-item {
          display: block;
          width: 100%;
          text-align: left;
          background: #fff;
          border: none;
          border-top: 1px solid #f1f5f9;
          padding: 12px 16px;
        }
        .sp-item:hover {
          background: #f8fafc;
        }
        .sp-item.active {
          background: #f1eefc;
        }
        .sp-item-top {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #0f172a;
        }
        .sp-item-last {
          font-size: 0.8rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }
        .sp-badge {
          background: #5641ce;
          color: #fff;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 1px 7px;
          margin-left: 6px;
        }
        .sp-chat {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 200px);
          min-height: 460px;
          padding: 0;
        }
        .sp-chat-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
        }
        .sp-msgs {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f8fafc;
        }
        .sp-row {
          display: flex;
          margin-bottom: 10px;
        }
        .sp-row.right {
          justify-content: flex-end;
        }
        .sp-row.center {
          justify-content: center;
        }
        .sp-bubble {
          max-width: 72%;
          padding: 9px 13px;
          border-radius: 12px;
          font-size: 0.87rem;
          white-space: pre-wrap;
          word-break: break-word;
          background: #fff;
          border: 1px solid #e2e8f0;
          color: #0f172a;
        }
        .sp-row.right .sp-bubble {
          background: #5641ce;
          border-color: #5641ce;
          color: #fff;
        }
        .sp-row.right .sp-bubble.bot {
          background: #eef2f7;
          border-color: #e2e8f0;
          color: #334155;
        }
        .sp-sys {
          font-size: 0.76rem;
          color: #64748b;
          background: #eef2f7;
          border-radius: 999px;
          padding: 3px 12px;
        }
        .sp-meta {
          font-size: 0.7rem;
          opacity: 0.7;
          margin-top: 3px;
        }
        .sp-opts {
          margin-top: 6px;
          font-size: 0.75rem;
          opacity: 0.8;
        }
        .sp-reply {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid #e2e8f0;
        }
        .sp-reply textarea {
          flex: 1;
          resize: none;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 12px;
          font-size: 0.88rem;
        }
        .sp-reply textarea:focus {
          outline: none;
          border-color: #5641ce;
        }
        .sp-note {
          font-size: 0.82rem;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .sp-note:last-child {
          border-bottom: none;
        }
        .sp-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
          background: #cbd5e1;
        }
        .sp-dot.on {
          background: #16a34a;
        }
      `}</style>
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 sl-bg" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">
            <div className="sl-head">
              <div>
                <h4 className="sl-title">Support Inbox</h4>
                <p className="sl-sub">Students who asked the bot to talk to a person. Take a chat, reply, call if needed, then close it.</p>
              </div>
              {list && (
                <span className="sl-faint" style={{ fontSize: "0.85rem" }}>
                  <span className={`sp-dot ${onlineCount ? "on" : ""}`} />
                  {onlineCount} of {list.agents.length} agents online
                </span>
              )}
            </div>

            {noAccess ? (
              <div className="sl-card">
                <p className="sl-empty">You do not have access to support chats. Ask the super admin to give you the Support Chat permission, then log in again.</p>
              </div>
            ) : (
              <div className="sp-grid">
                <div className="sl-card">
                  <div className="sl-tabs" style={{ marginTop: -6 }}>
                    {tabs.map((t) => (
                      <button key={t.key} className={`sl-tab ${box === t.key ? "active" : ""}`} onClick={() => setBox(t.key)}>
                        {t.label}
                        {t.count ? <span className="sp-badge">{t.count}</span> : null}
                      </button>
                    ))}
                  </div>
                  <div className="sl-search" style={{ marginBottom: 12 }}>
                    <span className="sl-search-icon">
                      <FiSearch size={15} />
                    </span>
                    <input placeholder="Search name or phone" value={q} onChange={(e) => setQ(e.target.value)} />
                  </div>
                  <div className="sp-list">
                    {!list && <p className="sl-empty">Loading…</p>}
                    {list && !list.data.length && <p className="sl-empty">No chats here.</p>}
                    {list?.data.map((c) => (
                      <button key={c._id} className={`sp-item ${openId === c._id ? "active" : ""}`} onClick={() => setOpenId(c._id)}>
                        <div className="sp-item-top">
                          <span>
                            {c.studentName}
                            {c.unread && c.agentId === me?.id ? <span className="sp-badge">{c.unread}</span> : null}
                          </span>
                          <span className="sl-faint" style={{ fontWeight: 500, fontSize: "0.75rem" }}>
                            {timeAgo(c.lastMessageAt)}
                          </span>
                        </div>
                        <div className="sp-item-last">{c.lastMessage || "—"}</div>
                        {(box === "all" || box === "closed") && (
                          <div className="sl-faint" style={{ fontSize: "0.74rem", marginTop: 2 }}>
                            {STATUS_LABELS[c.status]}
                            {c.agentName ? ` · ${c.agentName}` : ""}
                            {c.rating ? ` · Rated ${c.rating}/5` : ""}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sl-card sp-chat">
                  {!openId ? (
                    <p className="sl-empty" style={{ margin: "auto" }}>Pick a chat from the list.</p>
                  ) : !chat ? (
                    <p className="sl-empty" style={{ margin: "auto" }}>Loading…</p>
                  ) : (
                    <>
                      <div className="sp-chat-head">
                        <div>
                          <div className="sl-strong" style={{ fontWeight: 700 }}>{chat.studentName}</div>
                          <div className="sl-faint" style={{ fontSize: "0.78rem" }}>
                            {STATUS_LABELS[chat.status]}
                            {chat.agentName ? ` · ${chat.agentName}` : ""} · from {chat.source === "app" ? "app" : "website"}
                          </div>
                        </div>
                        <div className="d-flex gap-2 flex-wrap align-items-center">
                          {chat.status === "waiting" && (
                            <button className="sl-btn" disabled={busy} onClick={() => act({ action: "claim" }, "Chat is yours")}>
                              Take chat
                            </button>
                          )}
                          {chat.studentPhone && chat.status !== "bot" && (
                            <button className="sl-btn-ghost" disabled={busy} onClick={call}>
                              <FiPhone size={15} /> Call
                            </button>
                          )}
                          {(chat.status === "waiting" || chat.status === "assigned") && (
                            <select
                              className="sl-select"
                              value=""
                              disabled={busy}
                              onChange={(e) => e.target.value && act({ action: "transfer", agentId: e.target.value }, "Chat transferred")}
                            >
                              <option value="">Transfer to…</option>
                              {!isMine && <option value="me">Me</option>}
                              {(list?.agents || [])
                                .filter((a) => a._id !== chat.agentId && a._id !== me?.id)
                                .map((a) => (
                                  <option key={a._id} value={a._id}>
                                    {a.name}
                                    {a.online ? " (online)" : ""}
                                  </option>
                                ))}
                            </select>
                          )}
                          {chat.status !== "closed" && (isMine || me?.isSuper) && chat.status !== "bot" && (
                            <button className="sl-btn-ghost" disabled={busy} onClick={close}>
                              <FiX size={15} /> Close
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="sp-msgs" ref={scroller}>
                        {messages.map((m) =>
                          m.from === "system" ? (
                            <div key={m._id} className="sp-row center">
                              <span className="sp-sys">{m.text}</span>
                            </div>
                          ) : (
                            <div key={m._id} className={`sp-row ${m.from === "student" ? "" : "right"}`}>
                              <div className={`sp-bubble ${m.from === "bot" ? "bot" : ""}`}>
                                {m.text}
                                {m.linkUrl && (
                                  <div className="sp-opts">
                                    Link: {m.linkLabel || m.linkUrl}
                                  </div>
                                )}
                                {m.options?.length > 0 && (
                                  <div className="sp-opts">Options: {m.options.map((o) => o.title).join(" / ")}</div>
                                )}
                                <div className="sp-meta">
                                  {m.from === "bot" ? "Bot" : m.from === "agent" ? m.senderName : chat.studentName} · {clock(m.createdAt)}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                        {chat.status === "closed" && chat.rating && (
                          <div className="sp-row center">
                            <span className="sp-sys">Student rated this chat {chat.rating}/5</span>
                          </div>
                        )}
                      </div>

                      {canReply ? (
                        <form className="sp-reply" onSubmit={send}>
                          <textarea
                            rows={2}
                            placeholder={chat.status === "waiting" ? "Reply to take this chat…" : "Type a reply…"}
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) send(e);
                            }}
                          />
                          <button className="sl-btn" disabled={busy || !reply.trim()} type="submit">
                            <FiSend size={15} /> Send
                          </button>
                        </form>
                      ) : (
                        <div className="sp-reply sl-faint" style={{ fontSize: "0.82rem" }}>
                          {chat.status === "closed"
                            ? "This chat is closed."
                            : chat.status === "bot"
                              ? "The student is still talking to the bot."
                              : "This chat is with another agent. Transfer it to yourself to reply."}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="sp-info">
                  {chat && (
                    <>
                      <div className="sl-card">
                        <h6 className="sl-card-title">Student</h6>
                        {student ? (
                          <>
                            <div className="sl-kv"><span>Name</span><span>{student.name}</span></div>
                            <div className="sl-kv"><span>Phone</span><span>{student.phone || "—"}</span></div>
                            <div className="sl-kv"><span>Email</span><span>{student.email || "—"}</span></div>
                            <div className="sl-kv"><span>Class</span><span>{student.className || "—"}</span></div>
                            <div className="sl-kv"><span>Account</span><span>{student.active ? "Active" : "Inactive"}</span></div>
                            <div className="sl-kv"><span>Joined</span><span>{fullDate(student.joinedAt)}</span></div>
                            <div className="sl-kv"><span>Earlier chats</span><span>{student.previousChats}</span></div>
                          </>
                        ) : (
                          <p className="sl-faint" style={{ fontSize: "0.85rem" }}>Student account not found.</p>
                        )}
                      </div>

                      {student && (
                        <div className="sl-card">
                          <h6 className="sl-card-title">
                            Courses <small>{student.enrollments.length}</small>
                          </h6>
                          {!student.enrollments.length && <p className="sl-faint" style={{ fontSize: "0.85rem", margin: 0 }}>No enrollments.</p>}
                          {student.enrollments.map((e) => (
                            <div key={e._id} className="sp-note">
                              <div style={{ fontWeight: 600, color: "#0f172a" }}>{e.course}</div>
                              <div className="sl-faint">
                                {e.status} · {e.type === "paid" ? `₹${e.amountPaid}` : "Free"} · {fullDate(e.createdAt)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="sl-card">
                        <h6 className="sl-card-title">Notes</h6>
                        <p className="sl-hint" style={{ marginTop: -6 }}>Only the support team sees these.</p>
                        {chat.notes.map((n) => (
                          <div key={n._id} className="sp-note">
                            <div style={{ color: "#0f172a" }}>{n.text}</div>
                            <div className="sl-faint">{n.byName} · {fullDate(n.createdAt)}</div>
                          </div>
                        ))}
                        <textarea
                          className="sl-input"
                          rows={2}
                          placeholder="Add a note"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          style={{ marginTop: 8 }}
                        />
                        <button className="sl-btn-ghost" style={{ marginTop: 8 }} disabled={busy || !note.trim()} onClick={addNote}>
                          Save note
                        </button>
                      </div>

                      <div className="sl-card">
                        <h6 className="sl-card-title">Timeline</h6>
                        <div className="sl-kv"><span>Started</span><span>{fullDate(chat.createdAt)}</span></div>
                        <div className="sl-kv"><span>Asked for agent</span><span>{fullDate(chat.handoverAt)}</span></div>
                        <div className="sl-kv"><span>Taken</span><span>{fullDate(chat.assignedAt)}</span></div>
                        <div className="sl-kv"><span>First reply</span><span>{fullDate(chat.firstReplyAt)}</span></div>
                        <div className="sl-kv"><span>Closed</span><span>{fullDate(chat.closedAt)}</span></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
