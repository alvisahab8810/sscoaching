import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { FiMessageSquare } from "react-icons/fi";

const INBOX = "/dashboard/admin/support";

// A short two-note chime made in the browser, so no sound file is needed.
// Browsers only allow it after the admin has clicked somewhere on the page.
function chime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    [880, 1175].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const at = ctx.currentTime + i * 0.16;
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(0.25, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(at);
      osc.stop(at + 0.32);
    });
    setTimeout(() => ctx.close(), 800);
  } catch {}
}

/**
 * Tells a support agent, on any dashboard page, when a student is waiting
 * for a person or has replied in one of their chats: a toast with a sound,
 * and a button at the bottom right while anyone is waiting.
 */
export default function SupportAlert({ session }) {
  const router = useRouter();
  const [state, setState] = useState(null);
  const prev = useRef(null);
  const allowed = session && (session.role === "super" || (session.permissions || []).includes("support"));
  const onInbox = router.pathname === INBOX;

  useEffect(() => {
    if (!allowed) return;
    let alive = true;

    const check = async () => {
      try {
        const res = await fetch("/api/admin/support/pending");
        if (!res.ok) return;
        const data = await res.json();
        if (!alive || !data.success) return;
        const before = prev.current;
        prev.current = data;
        setState(data);
        if (!before) return;

        const open = () => router.push(INBOX);
        if (data.waiting > before.waiting) {
          chime();
          toast(`${data.waiting === 1 ? "A student is" : `${data.waiting} students are`} waiting for support`, {
            description: "Open the Support Inbox to take the chat.",
            duration: 15000,
            action: onInbox ? undefined : { label: "Open", onClick: open },
          });
        } else if (data.unread > before.unread) {
          chime();
          toast("New message in your support chat", {
            duration: 8000,
            action: onInbox ? undefined : { label: "Open", onClick: open },
          });
        }
      } catch {}
    };

    check();
    const iv = setInterval(check, 8000);
    return () => {
      alive = false;
      clearInterval(iv);
    };
  }, [allowed, onInbox]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!allowed || onInbox || !state || !(state.waiting || state.unread)) return null;

  return (
    <>
      <style jsx global>{`
        .sa-pill {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 1050;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #5641ce;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 10px 18px 10px 12px;
          font-weight: 600;
          font-size: 0.88rem;
          box-shadow: 0 10px 28px rgba(46, 36, 104, 0.35);
          animation: sa-in 0.25s ease-out;
        }
        .sa-pill:hover {
          background: #4834b5;
        }
        .sa-ic {
          position: relative;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sa-ic::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          animation: sa-ring 1.8s ease-out infinite;
        }
        @keyframes sa-ring {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        @keyframes sa-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
      <button className="sa-pill" onClick={() => router.push(INBOX)}>
        <span className="sa-ic">
          <FiMessageSquare size={16} />
        </span>
        {state.waiting
          ? `${state.waiting} ${state.waiting === 1 ? "student" : "students"} waiting`
          : `${state.unread} unread ${state.unread === 1 ? "message" : "messages"}`}
      </button>
    </>
  );
}
