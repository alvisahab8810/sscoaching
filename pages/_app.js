


// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';


import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from "sonner";
import Head from 'next/head';
import Script from 'next/script';

// ✅ Next.js optimized fonts (removes render-blocking)
import { Be_Vietnam_Pro, Outfit } from 'next/font/google';
import AnnouncementBar from '@/components/home/AnnouncementBar';
AnnouncementBar
const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Bootstrap JS (client only)
  // useEffect(() => {
  //   import('bootstrap/dist/js/bootstrap.bundle.min.js');
  // }, []);


  useEffect(() => {
  import('bootstrap/dist/js/bootstrap.bundle.min.js');
  fetch("/api/faqs").catch(() => {}); // ← warm up DB
}, []);

  return (


    
    <>
      <Head>
        {/* <!-- Google Search Console Verification --> */}
         {/* <meta name="google-site-verification" content="u4uLVEr7luIqu3vdMVQ_ef5jVyiotOBcVuImXZCthCE" />
         <meta name="google-site-verification" content="QoOhqK5CHWXyjbIZF-iesLPbhUupUkgFqNLc7LgiTvk" /> */}

          <meta name="google-site-verification" content="u4uLVEr7luIqu3vdMVQ_ef5jVyiotOBcVuImXZCthCE" />
          <meta name="google-site-verification" content="QoOhqK5CHWXyjbIZF-iesLPbhUupUkgFqNLc7LgiTvk" />
          <meta name="google-site-verification" content="Qo0HqK5CHWXyjbiZF-iesLPbhUupUkgFqNLc7LgiTVk" />
          {router.pathname.startsWith('/faq/') && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    { "@type": "Question", "name": "Is NIOS valid for government jobs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NIOS certificates are recognized by the Government of India and are valid for government jobs, higher education, and competitive exams." } },
                    { "@type": "Question", "name": "Is the NIOS certificate valid for higher education and college admission in India?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the NIOS board is recognized by the Government of India. Students who complete their education through NIOS can apply for higher education courses, college admissions, competitive exams, and government or private sector jobs. Many universities and colleges accept NIOS certificates for admission." } },
                    { "@type": "Question", "name": "Is NIOS easier than regular school?", "acceptedAnswer": { "@type": "Answer", "text": "NIOS provides flexible learning and multiple exam opportunities, which makes it easier for many students to complete their education at their own pace." } },
                    { "@type": "Question", "name": "Can I prepare for competitive exams like JEE, NEET, or CLAT along with NIOS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NIOS allows students to manage their time effectively, making it easier to prepare for competitive exams like JEE, NEET, CLAT, and more alongside their board studies." } },
                    { "@type": "Question", "name": "Who can apply for NIOS admission in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Students who want to complete their 10th or 12th education, including school dropouts, working students, students who failed board exams, and learners looking for a flexible education system can apply for NIOS admission in Lucknow." } },
                    { "@type": "Question", "name": "How long does NIOS admission take?", "acceptedAnswer": { "@type": "Answer", "text": "The admission process is usually completed within a few days once all documents are submitted and the online form is approved." } },
                    { "@type": "Question", "name": "How can I apply for NIOS admission in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "You can apply by visiting SS Coaching or contacting their team. They guide you through registration, document submission, and subject selection to make the process simple and smooth." } },
                    { "@type": "Question", "name": "What is the process for NIOS admission in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "The NIOS admission process in Lucknow includes course selection, online registration, document submission, and coaching support for exam preparation." } },
                    { "@type": "Question", "name": "Can failed students complete 10th or 12th through NIOS coaching in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, students who failed in board exams can join NIOS coaching for failed students in Lucknow and complete their secondary or senior secondary education." } },
                    { "@type": "Question", "name": "Where can I find a trusted NIOS center in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching provides complete support for students who want to complete their Class 10th or 12th through NIOS. With expert guidance and a supportive environment, students can easily continue their education. They have branches in Hazratganj, Indira Nagar, and Alambagh." } },
                    { "@type": "Question", "name": "Is SS Coaching the NIOS head office in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching is not the official NIOS office. However, they provide complete admission guidance and coaching support for NIOS students in Lucknow." } },
                    { "@type": "Question", "name": "Which areas in Lucknow does SS Coaching cover?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching has branches in Hazratganj, Indira Nagar, and Alambagh, making it easy for students across Lucknow to access their NIOS coaching and admission services." } },
                    { "@type": "Question", "name": "Which is the best NIOS coaching in Hazratganj Lucknow for 10th and 12th students?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching is considered one of the most trusted institutes for NIOS coaching in Hazratganj Lucknow for 10th and 12th students. The institute provides experienced teachers, structured study material, and proper exam preparation guidance, helping students perform confidently in NIOS board examinations." } },
                    { "@type": "Question", "name": "Which is the best NIOS coaching in Indra Nagar Lucknow for 10th and 12th students?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching is widely known as one of the best institutes for NIOS coaching in Indra Nagar Lucknow, providing expert faculty, structured classes, and complete exam preparation support for 10th and 12th students." } },
                    { "@type": "Question", "name": "Which is the best NIOS coaching in Alambagh Lucknow for 10th and 12th students?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching is considered one of the best options for NIOS coaching in Alambagh Lucknow for 10th and 12th students, offering expert faculty and complete exam preparation guidance." } },
                    { "@type": "Question", "name": "Which is the best NIOS institute in Lucknow for admission and coaching?", "acceptedAnswer": { "@type": "Answer", "text": "Students looking for the best NIOS institute in Lucknow for admission and coaching often choose SS Coaching because of its experienced teachers, supportive environment, and proven academic results." } },
                    { "@type": "Question", "name": "Is there a NIOS study center in Alambagh Lucknow for board exam preparation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, SS Coaching operates as a trusted NIOS study center in Alambagh Lucknow for 10th and 12th exam preparation with experienced teachers and structured classes." } },
                    { "@type": "Question", "name": "Why should students choose a NIOS coaching center in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Joining a NIOS coaching center in Lucknow helps students receive professional academic guidance and structured preparation. Coaching institutes provide regular classes, doubt-clearing sessions, and exam practice that help students understand the syllabus more effectively and improve their chances of passing the NIOS exams successfully." } },
                    { "@type": "Question", "name": "What subjects are available in NIOS coaching for 10th and 12th in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Students joining NIOS coaching for 10th and 12th in Lucknow can choose from a variety of subjects including English, Hindi, Mathematics, Science, Social Science, Business Studies, Economics, and other optional subjects depending on their course and career goals." } },
                    { "@type": "Question", "name": "How long does it take to complete NIOS 10th or 12th in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "The duration depends on the student's learning pace and examination schedule. NIOS offers flexible learning options, and many students complete their 10th or 12th within the same academic year depending on their preparation and exam availability." } },
                    { "@type": "Question", "name": "What is the fee for NIOS coaching and admission in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "The fee for NIOS coaching and admission in Lucknow depends on the course, number of subjects, and exam stream selected by the student. Please contact SS Coaching directly for the latest fee details." } },
                    { "@type": "Question", "name": "Is NIOS coaching available for 10th class students in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, SS Coaching provides NIOS coaching for 10th class students in Lucknow, including subject-wise teaching, study materials, and exam preparation strategies." } },
                    { "@type": "Question", "name": "Where can I find NIOS coaching for 12th in Indra Nagar Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Students can join SS Coaching for NIOS coaching for 12th in Indra Nagar Lucknow, where experienced teachers guide them through the NIOS syllabus and examination pattern." } },
                    { "@type": "Question", "name": "Can I take coaching with NIOS admission?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, many institutes provide NIOS coaching and admission support in Lucknow to help students prepare better for their exams while completing the admission process simultaneously." } },
                    { "@type": "Question", "name": "Is coaching necessary for NIOS students?", "acceptedAnswer": { "@type": "Answer", "text": "While NIOS is a flexible system, proper coaching helps students understand the syllabus better, stay consistent, and perform well in exams with confidence." } },
                    { "@type": "Question", "name": "How can I take NIOS admission in Hazratganj Lucknow for 10th or 12th?", "acceptedAnswer": { "@type": "Answer", "text": "Students who want NIOS admission in Hazratganj Lucknow for 10th or 12th can visit SS Coaching for complete guidance. The institute helps students with the entire admission process including subject selection, document verification, online registration, and exam preparation." } },
                    { "@type": "Question", "name": "How can I take NIOS admission in Indra Nagar Lucknow with coaching support?", "acceptedAnswer": { "@type": "Answer", "text": "Students can easily complete NIOS admission in Indra Nagar Lucknow with coaching guidance by visiting SS Coaching, where experts help with registration, subject selection, and document verification." } },
                    { "@type": "Question", "name": "How can I get NIOS admission in Alambagh Lucknow with coaching support?", "acceptedAnswer": { "@type": "Answer", "text": "Students can take NIOS admission in Alambagh Lucknow with coaching support by visiting SS Coaching, where teachers guide them through the registration process, subject selection, and exam preparation." } },
                    { "@type": "Question", "name": "Who should join NIOS coaching in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Students who could not complete their studies through regular schooling should join NIOS coaching in Lucknow. This includes students who failed in board exams, school dropouts, working students, or learners looking for a flexible education system that allows them to complete education at their own pace." } },
                    { "@type": "Question", "name": "Is NIOS coaching available for both 10th and 12th classes in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, SS Coaching provides NIOS coaching for both 10th and 12th classes in Lucknow with subject-wise teaching and exam preparation support." } }
                  ]
                })
              }}
            />
          )}
      </Head>
      

        {/* ========================= */}
    {/* ✅ Google Tag Manager */}
    {/* ========================= */}
    <Script id="gtm-script" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id=GTM-NRB9MG28'+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NRB9MG28');
      `}
    </Script>


     {/* ========================= */}
    {/* ✅ Google Analytics + Ads */}
    {/* ========================= */}
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-C161K5LKC7"
      strategy="afterInteractive"
    />

    <Script id="ga-ads-script" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-C161K5LKC7');
        gtag('config', 'AW-11087287759');
        gtag('config', 'AW-11159082776');
        gtag('config', 'AW-16913091466');
        gtag('config', 'AW-17044419719');
        gtag('config', 'AW-17094613051');
      `}
    </Script>

   

     
    {/* ========================= */}
    {/* ✅ GTM Noscript */}
    {/* ========================= */}
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-NRB9MG28"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>

  
      {/* ✅ Fonts applied globally without blocking */}
      <div className={`${beVietnam.className} ${outfit.className}`}>
        
        <Component {...pageProps} />
         {!router.pathname.startsWith("/dashboard") && <AnnouncementBar />}

       
      </div>

      <Toaster richColors position="top-right" />
  
    </>
  );
}

export default MyApp;

