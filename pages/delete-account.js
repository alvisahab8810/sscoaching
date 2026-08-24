import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function DeleteAccountPage() {
  return (
    <>
      <Head>
        <title>Delete Account - SS Coaching</title>
        <meta
          name="description"
          content="How to request deletion of your SS Coaching account and associated data."
        />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Delete Your Account
            </h1>

            <p>
              If you wish to delete your SS Coaching account and the personal
              data associated with it, you can request deletion at any time
              using the steps below.
            </p>

            <h3>How to Request Account Deletion</h3>

            <p>
              <strong>Option 1 — Delete directly in the app:</strong> Open the
              SS Coaching app, go to <strong>Profile → Delete Account</strong>,
              and confirm the deletion. Your account will be deleted
              immediately.
            </p>

            <p>
              <strong>Option 2 — Request by email:</strong> Send an email to{" "}
              <strong>
                <a href="mailto:contact@sscoaching.in">contact@sscoaching.in</a>
              </strong>{" "}
              from your registered email address, along with your registered
              mobile number, and mention that you want your account deleted.
              We will verify your request and delete your account within{" "}
              <strong>7 days</strong>.
            </p>

            <h3>What Gets Deleted</h3>

            <p>
              Once your account is deleted, your personal data will be
              anonymised and your access to enrolled courses will be revoked.
              Certain enrollment and financial records may be retained for up
              to 7 years as required for legal and regulatory compliance.
            </p>

            <h3>Need Help?</h3>

            <p>
              For any questions about this process, contact us at{" "}
              <a href="mailto:contact@sscoaching.in">contact@sscoaching.in</a>{" "}
              or call us at <strong>9792111121</strong>.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
