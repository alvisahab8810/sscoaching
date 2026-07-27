import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>Refund & Cancellation Policy - SS Coaching</title>
        <meta
          name="description"
          content="Read SS Coaching's Refund and Cancellation Policy for online courses and study materials."
        />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">
            <h1 className="nios-125h-senior-hero-title">
              REFUND &amp; CANCELLATION POLICY
            </h1>

            <p>
              At <strong>SS Coaching</strong>, we are committed to providing
              high-quality education and a satisfying learning experience. Please
              read our Refund &amp; Cancellation Policy carefully before
              purchasing any course or study material on our platform.
            </p>

            <p>
              <em>Last updated: July 2026</em>
            </p>

            <h3>1. Course Enrollment — Refund Eligibility</h3>

            <p>
              We offer a <strong>7-day refund window</strong> from the date of
              purchase, subject to the following conditions:
            </p>

            <ul>
              <li>
                Refund requests must be submitted within <strong>7 days</strong>{" "}
                of the date of purchase.
              </li>
              <li>
                The student must not have accessed more than{" "}
                <strong>20% of the course content</strong> (videos, study
                materials, or online classes).
              </li>
              <li>
                Refunds will not be provided if the student has downloaded study
                materials (books, notes, sample papers, assignments).
              </li>
              <li>
                Refunds will not be provided for courses purchased during a
                special offer, discount, or promotional sale.
              </li>
            </ul>

            <h3>2. Non-Refundable Cases</h3>

            <p>
              Refunds will <strong>not</strong> be granted in the following
              situations:
            </p>

            <ul>
              <li>
                The refund request is made after 7 days from the date of
                purchase.
              </li>
              <li>
                The student has attended one or more live online classes linked
                to the course.
              </li>
              <li>
                The purchase was made for a <strong>Full Bundle</strong> (combo
                package of multiple subjects) and any subject content has been
                accessed.
              </li>
              <li>
                The student has downloaded or accessed PDF study materials,
                notes, TMA, or sample papers.
              </li>
              <li>
                Refund request is made due to a change of mind after course
                content has been partially or fully consumed.
              </li>
              <li>
                Technical issues on the student's device or internet connection
                that are beyond SS Coaching's control.
              </li>
            </ul>

            <h3>3. How to Request a Refund</h3>

            <p>
              To initiate a refund request, please contact us through any of the
              following methods within the eligible 7-day period:
            </p>

            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@sscoaching.in">contact@sscoaching.in</a>
              </li>
              <li>
                <strong>Phone / WhatsApp:</strong>{" "}
                <a href="tel:+9109792111121">+91-09792111121</a>
              </li>
              <li>
                <strong>Address:</strong> SS Coaching, Alambagh / Hazratganj /
                Indiranagar, Lucknow, Uttar Pradesh
              </li>
            </ul>

            <p>
              Please include the following details in your refund request:
            </p>

            <ul>
              <li>Full Name and Registered Email / Phone Number</li>
              <li>Course / Bundle Name</li>
              <li>Date of Purchase</li>
              <li>Order / Payment Reference Number</li>
              <li>Reason for Refund Request</li>
            </ul>

            <h3>4. Refund Processing</h3>

            <ul>
              <li>
                Once a refund request is approved, the amount will be credited
                back to the <strong>original payment method</strong> (bank
                account, UPI, credit/debit card, or wallet) within{" "}
                <strong>7–10 business days</strong>.
              </li>
              <li>
                The exact time depends on your bank or payment provider and may
                take up to 10 business days after approval.
              </li>
              <li>
                You will receive a confirmation email or SMS once the refund is
                processed.
              </li>
            </ul>

            <h3>5. Cancellation Policy</h3>

            <p>
              <strong>By the Student:</strong> Students may cancel their
              enrollment at any time from the dashboard. However, cancellation
              after 7 days of purchase does not entitle the student to a refund.
              Access to course content will continue until the end of the
              enrolled period.
            </p>

            <p>
              <strong>By SS Coaching:</strong> SS Coaching reserves the right to
              cancel or suspend a student's access to a course in case of:
            </p>
            <ul>
              <li>Violation of our Terms &amp; Conditions.</li>
              <li>
                Sharing of login credentials or course content with
                unauthorized persons.
              </li>
              <li>Any fraudulent or abusive behavior on the platform.</li>
            </ul>
            <p>
              In such cases, no refund will be issued.
            </p>

            <h3>6. Changes to This Policy</h3>

            <p>
              SS Coaching reserves the right to modify this Refund &amp;
              Cancellation Policy at any time. Changes will be effective
              immediately upon posting on this page. We recommend reviewing this
              policy periodically.
            </p>

            <h3>7. Contact Us</h3>

            <p>
              For any questions or concerns regarding this Refund &amp;
              Cancellation Policy, please contact us:
            </p>

            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@sscoaching.in">contact@sscoaching.in</a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+9109792111121">+91-09792111121</a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://sscoaching.in"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.sscoaching.in
                </a>
              </li>
            </ul>

            <p>
              By purchasing any course or study material on SS Coaching's
              platform, you acknowledge that you have read, understood, and
              agreed to this Refund &amp; Cancellation Policy.
            </p>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
