


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

