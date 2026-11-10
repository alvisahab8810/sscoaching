import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "sonner";
import { MdContentCopy, MdPersonAdd, MdShoppingCart, MdCardGiftcard, MdAndroid } from "react-icons/md";

const PLAY_URL = "https://play.google.com/store/apps/details?id=in.sscoaching.app";

/**
 * Landing page for a friend's invite link. It keeps the code in
 * localStorage so the register form (and the dashboard) can fill it in.
 */
export default function ReferLanding({ code, name, valid }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!valid) return;
    try {
      localStorage.setItem("ss_ref", code);
      setSaved(true);
    } catch {}
  }, [code, valid]);

  const copy = () =>
    navigator.clipboard?.writeText(code).then(
      () => toast.success("Code copied"),
      () => toast.error("Could not copy")
    );

  return (
    <>
      <Head>
        <title>{valid ? `${name || "A friend"} invited you to SS Coaching` : "Invite link"}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="rf-page">
        <div className="rf-card">
          <div className="rf-brand">SS Coaching</div>
          {valid ? (
            <>
              <h1 className="rf-title">{name ? `${name} invited you` : "You have been invited"}</h1>
              <p className="rf-sub">Join SS Coaching for NIOS classes, notes and test preparation. Sign up with this referral code.</p>

              <div className="rf-code-box">
                <span className="rf-code-label">Referral code</span>
                <div className="rf-code-row">
                  <span className="rf-code">{code}</span>
                  <button className="rf-copy" onClick={copy} title="Copy code"><MdContentCopy size={18} /></button>
                </div>
                {saved && <span className="rf-saved">This code will be filled in automatically when you sign up on this website.</span>}
              </div>

              <div className="rf-steps">
                <div className="rf-step"><MdPersonAdd size={20} /><span>Create your account with the code</span></div>
                <div className="rf-step"><MdShoppingCart size={20} /><span>Choose a course and enroll</span></div>
                <div className="rf-step"><MdCardGiftcard size={20} /><span>Your friend gets a reward for inviting you</span></div>
              </div>

              <Link href={`/student/login?ref=${code}`} className="rf-btn rf-btn-primary">Sign up on the website</Link>
              <a href={PLAY_URL} target="_blank" rel="noreferrer" className="rf-btn rf-btn-outline">
                <MdAndroid size={18} /> Get the Android app
              </a>
              <p className="rf-note">In the app, enter the code <b>{code}</b> on the sign-up screen.</p>
            </>
          ) : (
            <>
              <h1 className="rf-title">This invite link is not valid</h1>
              <p className="rf-sub">The referral code may be wrong, or the referral program is paused. You can still sign up and browse courses.</p>
              <Link href="/student/login" className="rf-btn rf-btn-primary">Go to sign up</Link>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .rf-page { min-height: 100vh; background: #f6f5fc; display: flex; align-items: center; justify-content: center; padding: 32px 16px; font-family: Inter, system-ui, sans-serif; }
        .rf-card { width: 100%; max-width: 460px; background: #fff; border: 1.5px solid #e2e5f8; border-radius: 18px; padding: 32px 28px; box-shadow: 0 10px 40px rgba(86, 65, 206, 0.08); }
        .rf-brand { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #5641ce; margin-bottom: 18px; }
        .rf-title { font-size: 1.5rem; font-weight: 800; color: #0f1f3d; margin: 0 0 8px; line-height: 1.25; }
        .rf-sub { font-size: 0.9rem; color: #6b7a99; margin: 0 0 22px; line-height: 1.55; }
        .rf-code-box { background: #faf8ff; border: 1.5px dashed #c4b5fd; border-radius: 12px; padding: 14px 16px; margin-bottom: 22px; }
        .rf-code-label { display: block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #8491a8; }
        .rf-code-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 4px; }
        .rf-code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 1.6rem; font-weight: 800; letter-spacing: 0.12em; color: #4c1d95; }
        .rf-copy { width: 38px; height: 38px; border-radius: 10px; border: 1.5px solid #ddd6fe; background: #fff; color: #5641ce; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
        .rf-saved { display: block; font-size: 0.74rem; color: #059669; margin-top: 6px; }
        .rf-steps { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .rf-step { display: flex; align-items: center; gap: 12px; font-size: 0.86rem; color: #374151; }
        .rf-step :global(svg) { color: #5641ce; flex-shrink: 0; }
        .rf-card :global(.rf-btn) { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 0.92rem; text-decoration: none; margin-bottom: 10px; }
        .rf-card :global(.rf-btn-primary) { background: #5641ce; color: #fff; }
        .rf-card :global(.rf-btn-outline) { background: #fff; color: #5641ce; border: 1.5px solid #ddd6fe; }
        .rf-note { font-size: 0.78rem; color: #8491a8; text-align: center; margin: 4px 0 0; }
      `}</style>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const code = String(params.code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
  let name = "";
  let valid = false;
  try {
    const { default: dbConnect } = await import("@/lib/dbConnect");
    const { default: StudentUser } = await import("@/models/StudentUser");
    const { getReferralSettings } = await import("@/lib/referral");
    await dbConnect();
    const [settings, owner] = await Promise.all([
      getReferralSettings(),
      code ? StudentUser.findOne({ referralCode: code }).select("name").lean() : null,
    ]);
    if (settings.enabled && owner) {
      valid = true;
      name = String(owner.name || "").split(" ")[0];
    }
  } catch {}
  return { props: { code, name, valid } };
}
