import dynamic from "next/dynamic";
import Head from "next/head";

// Above-fold: static imports for fast LCP
import Header from "@/components/header/Header";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Offcanvas from "@/components/header/Offcanvas";
import Hero from "@/components/home/Hero";
import HeroMobile from "@/components/home/HeroMobile";
import ChipSection from "@/components/home/ChipSection";
import MobileQuickInfo from "@/components/home/MobileQuickInfo";
import ContactStripe from "@/components/home/ContactStripe";

// Below-fold interactive / Swiper / video components — skip SSR to unblock main thread
const StudentSuccess = dynamic(
  () => import("@/components/home/StudentSuccess"),
  { ssr: false },
);
const Popup = dynamic(() => import("@/components/home/Popup"), { ssr: false });
const QueryForm = dynamic(() => import("@/components/home/QueryForm"), {
  ssr: false,
});
const Achievements = dynamic(() => import("@/components/home/Achievements"), {
  ssr: false,
});

// Below-fold content components — code-split but keep SSR for SEO
const StatsSectionMobile = dynamic(
  () => import("@/components/home/StatsSectionMobile"),
);
const StatsSection = dynamic(() => import("@/components/home/StatsSection"));
const NewsMobile = dynamic(() => import("@/components/home/NewsMobile"));
const StepProcessMobile = dynamic(
  () => import("@/components/home/StepsProcessMobile"),
);
const News = dynamic(() => import("@/components/home/News"));
const RecongnitionMobile = dynamic(
  () => import("@/components/home/RecognitionMobile"),
);
const GoogleReview = dynamic(() => import("@/components/home/GoogleReview"));
const HomeCourses = dynamic(() => import("@/components/home/HomeCourses"), { ssr: false });
const StepProcess = dynamic(() => import("@/components/home/StepProcess"));
const LearnersNiosMobile = dynamic(
  () => import("@/components/home/LearnersNiosMobile"),
);
const LearnersNios = dynamic(() => import("@/components/home/LearnersNios"));
const CTA = dynamic(() => import("@/components/home/CTA"));
const CoachingStream = dynamic(() => import("@/components/home/CoachingStream"));
const Recongnition = dynamic(() => import("@/components/home/Recongnition"));
const CTA2 = dynamic(() => import("@/components/home/CTA2"));
const NIOSInfo = dynamic(() => import("@/components/home/NIOSInfo"));
const BeastFeatures = dynamic(() => import("@/components/home/BeastFeatures"));
const CTA3 = dynamic(() => import("@/components/home/CTA3"));
const QuickLinks = dynamic(() => import("@/components/home/QuickLinks"));
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const Footer = dynamic(() => import("@/components/footer/Footer"));

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Best NIOS Coaching in Lucknow | NIOS Admission for Failed Students &
          Dropouts in Lucknow
        </title>
        <meta
          name="description"
          content="SS Coaching is the Best NIOS Coaching in Lucknow, offering expert guidance on the NIOS Board. As a trusted NIOS center in Lucknow, we help students complete their education through NIOS. Our NIOS office in Lucknow assists with filling out the admission form for NIOS online admissions 2025 across all streams. Whether you?re a 10th or 12th failed student, our NIOS coaching in Lucknow ensures a smooth path to success. "
        />
        <meta
          name="keywords"
          content="NIOS Admission, NIOS Online Registration 2025, NIOS Eligibility Criteria, NIOS Board, NIOS Streams, NIOS Entry Qualification, NIOS Exam Pattern, NIOS Syllabus, NIOS Coaching, NIOS Online Coaching Classes, SS Coaching NIOS Question Paper, NIOS Coaching Classes, NIOS Tuition Classes, NIOS Tuition, NIOS Private Tuition, SS Coaching Near Me, NIOS Tutor Near Me, NIOS Coaching Online, NIOS Coaching Center Near Me, NIOS Online Tuition, Coaching for NIOS Class 12, NIOS Coaching Centres Near Me, NIOS Coaching Institute, SSCoaching NIOS, NIOS Coaching Center, NIOS Question Paper, NIOS Online Coaching, NIOS Tuition Classes, NIOS Admission, NIOS Online Admission, NIOS Admission 2025, NIOS Admission Form, NIOS Admission 12th Class, 10th 12th NIOS Admission, NIOS Admission Status, NIOS Admission for 12th Class Last Date 2025, NIOS Admission 2025 Last Date, NIOS Admission Date, NIOS Class 12 Admission, NIOS Class 10 Admission, NIOS Apply Online, NIOS 12 Admission 2025, NIOS Online Form, Open 10th Class Admission, NIOS Graduation Admission 2025, NIOS New Admission 2025, NIOS Examination, NIOS Senior Secondary Admission, NIOS Admission in Lucknow, NIOS Admission Lucknow, NIOS Lucknow, NIOS Coaching in Lucknow, NIOS Coaching Lucknow, NIOS Center in Lucknow, NIOS Center Lucknow, NIOS Office in Lucknow, NIOS Office Lucknow, NIOS School in Lucknow, NIOS School Lucknow, Best NIOS Coaching in Lucknow, Best NIOS Coaching Lucknow, NIOS Lucknow Centre, NIOS Popular Coaching in Lucknow, NIOS Online Admission in Lucknow, NIOS Online Admission, NIOS, NIOS Lucknow"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://sscoaching.in/" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />

        
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />
        <Hero />
        <HeroMobile />
        <ChipSection />
        <MobileQuickInfo />
        <ContactStripe />

        <StatsSectionMobile />
        <StatsSection />
        <StudentSuccess />

        <NewsMobile />

        <StepProcessMobile />

        <QueryForm />
        <News />

        <RecongnitionMobile />

        <LearnersNiosMobile />

        <GoogleReview />
        {/* <HomeCourses />  */}
        <StepProcess />
        {/* PROSPECTUS BANNER */}
        <section className="prospectus-area">
          <div className="hg-reg">
            <div className="hg-reg-in">
              <div className="hg-reg-l">
                <h2>
                  Download Our <span>Prospectus</span>
                </h2>

                <p>
                  Get complete information about NIOS streams, admission
                  process, course details, fees structure, and success stories
                  from SS Coaching
                </p>

                <div className="hg-reg-btns">
                  <a
                    href="/assets/images/others/prospectus.pdf"
                    download
                    className="hg-btn-yl"
                  >
                    Download Prospectus →
                  </a>

                  <a
                    href="/onlineforms"
                    target="_blank"
                    className="hg-btn-cl"
                  >
                    Apply Online
                  </a>
                </div>
              </div>

              <div className="hg-reg-badge">
                <strong>FREE</strong>
                <span>
                  Complete <br /> Admission Guide
                </span>
              </div>
            </div>
          </div>
        </section>
        <LearnersNios />
        <div className="container">
          <CTA />
        </div>
        <CoachingStream />

        <Recongnition />
        <Achievements />
        <div className="container">
          <CTA2 />
        </div>

        <NIOSInfo />

        <BeastFeatures />

        <div className="container">
          <CTA3 />
        </div>

        <QuickLinks />

        <FAQ limit={8} showViewMore={true} />

        <Popup />

        <Footer />
      </section>
    </>
  );
}
