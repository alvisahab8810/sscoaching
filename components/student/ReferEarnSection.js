import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdContentCopy, MdShare, MdAccountBalanceWallet } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const day = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "");
const REASON = { referral: "Referral reward", welcome: "Joining reward", purchase: "Used for a course", admin: "Adjustment" };

/**
 * Student dashboard: their referral code, ways to share it, friends who
 * joined, and the wallet the rewards go into.
 */
export default function ReferEarnSection() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);

  const load = async () => {
    setFailed(false);
    try {
      const res = await fetch("/api/referral", { headers: { Authorization: `Bearer ${localStorage.getItem("studentToken")}` } });
      const d = await res.json();
      if (!d.success) throw new Error(d.message);
      setData(d);
    } catch {
      setFailed(true);
    }
  };

  useEffect(() => {
    load();
    try {
      const saved = localStorage.getItem("ss_ref");
      if (saved) setCode(saved);
    } catch {}
  }, []);

  const copy = (text, label) => {
    navigator.clipboard?.writeText(text).then(
      () => toast.success(`${label} copied`),
      () => toast.error("Could not copy")
    );
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "SS Coaching", text: data.shareText });
      } catch {}
    } else copy(data.shareText, "Invite message");
  };

  const apply = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setApplying(true);
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("studentToken")}` },
        body: JSON.stringify({ code }),
      });
      const d = await res.json();
      if (!d.success) throw new Error(d.message);
      toast.success("Referral code added");
      try { localStorage.removeItem("ss_ref"); } catch {}
      load();
    } catch (err) {
      toast.error(err.message || "Could not add the code");
    } finally {
      setApplying(false);
    }
  };

  if (failed) {
    return (
      <div className="re-wrap">
        <h1 className="re-title">Refer &amp; Earn</h1>
        <div className="re-card re-empty">
          Could not load your referral details.
          <button className="re-btn re-btn-outline" style={{ marginTop: 12 }} onClick={load}>Try again</button>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="re-wrap">
        <h1 className="re-title">Refer &amp; Earn</h1>
        <div className="re-card re-empty">Loading…</div>
        <style jsx>{styles}</style>
      </div>
    );
  }

  return (
    <div className="re-wrap">
      <h1 className="re-title">Refer &amp; Earn</h1>
      <p className="re-sub">
        Invite friends to SS Coaching. When a friend joins with your code and buys a course, you get {inr(data.referrerReward)} in your wallet.
      </p>

      <div className="re-grid">
        <div className="re-card re-hero">
          {!data.enabled && <div className="re-note">Refer and earn is paused right now. Rewards already in your wallet can still be used.</div>}
          <div className="re-label">Your referral code</div>
          <div className="re-code-row">
            <span className="re-code">{data.code}</span>
            <button className="re-icon" title="Copy code" onClick={() => copy(data.code, "Code")}>
              <MdContentCopy size={18} />
            </button>
          </div>
          <div className="re-link">
            <span>{data.link}</span>
            <button className="re-link-copy" onClick={() => copy(data.link, "Link")}>Copy link</button>
          </div>
          <div className="re-share">
            <a className="re-btn re-btn-wa" href={`https://wa.me/?text=${encodeURIComponent(data.shareText)}`} target="_blank" rel="noreferrer">
              <FaWhatsapp size={17} /> Share on WhatsApp
            </a>
            <button className="re-btn re-btn-outline" onClick={share}>
              <MdShare size={17} /> More options
            </button>
          </div>
        </div>

        <div className="re-card re-wallet">
          <div className="re-wallet-head">
            <span className="re-wallet-icon"><MdAccountBalanceWallet size={20} /></span>
            <div>
              <div className="re-label" style={{ margin: 0 }}>Wallet balance</div>
              <div className="re-balance">{inr(data.walletBalance)}</div>
            </div>
          </div>
          <p className="re-small">Use it at checkout when you buy a course. Wallet money cannot be withdrawn or transferred.</p>
          <div className="re-stats">
            <div><b>{data.stats.joined}</b><span>Friends joined</span></div>
            <div><b>{data.stats.purchased}</b><span>Bought a course</span></div>
            <div><b>{inr(data.stats.earned)}</b><span>Earned</span></div>
          </div>
        </div>
      </div>

      <div className="re-card">
        <div className="re-card-title">How it works</div>
        <ol className="re-steps">
          <li><b>Share your code</b> with a friend on WhatsApp or anywhere.</li>
          <li><b>Your friend signs up</b> on the website or app and enters your code.</li>
          <li>
            <b>They buy a course</b> and {inr(data.referrerReward)} is added to your wallet
            {data.friendReward > 0 ? `, and ${inr(data.friendReward)} to theirs` : ""}.
          </li>
        </ol>
        <p className="re-small" style={{ margin: 0 }}>
          The reward is paid once per friend, on their first purchase{data.minPurchase > 1 ? ` of ${inr(data.minPurchase)} or more` : ""}.
        </p>
      </div>

      {(data.canApply || data.referredBy) && (
        <div className="re-card">
          <div className="re-card-title">Joined with a friend&apos;s code?</div>
          {data.referredBy ? (
            <p className="re-small" style={{ margin: 0 }}>You joined with {data.referredBy}&apos;s code.</p>
          ) : (
            <form className="re-apply" onSubmit={apply}>
              <input
                className="re-input"
                placeholder="Enter referral code"
                maxLength={12}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase().replace(/\s/g, ""))}
              />
              <button className="re-btn re-btn-primary" disabled={applying || !code}>
                {applying ? "Adding…" : "Add code"}
              </button>
            </form>
          )}
        </div>
      )}

      <div className="re-grid">
        <div className="re-card">
          <div className="re-card-title">Friends</div>
          {!data.friends.length ? (
            <p className="re-empty-sm">No friends have joined with your code yet.</p>
          ) : (
            data.friends.map((f, i) => (
              <div key={i} className="re-row">
                <div>
                  <div className="re-row-title">{f.name}</div>
                  <div className="re-small">Joined {day(f.joinedAt)}</div>
                </div>
                <span className={`re-pill ${f.purchased ? "re-pill-on" : ""}`}>{f.purchased ? "Reward earned" : "Not bought yet"}</span>
              </div>
            ))
          )}
        </div>

        <div className="re-card">
          <div className="re-card-title">Wallet history</div>
          {!data.txns.length ? (
            <p className="re-empty-sm">No wallet activity yet.</p>
          ) : (
            data.txns.map((t) => (
              <div key={t._id} className="re-row">
                <div style={{ minWidth: 0 }}>
                  <div className="re-row-title">{REASON[t.reason] || t.reason}</div>
                  <div className="re-small">{t.note ? `${t.note} · ` : ""}{day(t.createdAt)}</div>
                </div>
                <span className={`re-amt ${t.kind === "credit" ? "re-amt-in" : "re-amt-out"}`}>
                  {t.kind === "credit" ? "+" : "−"}{inr(t.amount)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
}

const styles = `
  .re-wrap { max-width: 1000px; }
  .re-title { font-size: 1.5rem; font-weight: 800; color: #0f1f3d; margin: 0 0 4px; }
  .re-sub { font-size: 0.9rem; color: #6b7a99; margin: 0 0 20px; }
  .re-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; }
  .re-card { background: #fff; border: 1.5px solid #e2e5f8; border-radius: 14px; padding: 20px; margin-bottom: 16px; }
  .re-empty { text-align: center; color: #8491a8; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; }
  .re-card-title { font-size: 0.95rem; font-weight: 800; color: #0f1f3d; margin-bottom: 12px; }
  .re-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #8491a8; margin-bottom: 8px; }
  .re-note { background: #fef3c7; color: #92400e; font-size: 0.8rem; border-radius: 8px; padding: 8px 12px; margin-bottom: 12px; }
  .re-hero { background: #faf8ff; border-color: #ddd6fe; }
  .re-code-row { display: flex; align-items: center; gap: 10px; }
  .re-code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 1.7rem; font-weight: 800; letter-spacing: 0.12em; color: #4c1d95; background: #fff; border: 2px dashed #c4b5fd; border-radius: 10px; padding: 6px 16px; }
  .re-icon { width: 40px; height: 40px; border-radius: 10px; border: 1.5px solid #ddd6fe; background: #fff; color: #6c47d4; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
  .re-link { display: flex; align-items: center; gap: 10px; margin-top: 12px; font-size: 0.8rem; color: #6b7a99; background: #fff; border: 1px solid #e2e5f8; border-radius: 8px; padding: 8px 12px; }
  .re-link span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .re-link-copy { background: none; border: none; color: #6c47d4; font-weight: 700; font-size: 0.78rem; cursor: pointer; white-space: nowrap; }
  .re-share { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; }
  .re-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 10px 16px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; cursor: pointer; text-decoration: none; border: none; }
  .re-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .re-btn-wa { background: #25d366; color: #fff; flex: 1; }
  .re-btn-outline { background: #fff; color: #6c47d4; border: 1.5px solid #ddd6fe; flex: 1; }
  .re-btn-primary { background: #6c47d4; color: #fff; }
  .re-wallet-head { display: flex; align-items: center; gap: 12px; }
  .re-wallet-icon { width: 42px; height: 42px; border-radius: 12px; background: #ecfdf5; color: #059669; display: inline-flex; align-items: center; justify-content: center; }
  .re-balance { font-size: 1.7rem; font-weight: 800; color: #0f1f3d; line-height: 1.2; }
  .re-small { font-size: 0.76rem; color: #8491a8; margin: 10px 0 0; line-height: 1.5; }
  .re-row .re-small { margin: 2px 0 0; }
  .re-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 16px; }
  .re-stats div { background: #f8f9ff; border-radius: 10px; padding: 10px; text-align: center; }
  .re-stats b { display: block; font-size: 1.05rem; color: #0f1f3d; }
  .re-stats span { font-size: 0.7rem; color: #8491a8; }
  .re-steps { margin: 0 0 12px; padding-left: 20px; font-size: 0.86rem; color: #374151; line-height: 1.8; }
  .re-apply { display: flex; gap: 10px; flex-wrap: wrap; }
  .re-input { flex: 1 1 200px; padding: 10px 12px; border: 1.5px solid #e2e5f8; border-radius: 8px; font-size: 0.9rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; outline: none; }
  .re-input:focus { border-color: #6c47d4; }
  .re-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 0; border-top: 1px solid #f0f1fa; }
  .re-row:first-of-type { border-top: none; }
  .re-row-title { font-size: 0.86rem; font-weight: 700; color: #0f1f3d; }
  .re-pill { font-size: 0.7rem; font-weight: 700; padding: 3px 10px; border-radius: 100px; background: #f1f5f9; color: #64748b; white-space: nowrap; }
  .re-pill-on { background: #dcfce7; color: #15803d; }
  .re-amt { font-weight: 800; font-size: 0.9rem; white-space: nowrap; }
  .re-amt-in { color: #059669; }
  .re-amt-out { color: #b91c1c; }
  .re-empty-sm { font-size: 0.82rem; color: #9ca3af; margin: 0; }
  @media (max-width: 860px) {
    .re-grid { grid-template-columns: 1fr; gap: 0; }
    .re-code { font-size: 1.35rem; }
  }
`;
