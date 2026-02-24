import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy - SS Coaching</title>
        <meta
          name="description"
          content="Privacy Policy of SS Coaching Lucknow. Learn how we collect, use, store and protect your personal information."
        />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Privacy Policy – SS Coaching
            </h1>

            <p>
This Privacy Policy describes how SS Coaching, Lucknow (“SS Coaching”, “we”, “our”, or “us”) collects, uses, stores, protects and discloses information when you visit our website, enroll in our courses, attend our online video classes, or use any of our services including admission support, examination assistance, online payments, and student support services.
            </p>

            <p>
By accessing or using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>

            <h3>1. Information We Collect</h3>

            <p>
We may collect the following categories of information:
            </p>

            <ul>
              <li>Full Name</li>
              <li>Date of Birth</li>
              <li>Parent/Guardian Name (if student is under 18)</li>
              <li>Email Address</li>
              <li>Mobile Number</li>
              <li>Residential Address</li>
              <li>Educational Qualification</li>
              <li>Board Registration Details</li>
              <li>Aadhar Card or Identity Proof (if required for admission support)</li>
              <li>Payment Information (processed securely through third-party payment gateways)</li>
              <li>IP Address and Device Information</li>
              <li>Usage Data and Website Interaction Data</li>
            </ul>

            <h3>2. Information Collected from Online Video Classes</h3>

            <p>
When you attend our online video classes or access recorded lectures, we may collect:
            </p>

            <ul>
              <li>Login credentials</li>
              <li>Attendance data</li>
              <li>Session duration</li>
              <li>Assignment submissions</li>
              <li>Exam attempts and results</li>
              <li>Interaction data (chat messages, questions asked)</li>
            </ul>

            <p>
This data is collected solely to improve academic performance tracking, course management and student progress evaluation.
            </p>

            <h3>3. How We Use Your Information</h3>

            <p>
We use the collected information for the following purposes:
            </p>

            <ul>
              <li>Processing admissions and registrations</li>
              <li>Providing academic coaching and study material</li>
              <li>Managing online classes and video sessions</li>
              <li>Processing online payments</li>
              <li>Sending exam notifications and reminders</li>
              <li>Sending important academic updates</li>
              <li>Providing customer support</li>
              <li>Improving website performance and user experience</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h3>4. Payment Information</h3>

            <p>
SS Coaching does not store full debit/credit card details. All online payments are processed through secure third-party payment gateways compliant with RBI guidelines and PCI-DSS standards. We only receive transaction confirmation details necessary for record keeping.
            </p>

            <h3>5. Cookies and Tracking Technologies</h3>

            <p>
Our website may use cookies and similar tracking technologies to:
            </p>

            <ul>
              <li>Analyze website traffic</li>
              <li>Improve user experience</li>
              <li>Store login sessions</li>
              <li>Remember user preferences</li>
            </ul>

            <p>
You may disable cookies in your browser settings, but some features of the website may not function properly.
            </p>

            <h3>6. Data Sharing and Disclosure</h3>

            <p>
We do not sell, rent, or trade your personal information. However, we may share limited data with:
            </p>

            <ul>
              <li>Payment gateway providers</li>
              <li>Technical service providers (hosting, analytics)</li>
              <li>Government authorities when legally required</li>
              <li>Educational boards for admission processing (when authorized by student)</li>
            </ul>

            <h3>7. Protection of Minors</h3>

            <p>
If the student is under the age of 18, consent from a parent or guardian is required for enrollment and data submission. Parents/Guardians are responsible for monitoring the online activity of minor students.
            </p>

            <h3>8. Data Security</h3>

            <p>
We implement reasonable administrative, technical and physical security measures to protect your information against unauthorized access, misuse, alteration or disclosure. However, no internet transmission is 100% secure.
            </p>

            <h3>9. Data Retention</h3>

            <p>
We retain student data for as long as required for academic, legal, and administrative purposes. Data may be retained even after course completion for record keeping and compliance requirements.
            </p>

            <h3>10. Your Rights</h3>

            <p>
You have the right to:
            </p>

            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion (subject to legal requirements)</li>
              <li>Withdraw consent (where applicable)</li>
            </ul>

            <p>
Requests may be submitted via email.
            </p>

            <h3>11. Third-Party Links</h3>

            <p>
Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of such websites.
            </p>

            <h3>12. Legal Compliance</h3>

            <p>
This Privacy Policy is governed by the laws of India. Any disputes arising shall fall under the jurisdiction of courts in Lucknow, Uttar Pradesh.
            </p>

            <h3>13. Updates to Privacy Policy</h3>

            <p>
SS Coaching reserves the right to update this Privacy Policy at any time. Changes will be effective immediately upon posting on the website.
            </p>

            <h3>14. Contact Information</h3>

            <p>
SS Coaching<br/>
IIIrd Floor, Shree Chamber,<br/>
Naza Computer Market,<br/>
Near Basant Cinema,<br/>
Lucknow, Uttar Pradesh, India<br/>
Email: support@sscoaching.in<br/>
Phone: 9792111121
            </p>

            <p>
By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}