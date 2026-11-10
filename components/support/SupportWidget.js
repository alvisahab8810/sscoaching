import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "sonner";
import { FiX, FiSend, FiChevronRight, FiArrowUpRight, FiHeadphones, FiGrid, FiStar, FiChevronDown } from "react-icons/fi";

/**
 * Support chat for logged-in students, bottom-left on every website page
 * (the announcement bell sits bottom-right). The bot answers first; the
 * student can ask for a person at any point.
 */

const AGENT_OPTION = "__agent";
const MENU_OPTION = "__menu";

const readStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const readFirstName = () => {
  try {
    const info = JSON.parse(readStorage("studentInfo") || "null");
    return String(info?.name || "").trim().split(/\s+/)[0] || "";
  } catch {
    return "";
  }
};

const clock = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
const dayLabel = (d) => {
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};
const initials = (name) =>
  String(name || "S")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export default function SupportWidget() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(null); // the student's message while it is being sent
  const [intro, setIntro] = useState(null); // { greeting, options } before any chat exists
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const lastAt = useRef(null);
  const chatId = useRef(null);
  const scroller = useRef(null);
  const input = useRef(null);

  // Logging in or out happens on other pages, so check on every route change.
  useEffect(() => {
    const t = readStorage("studentToken");
    setToken(t);
    setName(readFirstName());
    if (!t) {
      // Logged out: forget the last student's chat.
      chatId.current = null;
      setChat(null);
      setMessages([]);
      setIntro(null);
      setLoaded(false);
    }
    // A visitor who clicked the chat and was sent to log in gets it opened
    // again as soon as they are back.
    try {
      if (t && sessionStorage.getItem("swOpenAfterLogin")) {
        sessionStorage.removeItem("swOpenAfterLogin");
        setOpen(true);
      }
    } catch {}
  }, [router.asPath]);

  const call = useCallback(
    async (method, query = "", body) => {
      const res = await fetch(`/api/support/chat${query}`, {
        method,
        headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.status === 401 || res.status === 403) {
        setToken(null);
        throw new Error("auth");
      }
      const data = await res.json().catch(() => ({}));
      if (!data.success) throw new Error(data.message || "Something went wrong");
      return data;
    },
    [token]
  );

  // Takes a server response and merges it in. A different chat id means a new
  // chat started, so the old messages go.
  const apply = useCallback((data, replace) => {
    if (data.chat === null) {
      chatId.current = null;
      lastAt.current = null;
      setChat(null);
      setMessages([]);
      setIntro({ greeting: data.greeting, options: data.options || [] });
      return;
    }
    if (!data.chat) return;
    const fresh = replace || data.chat._id !== chatId.current;
    chatId.current = data.chat._id;
    setChat(data.chat);
    setIntro(null);
    setMessages((prev) => {
      const base = fresh ? [] : prev;
      const seen = new Set(base.map((m) => m._id));
      const next = [...base, ...(data.messages || []).filter((m) => !seen.has(m._id))];
      lastAt.current = next[next.length - 1]?.createdAt || null;
      return next;
    });
  }, []);

  const poll = useCallback(
    async (first) => {
      try {
        const after = !first && lastAt.current ? `after=${encodeURIComponent(lastAt.current)}&` : "";
        const data = await call("GET", `?${after}${open ? "seen=1" : ""}`);
        apply(data, first);
        setLoaded(true);
      } catch {}
    },
    [call, apply, open]
  );

  // Full load when the student logs in or opens the panel; then new messages
  // every 3s while open, or every 20s in the background for the unread badge.
  useEffect(() => {
    if (!token) return;
    poll(true);
  }, [token, open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!token) return;
    if (!open && !chatId.current) return;
    const iv = setInterval(() => poll(false), open ? 3000 : 20000);
    return () => clearInterval(iv);
  }, [token, open, poll, chat?._id]);

  useEffect(() => {
    if (open && scroller.current) scroller.current.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, open, intro, pending, busy]);

  // The "Need help?" label shows itself once per browser session, a few
  // seconds after the page loads, then hides again.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("swTipShown")) return;
      sessionStorage.setItem("swTipShown", "1");
    } catch {}
    const show = setTimeout(() => setShowTip(true), 2500);
    const hide = setTimeout(() => setShowTip(false), 9000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (open) setShowTip(false);
  }, [open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const post = async (body, shown) => {
    if (busy) return false;
    setBusy(true);
    if (shown) setPending(shown);
    try {
      const data = await call("POST", "", body);
      apply(data, false);
      return true;
    } catch (err) {
      if (err.message !== "auth") toast.error(err.message);
      return false;
    } finally {
      setPending(null);
      setBusy(false);
    }
  };

  const send = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t || busy) return;
    setText("");
    if (!(await post({ action: "text", text: t }, t))) setText(t);
    input.current?.focus();
  };

  const pick = (o) => post({ action: "option", id: o.id }, o.title);

  const endChat = () => {
    if (window.confirm("End this chat?")) post({ action: "close" });
  };

  // Visitors see the button too; the chat itself needs a login, so the
  // panel asks for one. Hidden on the login page itself.
  if (router.pathname === "/student/login") return null;

  const goLogin = () => {
    try {
      sessionStorage.setItem("swOpenAfterLogin", "1");
    } catch {}
    router.push(`/student/login?next=${encodeURIComponent(router.asPath)}`);
  };

  const status = chat?.status || "bot";
  const closed = status === "closed";

  // Only the newest set of options is shown, and only while the bot is talking.
  let liveOptions = intro ? intro.options : null;
  if (chat?.status === "bot") {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].options?.length) {
        liveOptions = messages[i].options;
        break;
      }
      if (messages[i].from === "student") break;
    }
  }
  if (busy) liveOptions = null;

  const headerSub = !token
    ? "Log in to chat with our team"
    : status === "assigned"
      ? `You are chatting with ${chat.agentName || "our team"}`
      : status === "waiting"
        ? "Connecting you to our team"
        : closed
          ? "This conversation has ended"
          : "We usually reply in a few minutes";

  // Messages grouped by sender so the avatar and time show once per group,
  // with a date line whenever the day changes.
  const rows = [];
  messages.forEach((m, i) => {
    const prev = messages[i - 1];
    const next = messages[i + 1];
    if (!prev || new Date(prev.createdAt).toDateString() !== new Date(m.createdAt).toDateString()) {
      rows.push({ type: "day", key: `d-${m._id}`, label: dayLabel(m.createdAt) });
    }
    const sameAs = (o) => o && o.from === m.from && o.from !== "system" && (o.senderName || "") === (m.senderName || "");
    rows.push({
      type: "msg",
      key: m._id,
      m,
      first: !sameAs(prev) || rows[rows.length - 1]?.type === "day",
      last: !sameAs(next) || new Date(next.createdAt).toDateString() !== new Date(m.createdAt).toDateString(),
    });
  });

  const renderLink = (m) => {
    if (!m.linkUrl) return null;
    const label = m.linkLabel || "Open link";
    const inner = (
      <>
        {label} <FiArrowUpRight size={14} />
      </>
    );
    return m.linkUrl.startsWith("/") ? (
      <Link href={m.linkUrl} className="sw-link" onClick={() => window.innerWidth <= 520 && setOpen(false)}>
        {inner}
      </Link>
    ) : (
      <a href={m.linkUrl} target="_blank" rel="noopener noreferrer" className="sw-link">
        {inner}
      </a>
    );
  };

  const botAvatar = <span className="sw-av brand">SS</span>;

  return (
    <>
      <style jsx global>{`
        .sw-root {
          --sw-brand: #5641ce;
          --sw-brand-dark: #2e2468;
          --sw-ink: #0f172a;
          --sw-muted: #64748b;
          --sw-line: #e7e9f0;
          --sw-soft: #f6f7fb;
          font-size: 14px;
          line-height: 1.5;
        }
        .sw-launch {
          position: fixed;
          left: 24px;
          bottom: 28px;
          z-index: 9990;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(145deg, #6a55e0, var(--sw-brand) 55%, #4330b3);
          color: #fff;
          box-shadow: 0 10px 28px rgba(46, 36, 104, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .sw-launch:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(46, 36, 104, 0.42);
        }
        .sw-launch:not(.is-open) {
          animation: sw-nudge 6s ease-in-out 2s infinite;
        }
        .sw-launch:not(.is-open)::before,
        .sw-launch:not(.is-open)::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(86, 65, 206, 0.45);
          animation: sw-ring 2.6s ease-out infinite;
          pointer-events: none;
        }
        .sw-launch:not(.is-open)::after {
          animation-delay: 1.3s;
        }
        @keyframes sw-ring {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.65);
            opacity: 0;
          }
        }
        @keyframes sw-nudge {
          0%,
          88%,
          100% {
            transform: translateY(0) rotate(0);
          }
          90% {
            transform: translateY(-4px) rotate(-8deg);
          }
          93% {
            transform: translateY(-4px) rotate(8deg);
          }
          96% {
            transform: translateY(-2px) rotate(-4deg);
          }
        }
        .sw-launch-icon {
          display: flex;
          transition: transform 0.25s ease;
        }
        .sw-launch.is-open .sw-launch-icon {
          transform: rotate(90deg);
        }
        .sw-launch-icon .sw-bdot {
          animation: sw-bdot 1.4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .sw-launch-icon .sw-bdot:nth-of-type(2) {
          animation-delay: 0.18s;
        }
        .sw-launch-icon .sw-bdot:nth-of-type(3) {
          animation-delay: 0.36s;
        }
        @keyframes sw-bdot {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-2.5px);
          }
        }
        .sw-tip {
          position: fixed;
          left: 94px;
          bottom: 40px;
          z-index: 9990;
          background: #fff;
          color: #0f172a;
          border-radius: 12px;
          padding: 8px 14px;
          font-size: 13.5px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .sw-tip::before {
          content: "";
          position: absolute;
          left: -5px;
          top: 50%;
          width: 10px;
          height: 10px;
          background: #fff;
          transform: translateY(-50%) rotate(45deg);
        }
        .sw-tip small {
          display: block;
          font-weight: 500;
          color: #64748b;
          font-size: 11.5px;
        }
        .sw-tip.show,
        .sw-launch:hover + .sw-tip {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .sw-launch,
          .sw-launch::before,
          .sw-launch::after,
          .sw-launch-icon .sw-bdot {
            animation: none !important;
          }
        }
        .sw-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          min-width: 21px;
          height: 21px;
          padding: 0 6px;
          border-radius: 999px;
          background: #e11d48;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
        }

        .sw-panel {
          position: fixed;
          left: 24px;
          bottom: 100px;
          z-index: 9991;
          width: 384px;
          height: 620px;
          max-height: calc(100vh - 124px);
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22), 0 2px 8px rgba(15, 23, 42, 0.06);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: sw-in 0.22s ease-out;
          transform-origin: bottom left;
        }
        @keyframes sw-in {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (max-width: 520px) {
          .sw-panel {
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            width: auto;
            height: auto;
            max-height: none;
            border-radius: 0;
          }
          .sw-launch {
            left: 16px;
            bottom: 18px;
          }
          .sw-launch.is-open {
            display: none;
          }
          .sw-tip {
            left: 84px;
            bottom: 30px;
          }
        }

        .sw-head {
          background: linear-gradient(135deg, var(--sw-brand-dark) 0%, #3d2e95 55%, var(--sw-brand) 100%);
          color: #fff;
          padding: 16px 16px 16px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .sw-head-av {
          position: relative;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #fff;
          color: var(--sw-brand);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sw-head-av.agent {
          background: #ece9fb;
        }
        .sw-online {
          position: absolute;
          right: 0;
          bottom: 1px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #22c55e;
          border: 2px solid #3a2c8c;
        }
        .sw-online.off {
          background: #94a3b8;
        }
        .sw-head-text {
          flex: 1;
          min-width: 0;
        }
        .sw-head-title {
          font-weight: 700;
          font-size: 15.5px;
          letter-spacing: 0.1px;
        }
        .sw-head-sub {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.78);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sw-iconbtn {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: none;
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sw-iconbtn:hover {
          background: rgba(255, 255, 255, 0.22);
        }

        .sw-body {
          flex: 1;
          overflow-y: auto;
          background: var(--sw-soft);
          padding: 6px 16px 14px;
          scrollbar-width: thin;
        }
        .sw-welcome {
          text-align: center;
          padding: 18px 8px 10px;
        }
        .sw-welcome-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--sw-ink);
        }
        .sw-welcome-sub {
          color: var(--sw-muted);
          font-size: 13px;
          margin-top: 2px;
        }
        .sw-day {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #94a3b8;
          font-size: 11.5px;
          font-weight: 600;
          margin: 14px 0 10px;
        }
        .sw-day::before,
        .sw-day::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--sw-line);
        }
        .sw-sys {
          text-align: center;
          color: var(--sw-muted);
          font-size: 12px;
          margin: 10px 24px;
        }
        .sw-sys span {
          display: inline-block;
          background: #eceef5;
          border-radius: 999px;
          padding: 4px 12px;
        }

        .sw-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          margin-top: 3px;
        }
        .sw-row.first {
          margin-top: 12px;
        }
        .sw-row.me {
          justify-content: flex-end;
        }
        .sw-av {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          font-size: 10.5px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: #ece9fb;
          color: var(--sw-brand);
        }
        .sw-av.brand {
          background: var(--sw-brand);
          color: #fff;
        }
        .sw-av-gap {
          width: 28px;
          flex-shrink: 0;
        }
        .sw-col {
          max-width: 78%;
          display: flex;
          flex-direction: column;
        }
        .sw-row.me .sw-col {
          align-items: flex-end;
        }
        .sw-who {
          font-size: 11.5px;
          color: var(--sw-muted);
          font-weight: 600;
          margin: 0 0 3px 2px;
        }
        .sw-bubble {
          padding: 10px 14px;
          border-radius: 16px;
          background: #fff;
          color: var(--sw-ink);
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
          border: 1px solid #edeef3;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .sw-row:not(.me) .sw-bubble.tail {
          border-bottom-left-radius: 5px;
        }
        .sw-row.me .sw-bubble {
          background: var(--sw-brand);
          border-color: var(--sw-brand);
          color: #fff;
          box-shadow: none;
        }
        .sw-row.me .sw-bubble.tail {
          border-bottom-right-radius: 5px;
        }
        .sw-bubble.pending {
          opacity: 0.6;
        }
        .sw-time {
          font-size: 11px;
          color: #94a3b8;
          margin: 4px 4px 0;
        }
        .sw-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          background: #f1eefc;
          color: var(--sw-brand) !important;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none !important;
          white-space: nowrap;
        }
        .sw-link:hover {
          background: #e6e0fa;
        }

        .sw-typing {
          display: inline-flex;
          gap: 4px;
          padding: 13px 14px;
        }
        .sw-typing i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a5a9bb;
          animation: sw-dot 1.2s infinite ease-in-out;
        }
        .sw-typing i:nth-child(2) {
          animation-delay: 0.15s;
        }
        .sw-typing i:nth-child(3) {
          animation-delay: 0.3s;
        }
        @keyframes sw-dot {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .sw-menu {
          margin: 12px 0 4px 36px;
          background: #fff;
          border: 1px solid var(--sw-line);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
          animation: sw-in 0.2s ease-out;
        }
        .sw-menu-head {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #94a3b8;
          padding: 10px 14px 6px;
        }
        .sw-opt {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
          border-top: 1px solid #f1f2f6;
          background: #fff;
          padding: 11px 14px;
          text-align: left;
          color: var(--sw-ink);
          font-size: 13.5px;
          font-weight: 500;
          transition: background 0.15s;
        }
        .sw-opt:first-of-type {
          border-top: none;
        }
        .sw-opt:hover {
          background: #f7f5fe;
        }
        .sw-opt-label {
          flex: 1;
        }
        .sw-opt-arrow {
          color: #b4b8c8;
          flex-shrink: 0;
        }
        .sw-opt:hover .sw-opt-arrow {
          color: var(--sw-brand);
        }
        .sw-opt.special {
          color: var(--sw-brand);
          font-weight: 600;
        }
        .sw-opt-ic {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f1eefc;
          color: var(--sw-brand);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sw-foot {
          border-top: 1px solid var(--sw-line);
          background: #fff;
          padding: 12px 14px 10px;
          flex-shrink: 0;
        }
        .sw-form {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--sw-soft);
          border: 1px solid var(--sw-line);
          border-radius: 14px;
          padding: 5px 5px 5px 14px;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .sw-form:focus-within {
          border-color: var(--sw-brand);
          box-shadow: 0 0 0 3px rgba(86, 65, 206, 0.12);
          background: #fff;
        }
        .sw-form input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          min-width: 0;
          padding: 7px 0;
          color: var(--sw-ink);
        }
        .sw-form input:focus {
          outline: none;
        }
        .sw-send {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: none;
          background: var(--sw-brand);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.15s;
        }
        .sw-send:disabled {
          opacity: 0.35;
        }
        .sw-foot-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          font-size: 11.5px;
          color: #94a3b8;
        }
        .sw-end {
          background: none;
          border: none;
          color: var(--sw-muted);
          font-size: 12px;
          font-weight: 600;
          padding: 0;
        }
        .sw-end:hover {
          color: #e11d48;
        }

        .sw-rate {
          text-align: center;
          padding: 4px 0 2px;
        }
        .sw-rate-title {
          font-weight: 700;
          color: var(--sw-ink);
          font-size: 14.5px;
        }
        .sw-rate-sub {
          color: var(--sw-muted);
          font-size: 12.5px;
        }
        .sw-stars {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin: 8px 0 12px;
        }
        .sw-star {
          background: none;
          border: none;
          padding: 2px;
          color: #cbd0dd;
          transition: transform 0.1s, color 0.1s;
        }
        .sw-star:hover {
          transform: scale(1.12);
        }
        .sw-star.on {
          color: #f59e0b;
        }
        .sw-star.on svg {
          fill: #f59e0b;
        }
        .sw-new {
          width: 100%;
          border: none;
          border-radius: 12px;
          background: var(--sw-brand);
          color: #fff;
          font-weight: 600;
          padding: 11px;
          font-size: 14px;
        }
        .sw-new:hover {
          background: #4834b5;
        }
        .sw-guest {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 28px 28px 32px;
          background: var(--sw-soft);
        }
        .sw-guest-av {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--sw-brand);
          color: #fff;
          font-weight: 800;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          box-shadow: 0 8px 22px rgba(86, 65, 206, 0.3);
        }
        .sw-guest-text {
          color: var(--sw-muted);
          font-size: 13.5px;
          margin: 6px 0 20px;
        }
        .sw-guest-small {
          color: #94a3b8;
          font-size: 12px;
          margin: 12px 0 0;
        }
      `}</style>

      <div className="sw-root">
        {open && (
          <div className="sw-panel" role="dialog" aria-label="Support chat">
            <div className="sw-head">
              <div className={`sw-head-av ${status === "assigned" ? "agent" : ""}`}>
                {status === "assigned" ? initials(chat.agentName) : "SS"}
                <span className={`sw-online ${closed ? "off" : ""}`} />
              </div>
              <div className="sw-head-text">
                <div className="sw-head-title">{status === "assigned" && chat.agentName ? chat.agentName : "SS Coaching Support"}</div>
                <div className="sw-head-sub">{headerSub}</div>
              </div>
              <button className="sw-iconbtn" onClick={() => setOpen(false)} aria-label="Minimise chat" title="Minimise">
                <FiChevronDown size={20} />
              </button>
            </div>

            {!token ? (
              <div className="sw-guest">
                <div className="sw-guest-av">SS</div>
                <div className="sw-welcome-title">Hi there</div>
                <p className="sw-guest-text">
                  Have a question about admission, exams, classes or your course? Log in to chat with us. It lets our team see your
                  details and help you faster.
                </p>
                <button className="sw-new" onClick={goLogin}>
                  Log in to start chatting
                </button>
                <p className="sw-guest-small">
                  New here? You can create an account on the same page.
                </p>
              </div>
            ) : (
            <>
            <div className="sw-body" ref={scroller}>
              {!loaded ? (
                <div className="sw-row first">
                  {botAvatar}
                  <div className="sw-bubble tail">
                    <span className="sw-typing">
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {intro && (
                    <>
                      <div className="sw-welcome">
                        <div className="sw-welcome-title">{name ? `Hi ${name}` : "Hi there"}</div>
                        <div className="sw-welcome-sub">Ask us anything about admissions, exams, classes or your courses.</div>
                      </div>
                      <div className="sw-row first">
                        {botAvatar}
                        <div className="sw-col">
                          <div className="sw-bubble tail">{intro.greeting}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {rows.map((r) => {
                    if (r.type === "day") return <div key={r.key} className="sw-day">{r.label}</div>;
                    const m = r.m;
                    if (m.from === "system") {
                      return (
                        <div key={r.key} className="sw-sys">
                          <span>{m.text}</span>
                        </div>
                      );
                    }
                    const mine = m.from === "student";
                    const avatar = m.from === "agent" ? <span className="sw-av">{initials(m.senderName)}</span> : botAvatar;
                    return (
                      <div key={r.key} className={`sw-row ${mine ? "me" : ""} ${r.first ? "first" : ""}`}>
                        {!mine && (r.last ? avatar : <span className="sw-av-gap" />)}
                        <div className="sw-col">
                          {!mine && r.first && m.from === "agent" && <div className="sw-who">{m.senderName}</div>}
                          <div className={`sw-bubble ${r.last ? "tail" : ""}`}>
                            {m.text}
                            {m.linkUrl && <div>{renderLink(m)}</div>}
                          </div>
                          {r.last && <div className="sw-time">{clock(m.createdAt)}</div>}
                        </div>
                      </div>
                    );
                  })}

                  {pending && (
                    <div className="sw-row me first">
                      <div className="sw-col">
                        <div className="sw-bubble tail pending">{pending}</div>
                      </div>
                    </div>
                  )}

                  {busy && pending && status === "bot" && (
                    <div className="sw-row first">
                      {botAvatar}
                      <div className="sw-bubble tail" style={{ padding: 0 }}>
                        <span className="sw-typing">
                          <i />
                          <i />
                          <i />
                        </span>
                      </div>
                    </div>
                  )}

                  {liveOptions?.length > 0 && (
                    <div className="sw-menu">
                      <div className="sw-menu-head">Choose a topic</div>
                      {liveOptions.map((o) => {
                        const special = o.id === AGENT_OPTION || o.id === MENU_OPTION;
                        return (
                          <button key={o.id} className={`sw-opt ${special ? "special" : ""}`} onClick={() => pick(o)}>
                            {o.id === AGENT_OPTION && (
                              <span className="sw-opt-ic">
                                <FiHeadphones size={15} />
                              </span>
                            )}
                            {o.id === MENU_OPTION && (
                              <span className="sw-opt-ic">
                                <FiGrid size={15} />
                              </span>
                            )}
                            <span className="sw-opt-label">{o.title}</span>
                            <FiChevronRight className="sw-opt-arrow" size={16} />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="sw-foot">
              {closed ? (
                <div className="sw-rate">
                  {chat.rating ? (
                    <>
                      <div className="sw-rate-title">Thank you for your feedback</div>
                      <div className="sw-stars" aria-label={`Rated ${chat.rating} out of 5`}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className={`sw-star ${n <= chat.rating ? "on" : ""}`}>
                            <FiStar size={22} />
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="sw-rate-title">How was your experience?</div>
                      <div className="sw-rate-sub">Your rating helps us serve you better.</div>
                      <div className="sw-stars" onMouseLeave={() => setHoverStar(0)}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            className={`sw-star ${n <= hoverStar ? "on" : ""}`}
                            disabled={busy}
                            onMouseEnter={() => setHoverStar(n)}
                            onClick={() => post({ action: "rate", rating: n })}
                            aria-label={`${n} star${n > 1 ? "s" : ""}`}
                          >
                            <FiStar size={26} />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  <button className="sw-new" disabled={busy} onClick={() => post({ action: "new" })}>
                    Start a new conversation
                  </button>
                </div>
              ) : (
                <>
                  <form className="sw-form" onSubmit={send}>
                    <input
                      ref={input}
                      placeholder={status === "assigned" ? "Write a message…" : "Type your question…"}
                      value={text}
                      maxLength={2000}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <button className="sw-send" type="submit" disabled={busy || !text.trim()} aria-label="Send">
                      <FiSend size={16} />
                    </button>
                  </form>
                  <div className="sw-foot-row">
                    <span>SS Coaching, Lucknow</span>
                    {chat && (
                      <button className="sw-end" onClick={endChat} disabled={busy}>
                        End chat
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            </>
            )}
          </div>
        )}

        <button
          className={`sw-launch ${open ? "is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close support chat" : "Open support chat"}
        >
          <span className="sw-launch-icon">
            {open ? (
              <FiX size={24} />
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5v-8Z"
                  fill="#fff"
                />
                <circle className="sw-bdot" cx="8.5" cy="9.6" r="1.25" fill="#5641ce" />
                <circle className="sw-bdot" cx="12" cy="9.6" r="1.25" fill="#5641ce" />
                <circle className="sw-bdot" cx="15.5" cy="9.6" r="1.25" fill="#5641ce" />
              </svg>
            )}
          </span>
          {!open && chat?.unread > 0 && <span className="sw-badge">{chat.unread}</span>}
        </button>
        {!open && (
          <div className={`sw-tip ${showTip || chat?.unread > 0 ? "show" : ""}`}>
            {chat?.unread > 0 ? "You have a new reply" : "Need help? Chat with us"}
            <small>{chat?.unread > 0 ? "Tap to read" : "We are here to help"}</small>
          </div>
        )}
      </div>
    </>
  );
}
