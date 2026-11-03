import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiCheckCircle } from "react-icons/fi";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";
import { PACKAGES } from "@/components/OnlineAdmission/data";
import { api, rupee } from "@/components/OnlineAdmission/client";
import s from "@/components/OnlineAdmission/OnlineAdmission.module.css";

// Only same-site paths inside the admission app are accepted as `next`.
const safeNext = (n) => (typeof n === "string" && n.startsWith("/nios-online-admission") && !n.startsWith("//") ? n : "/nios-online-admission/my");

export default function NiosOnlineAdmissionLogin() {
  const router = useRouter();
  const next = safeNext(router.query.next);
  const cls = router.query.c || (next.match(/\/start\/(10|12|test)/) || [])[1];
  const [packages, setPackages] = useState(PACKAGES);
  const pkg = packages[cls] || null;
  const [step, setStep] = useState("mobile"); // mobile -> otp
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const mobileRef = useRef(null);
  const otpRef = useRef(null);

  useEffect(() => {
    if (!router.isReady) return;
    api("GET", "/auth/me").then((r) => { if (r.user) router.replace(next); }).catch(() => {});
    api("GET", "/config").then((c) => setPackages(c.packages)).catch(() => {});
    mobileRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  useEffect(() => { if (step === "otp") otpRef.current?.focus(); }, [step]);

  const sendOtp = async () => {
    const r = await api("POST", "/auth/send-otp", { mobile });
    setDevOtp(r.dev_otp || "");
    setOtp("");
    setStep("otp");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (step === "mobile") {
        if (!/^[6-9]\d{9}$/.test(mobile)) throw new Error("Enter a valid 10-digit mobile number");
        await sendOtp();
      } else {
        if (!/^\d{4,6}$/.test(otp)) throw new Error("Enter the 6-digit OTP");
        await api("POST", "/auth/verify-otp", { mobile, otp, name });
        router.replace(next);
        return;
      }
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  const resend = async () => {
    setError("");
    setBusy(true);
    try { await sendOtp(); } catch (err) { setError(err.message); }
    setBusy(false);
  };

  const changeNumber = () => {
    setStep("mobile"); setOtp(""); setError(""); setDevOtp("");
    setTimeout(() => mobileRef.current?.focus(), 0);
  };

  return (
    <>
      <Head>
        <title>Log in: NIOS Online Admission | SS Coaching</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Header />
      <Offcanvas />
      <BranchContactCanvas />

      <main className={s.page}>
        <div className={s.loginWrap}>
          <div className={s.loginGrid}>
            <div className={s.loginAside}>
              <span className={s.pill}>{pkg ? `${pkg.label}, ${rupee(pkg.price)}` : "NIOS complete package"}</span>
              <h1>Start your NIOS admission</h1>
              <p>Log in with your mobile number. Your form is saved as you go, so you can finish it later.</p>
              <ul className={s.loginSteps}>
                <li><FiCheckCircle size={20} /> Fill one form and upload documents</li>
                <li><FiCheckCircle size={20} /> Our consultant verifies everything</li>
                <li><FiCheckCircle size={20} /> Pay only after verification</li>
              </ul>
            </div>

            <form className={`${s.card} ${s.loginCard}`} onSubmit={submit} noValidate>
              <h2>Log in with your mobile</h2>
              <p className={s.sub}>Use the number you want on your NIOS form. We send updates to it.</p>

              <label className={s.field}>
                <span className={s.lbl}>Mobile number</span>
                <input
                  ref={mobileRef}
                  className={`${s.input} ${error && step === "mobile" ? s.inputErr : ""}`}
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  readOnly={step !== "mobile"}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                />
                {error && step === "mobile" && <div className={s.err}>{error}</div>}
              </label>

              {step === "otp" && (
                <>
                  {devOtp ? (
                    <div className={s.doneNote} style={{ background: "#dafff9", color: "#00796b", marginBottom: 12 }}>
                      Demo mode, SMS is not connected. Your OTP is <b>{devOtp}</b>
                    </div>
                  ) : null}
                  <div className={s.sentNote}>
                    <span>OTP sent by SMS to {mobile}</span>
                    <span>
                      <button type="button" className={s.linkBtn} onClick={resend} disabled={busy}>Resend</button>
                      {" · "}
                      <button type="button" className={s.linkBtn} onClick={changeNumber}>Change</button>
                    </span>
                  </div>
                  <label className={s.field}>
                    <span className={s.lbl}>OTP</span>
                    <input
                      ref={otpRef}
                      className={`${s.input} ${error ? s.inputErr : ""}`}
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="one-time-code"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    />
                    {error && <div className={s.err}>{error}</div>}
                  </label>
                  <label className={s.field}>
                    <span className={s.lbl}>Your full name <span className={s.lblOpt}>(optional)</span></span>
                    <input
                      className={s.input}
                      autoComplete="name"
                      placeholder="As on Aadhaar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className={s.help}>Only needed the first time</div>
                  </label>
                </>
              )}

              <button type="submit" className={s.btn} disabled={busy}>
                {busy ? "Please wait…" : step === "mobile" ? "Send OTP" : "Verify and continue"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
