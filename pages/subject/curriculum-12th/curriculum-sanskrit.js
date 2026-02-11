import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusSanskritSeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Curriculum Sanskrit Senior Secondary NIOS | SS Coaching
        </title>
        <meta
          name="description"
          content="Curriculum Sanskrit Senior Secondary NIOS – prescribed lessons and optional modules."
        />
        <meta
          name="keywords"
          content="Sanskrit NIOS syllabus, Senior Secondary Sanskrit curriculum"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        

        <div className="syllabus-nios">
          <div className="container">

            {/* ================= PAGE TITLE ================= */}
            <h1 className="nios-125h-senior-hero-title">
              Curriculum Sanskrit Senior Secondary NIOS
            </h1>

            <hr />

            {/* ================= पुस्तक 1 ================= */}
            <h3 className="nios-125h-senior-hero-title">पुस्तक 1</h3>

            <ol className="numbered-list">
              <li>जीवन-संदेश:</li>
              <li>यदि जानासि तद् वद</li>
              <li>आरोग्यं परमं सुखम्</li>
              <li>वायां मण्डनं सत्यम्</li>
              <li>अतिलोभः न कर्तव्य:</li>
              <li>राजते खलु कन्याकुमारी</li>
            </ol>

            <ol className="numbered-list" start={7}>
              <li>एतद् उपास्यम्</li>
              <li>B. परार्थे आत्मोत्सर्गः</li>
              <li>काले फलति सौभाग्यम्</li>
              <li>पतन्ति परपीडका:</li>
              <li>अनुच्छेद लेखनम्</li>
              <li>संवादलेखनम्</li>
            </ol>

            <hr />

            {/* ================= पुस्तक 2 ================= */}
            <h3 className="nios-125h-senior-hero-title">पुस्तक- 2</h3>

            <ol className="numbered-list" start={13}>
              <li>वर्षर्तुवर्णनम्</li>
              <li>अमृतस्य पन्थी</li>
              <li>हिमालयो नाम नगाधिराजः</li>
              <li>मानो हि महतां धनम्</li>
              <li>कल्पनाकीर्तिः विजयते</li>
              <li>पर्यावरणस्य संरक्षणम्</li>
              <li>क्रोधोऽनर्थंकारकः</li>
            </ol>

            <ol className="numbered-list" start={20}>
              <li>अनन्तः ज्ञानसागरः</li>
              <li>शल्यचिकित्साजनकः सुश्रुतः</li>
              <li>कष्टं न्यासस्य रक्षणम्</li>
              <li>हृदय परिवर्तनम्</li>
              <li>पत्र लिखामः</li>
              <li>परियोजना निर्माणम्</li>
            </ol>

            <hr />

            {/* ================= खंड ख ================= */}
            <h3 className="nios-125h-senior-hero-title">
              खंड- 'ख' वैकल्पिकपाठ्यक्रम
            </h3>

            <h4 className="nios-sub-title">पुस्तक- 3</h4>

            <div className="highlight-box">

              <p className="sanskrit-om">ॐ संस्कृतं संस्कृतिश्च</p>

              <ol className="numbered-list" start={26}>
                <li>समसामयिक संस्कृतसाहित्यम्</li>
                <li>भारतीयज्ञानविज्ञानपरम्परा</li>
                <li>संस्कृतम् अन्याः भारतीयाः भाषा म</li>
                <li>भारतीयसंस्कृती संस्कारा:</li>
              </ol>

              <ol className="numbered-list">
                <li>(i) प्रयोजनमूलकसंस्कृतम्</li>
                <li>21. संस्कृतस्य प्रयोजनमूलकता</li>
                <li>27. जनरा पारमाध्यम</li>
                <li>28. संस्कृतपत्रकारिता</li>
                <li>29. पत्रिकाप्रारूपम्</li>
                <li>30. मुद्रणत्रुटियोधनम्</li>
              </ol>

            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
