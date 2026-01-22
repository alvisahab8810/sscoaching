import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Achievements from "@/components/home/Achievements";
import BeastFeatures from "@/components/home/BeastFeatures";
import ChipSection from "@/components/home/ChipSection";
import CoachingStream from "@/components/home/CoachingStream";
import CTA from "@/components/home/CTA";
import CTA2 from "@/components/home/CTA2";
import CTAA, { CTA1 } from "@/components/home/CTA2";
import CTA3 from "@/components/home/CTA3";
import FAQ from "@/components/home/FAQ";
import GoogleReview from "@/components/home/GoogleReview";
import Hero from "@/components/home/Hero";
import HeroMobile from "@/components/home/HeroMobile";
import LearnersNios from "@/components/home/LearnersNios";
import LearnersNiosMobile from "@/components/home/LearnersNiosMobile";
import MobileQuickInfo from "@/components/home/MobileQuickInfo";
import News from "@/components/home/News";
import NewsMobile from "@/components/home/NewsMobile";
import NIOSInfo from "@/components/home/NIOSInfo";
import Popup from "@/components/home/Popup";
import QueryForm from "@/components/home/QueryForm";
import QuickLinks from "@/components/home/QuickLinks";
import RecongnitionMobile from "@/components/home/RecognitionMobile";
import Recongnition from "@/components/home/Recongnition";
import StatsSection from "@/components/home/StatsSection";
import StatsSectionMobile from "@/components/home/StatsSectionMobile";
import StepProcess from "@/components/home/StepProcess";
import StepProcessMobile from "@/components/home/StepsProcessMobile";
// import StudentSuccess from "@/components/home/StudentSuccess";
import dynamic from "next/dynamic";
const StudentSuccess = dynamic(() => import("@/components/home/StudentSuccess"), { ssr: false });
import Head from "next/head";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />
        {/* <NewsMobile/> */}
        <Hero />
        <HeroMobile />
        <ChipSection />
        <MobileQuickInfo/>
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
        <StepProcess />
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
        {/* <FAQ />  */}

        <FAQ limit={8} showViewMore={true} />

        <Popup />

        <Footer />
      </section>
    </>
  );
}
