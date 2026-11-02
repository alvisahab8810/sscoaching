// Site chrome plus the narrow "My admission" bar used by every logged-in student page.
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";
import { api } from "./client";
import { Spinner } from "./ui";
import a from "./App.module.css";

/**
 * Loads the logged-in student. With `required`, sends a visitor to the login
 * page and brings them back here afterwards.
 */
export function useStudent({ required = true } = {}) {
  const router = useRouter();
  const [me, setMe] = useState(undefined);
  useEffect(() => {
    if (!router.isReady) return;
    api("GET", "/auth/me")
      .then((r) => {
        setMe(r.user);
        if (!r.user && required) router.replace("/nios-online-admission/login?next=" + encodeURIComponent(router.asPath));
      })
      .catch(() => setMe(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  return me;
}

export function toLogin(router) {
  router.replace("/nios-online-admission/login?next=" + encodeURIComponent(router.asPath));
}

export default function StudentShell({ title, me, loading, children }) {
  const router = useRouter();
  const logout = async () => {
    await api("POST", "/auth/logout").catch(() => {});
    router.push("/nios-online-admission");
  };
  return (
    <>
      <Head>
        <title>{`${title ? title + " | " : ""}NIOS Online Admission | SS Coaching`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Header />
      <Offcanvas />
      <BranchContactCanvas />
      <main className={`${a.app} ${a.studentPage}`}>
        <div className={a.subbar}>
          <div className={a.subbarIn}>
            <b>NIOS online admission</b>
            {me && (
              <nav>
                <Link href="/nios-online-admission/my">My admission</Link>
                <button type="button" onClick={logout} aria-label="Log out"><FiLogOut size={16} /> Log out</button>
              </nav>
            )}
          </div>
        </div>
        <div className={a.shell}>{loading || !me ? <Spinner /> : children}</div>
      </main>
      <Footer />
    </>
  );
}
