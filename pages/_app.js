




// // pages/_app.js
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@/styles/globals.css';
// import { useEffect } from 'react';
// import { Toaster } from "sonner";
// import Head from 'next/head';
// import Script from 'next/script';

// function MyApp({ Component, pageProps }) {

//   // Bootstrap JS loads only on client (non-blocking)
//   useEffect(() => {
//     import('bootstrap/dist/js/bootstrap.bundle.min.js');
//   }, []);

//   return (
//     <>
//       <Head>
//         {/* Google Fonts optimized */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

//         <link
//           href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
//           rel="stylesheet"
//         />

//         <link
//           href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
//           rel="stylesheet"
//         />
//       </Head>

//       <Component {...pageProps} />
//       <Toaster richColors position="top-right" />

//       {/* ✅ Supercounter (DO NOT CHANGE sc_project ID) */}
//        {/* Supercounter */}
// <Script
//   id="supercounter"
//   strategy="afterInteractive"
//   dangerouslySetInnerHTML={{
//     __html: `
//       var sc_project=581586;
//       var sc_invisible=1;
//     `,
//   }}
// />
// <Script
//   src="https://www.supercounters.com/online_i.js"
//   strategy="afterInteractive"
// />

//     </>
//   );
// }

// export default MyApp;






// // pages/_app.js
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@/styles/globals.css';
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { Toaster } from "sonner";
// import Head from 'next/head';
// import Script from 'next/script';

// function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   // Bootstrap JS (client only)
//   useEffect(() => {
//     import('bootstrap/dist/js/bootstrap.bundle.min.js');
//   }, []);

//   // 🔥 SUPERCOUNTER FIX — reload on route change
//   useEffect(() => {
//     const handleRouteChange = () => {
//       if (window.sc_project) {
//         const oldScript = document.getElementById("supercounter-js");
//         if (oldScript) oldScript.remove();

//         const script = document.createElement("script");
//         script.src = "https://www.supercounters.com/online_i.js";
//         script.async = true;
//         script.id = "supercounter-js";
//         document.body.appendChild(script);
//       }
//     };

//     router.events.on("routeChangeComplete", handleRouteChange);
//     return () => {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [router.events]);

//   return (
//     <>
//       <Head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

//         <link
//           href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100..900&display=swap"
//           rel="stylesheet"
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
//           rel="stylesheet"
//         />
//       </Head>

//       <Component {...pageProps} />
//       <Toaster richColors position="top-right" />

//       {/* ✅ Supercounter base config */}
//       <Script
//         id="supercounter-config"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//             var sc_project=581586;
//             var sc_invisible=1;
//           `,
//         }}
//       />

//       <Script
//         id="supercounter-js"
//         src="https://www.supercounters.com/online_i.js"
//         strategy="afterInteractive"
//       />
//     </>
//   );
// }

// export default MyApp;




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
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);


  return (
    <>
      <Head>
        {/* <!-- Google Search Console Verification --> */}
         <meta name="google-site-verification" content="u4uLVEr7luIqu3vdMVQ_ef5jVyiotOBcVuImXZCthCE" />
         <meta name="google-site-verification" content="QoOhqK5CHWXyjbIZF-iesLPbhUupUkgFqNLc7LgiTvk" />
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
    {/* ✅ Meta Pixel */}
    {/* ========================= */}
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}
        (window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', '1032968578803017');
        fbq('track', 'PageView');
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

    {/* ========================= */}
    {/* ✅ Your App Content */}
    {/* ========================= */}

      {/* ✅ Fonts applied globally without blocking */}
      <div className={`${beVietnam.className} ${outfit.className}`}>
        <Component {...pageProps} />
      </div>

      <Toaster richColors position="top-right" />
  
    </>
  );
}

export default MyApp;

