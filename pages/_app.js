




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




// // pages/_app.js
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@/styles/globals.css';

// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { Toaster } from "sonner";
// import Head from 'next/head';
// import Script from 'next/script';

// // ✅ Next.js optimized fonts (removes render-blocking)
// import { Be_Vietnam_Pro, Outfit } from 'next/font/google';

// const beVietnam = Be_Vietnam_Pro({
//   subsets: ['latin'],
//   weight: ['100','200','300','400','500','600','700','800','900'],
//   display: 'swap',
// });

// const outfit = Outfit({
//   subsets: ['latin'],
//   weight: ['100','200','300','400','500','600','700','800','900'],
//   display: 'swap',
// });

// function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   // Bootstrap JS (client only)
//   useEffect(() => {
//     import('bootstrap/dist/js/bootstrap.bundle.min.js');
//   }, []);

//   // 🔥 SUPERCOUNTER FIX — reload on every route change
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
//         {/* Head kept intentionally – no font links now */}
//       </Head>

//       {/* ✅ Fonts applied globally without blocking */}
//       <div className={`${beVietnam.className} ${outfit.className}`}>
//         <Component {...pageProps} />
//       </div>

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

// Fonts (UNCHANGED)
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

// ✅ YOUR GA4 MEASUREMENT ID
const GA_MEASUREMENT_ID = 'G-9CHVHWT8CN';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Bootstrap JS (client only)
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  // ✅ Track SPA page views
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* ✅ Google Analytics base script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* ✅ Google Analytics init */}
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Head />

      {/* Fonts applied globally */}
      <div className={`${beVietnam.className} ${outfit.className}`}>
        <Component {...pageProps} />
      </div>

      <Toaster richColors position="top-right" />
    </>
  );
}

export default MyApp;
