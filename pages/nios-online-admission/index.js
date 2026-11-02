import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { FiCheck, FiInfo, FiShield } from "react-icons/fi";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";
import { JOURNEY } from "@/components/OnlineAdmission/data";
import { INCLUSION_ICONS } from "@/components/OnlineAdmission/Icons";
import { api, rupee } from "@/components/OnlineAdmission/client";
import { Dialog, Field } from "@/components/OnlineAdmission/ui";
import s from "@/components/OnlineAdmission/OnlineAdmission.module.css";
import a from "@/components/OnlineAdmission/App.module.css";

export default function NiosOnlineAdmission({ live, packages, inclusions }) {
  const router = useRouter();
  const [chosen, setChosen] = useState("12");
  const [asking, setAsking] = useState(false);
  const pkg = packages[chosen];

  useEffect(() => {
    if (["10", "12"].includes(router.query.c)) setChosen(router.query.c);
  }, [router.query.c]);

  return (
    <>
      <Head>
        <title>NIOS Complete Package: Online Admission | SS Coaching</title>
        <meta
          name="description"
          content="Apply online for the NIOS complete package for Class 10th and 12th: admission, classes, study material, TMA, doubts and exam support at one price."
        />
      </Head>

      <Header />
      <Offcanvas />
      <BranchContactCanvas />

      <main className={s.page}>
        <section className={s.hero}>
          <div className={`${s.wrap} ${s.heroGrid}`}>
            <div>
              <span className={`${s.pill} ${live ? "" : s.pillSoon}`}>
                {live ? "Admissions open" : "Coming soon"}
              </span>
              <h1>NIOS complete package</h1>
              <p>Admission, classes, study material, TMA, doubts and exam support. One price for the whole journey.</p>
              <div className={s.heroPoints}>
                <span><FiCheck strokeWidth={3} /> Pay only after verification</span>
                <span><FiCheck strokeWidth={3} /> NIOS fees included</span>
                <span><FiCheck strokeWidth={3} /> Since 2001</span>
              </div>
            </div>

            <div className={s.pkgCard}>
              <h3>Choose your class</h3>
              <div className={s.pkgs}>
                {["12", "10"].map((id) => {
                  const p = packages[id];
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={chosen === id}
                      className={`${s.pkg} ${chosen === id ? s.pkgOn : ""}`}
                      onClick={() => setChosen(id)}
                    >
                      <span className={s.pkgTick} aria-hidden="true">{chosen === id && <FiCheck size={13} strokeWidth={3} />}</span>
                      <span className={s.pkgCls}>{p.label}</span>
                      <span className={s.pkgPrice}>{rupee(p.price)}</span>
                      <span className={s.pkgTag}>{p.tagline}</span>
                    </button>
                  );
                })}
              </div>
              <p className={s.feesLine}><FiInfo size={18} /> Price includes NIOS admission fee and examination fee</p>
              {live ? (
                <Link href={`/nios-online-admission/start/${chosen}`} className={`${s.btn} ${s.lime}`}>
                  Apply for {pkg.label}
                </Link>
              ) : (
                <button type="button" className={`${s.btn} ${s.lime}`} onClick={() => setAsking(true)}>
                  Notify me when {pkg.label} opens
                </button>
              )}
              <p className={s.cardNote}>
                <FiShield size={16} />
                {live
                  ? "No payment now. You pay after our consultant verifies your documents."
                  : "Online admissions open soon. Leave your number and we will call you."}
              </p>
            </div>
          </div>
        </section>

        <div className={`${s.wrap} ${s.body}`}>
          <section className={s.card}>
            <h2>What you get in {pkg.label}</h2>
            <p className={s.sub}>Everything you need from admission to your NIOS exam, in one package.</p>
            <div className={s.incl}>
              {inclusions.map((i) => {
                const Icon = INCLUSION_ICONS[i.key];
                return (
                  <div key={i.key} className={s.inclItem}>
                    <div className={s.ic}>{Icon && <Icon size={20} />}</div>
                    <div><b>{i.title}</b><span>{i.text}</span></div>
                  </div>
                );
              })}
            </div>
            <p className={s.disclaimer}>
              SS Coaching provides NIOS admission and form-submission support. Admission is granted by NIOS through its
              accredited study centres. SS Coaching, Hazratganj, Lucknow. Call 0522-4029757.
            </p>
          </section>

          <section className={s.card}>
            <h2>How your admission works</h2>
            <p className={s.sub}>You only pay after our consultant has checked your documents. No wrong forms, no lost admissions.</p>
            <ol className={s.rail}>
              {JOURNEY.map(([title, text], i) => (
                <li key={title}>
                  <span className={s.node}>{i + 1}</span>
                  <b>{title}</b>
                  <span className={s.stepText}>{text}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>

      <InterestDialog open={asking} cls={chosen} onClose={() => setAsking(false)} />
      <Footer />
    </>
  );
}

function InterestDialog({ open, cls, onClose }) {
  const [f, setF] = useState({ name: "", mobile: "", pincode: "" });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: k === "name" ? e.target.value : e.target.value.replace(/\D/g, "") });

  const send = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(f.mobile)) return toast.error("Enter a valid 10-digit mobile number");
    setBusy(true);
    try {
      await api("POST", "/interest", { ...f, class: cls });
      toast.success("Thanks! We will call you when admissions open.");
      setF({ name: "", mobile: "", pincode: "" });
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form className={a.app} onSubmit={send}>
        <h3 style={{ marginBottom: 12 }}>Get a call when Class {cls}th admissions open</h3>
        <Field label="Your name">
          <input className={a.input} autoComplete="name" value={f.name} onChange={set("name")} />
        </Field>
        <Field label="Mobile number">
          <input className={a.input} inputMode="numeric" maxLength={10} autoComplete="tel-national" value={f.mobile} onChange={set("mobile")} />
        </Field>
        <Field label="Pincode" optional>
          <input className={a.input} inputMode="numeric" maxLength={6} value={f.pincode} onChange={set("pincode")} />
        </Field>
        <div className={a.row}>
          <button type="button" className={`${a.btn} ${a.ghost}`} onClick={onClose}>Cancel</button>
          <button type="submit" className={`${a.btn} ${a.grow}`} disabled={busy}>{busy ? "Saving…" : "Notify me"}</button>
        </div>
      </form>
    </Dialog>
  );
}

export async function getServerSideProps() {
  const { PACKAGES, INCLUSIONS } = await import("@/lib/onlineAdmission/config");
  const { getSettings } = await import("@/lib/onlineAdmission/server");
  const { default: dbConnect } = await import("@/lib/dbConnect");
  const packages = JSON.parse(JSON.stringify(PACKAGES));
  let live = false;
  try {
    await dbConnect();
    const st = await getSettings();
    packages["10"].price = +st.price_10;
    packages["12"].price = +st.price_12;
    live = st.launch_mode === "live";
  } catch (e) {
    console.error("online admission settings", e);
  }
  return { props: { live, packages, inclusions: INCLUSIONS } };
}
