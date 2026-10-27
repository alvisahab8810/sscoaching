import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import NiosHallTicketFAQ from "@/components/home/NiosHallTicketFAQ";
import PageSections from "@/components/PageSections";
import Head from "next/head";

const niosHallTicketFaqSchemaJSON = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Has the NIOS hall ticket for October 2026 been released?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The NIOS hall ticket for the October-November 2026 public examination has been released. Both the theory hall ticket and the practical hall ticket can now be downloaded from the NIOS Student Portal at sdmis.nios.ac.in using your enrollment number."
      }
    },
    {
      "@type": "Question",
      "name": "How do I download the NIOS theory and practical hall ticket 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open sdmis.nios.ac.in, enter your 12-digit enrollment number, choose either Hall Ticket for Theory Examination or Hall Ticket for Practical Examination from the Hall Ticket Type dropdown, and click Submit. Download and print both hall tickets separately."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I download the NIOS Hall Ticket 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can download it only from the official NIOS Student Portal at sdmis.nios.ac.in using your enrollment number. NIOS does not send hall tickets by post or email."
      }
    },
    {
      "@type": "Question",
      "name": "What details do I need to download the NIOS hall ticket?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You only need your 12-digit NIOS enrollment number. Your exam fee must be paid and your photograph updated with NIOS for the hall ticket to generate."
      }
    },
    {
      "@type": "Question",
      "name": "Is the NIOS practical hall ticket different from the theory hall ticket?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, they are two separate documents on the portal. Select Hall Ticket for Theory Examination for your written papers and Hall Ticket for Practical Examination for your practical exams, and carry a printed copy of each to the respective exam."
      }
    },
    {
      "@type": "Question",
      "name": "What if my NIOS hall ticket is not generating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This usually means your exam fee is unpaid or your photograph is missing from NIOS records. Contact your Regional Centre or study centre immediately."
      }
    },
    {
      "@type": "Question",
      "name": "Is it compulsory to carry the NIOS hall ticket to the exam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. NIOS does not permit any candidate to enter the theory or practical exam hall without a printed hall ticket, so carry it along with a valid photo ID."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get my NIOS hall ticket corrected if there is a mistake?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. If you notice any discrepancy in your name, subjects, photograph, or exam centre on your hall ticket, report it to your study centre or NIOS Regional Centre immediately for correction before your exam date."
      }
    }
  ]
}`;

export default function NIOSHallTicket2026({ sections, metaTitle, metaDescription }) {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://sscoaching.in/nios-hall-ticket" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: niosHallTicketFaqSchemaJSON }}
        />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <PageSections sections={sections} />
          </div>
        </div>

        <div className="container">
        <NiosHallTicketFAQ />

        </div>
        <Footer />
      </section>
    </>
  );
}

/**
 * Page content now comes from the DB (PageContent collection) so it can be
 * edited from the admin dashboard. The markup and CSS are unchanged -- the
 * sections render exactly the elements that used to be hardcoded here.
 *
 * If the DB is down or the page is deleted by mistake we fall back to the
 * seed file, otherwise the live page would go blank.
 */
export async function getStaticProps() {
  const SLUG = "nios-hall-ticket";
  const fallback = require("../scripts/seed-data/nios-hall-ticket.json");

  let page = null;

  try {
    const [{ default: dbConnect }, { default: PageContent }] = await Promise.all([
      import("@/lib/dbConnect"),
      import("@/models/PageContent"),
    ]);

    await dbConnect();
    page = await PageContent.findOne({ slug: SLUG, isPublished: true }).lean();
  } catch (err) {
    console.error("nios-hall-ticket: PageContent fetch failed, using seed fallback:", err.message);
  }

  const source = page || fallback;

  const sections = (source.sections || [])
    .filter((s) => s && s.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return {
    props: {
      sections: JSON.parse(JSON.stringify(sections)),
      metaTitle: source.metaTitle || fallback.metaTitle,
      metaDescription: source.metaDescription || fallback.metaDescription,
    },
    revalidate: 60,
  };
}
