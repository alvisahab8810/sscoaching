import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
         <Head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
        <meta name="google-site-verification" content="u4uLVEr7luIqu3vdMVQ_ef5jVyiotOBcVuImXZCthCE" />
        <meta name="google-site-verification" content="QoOhqK5CHWXyjbIZF-iesLPbhUupUkgFqNLc7LgiTvk" />
        <meta name="google-site-verification" content="Qo0HqK5CHWXyjbiZF-iesLPbhUupUkgFqNLc7LgiTVk" />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P4ZSQ2B6');`,
          }}
        />
        {/* End Google Tag Manager */}

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"/>
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/online-classes.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P4ZSQ2B6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />

          {/* Prevent Google Translate from shifting page top */}
       <style>{`
          /* Kill the top banner completely */
          .goog-te-banner-frame,
          .goog-te-banner-frame.skiptranslate,
          #goog-gt-tt,
          .goog-te-balloon-frame,
          div#goog-gt- { 
            display: none !important; 
            visibility: hidden !important;
          }
 
          /* Prevent body from being pushed down */
          body {
            top: 0 !important;
            position: static !important;
          }
 
          /* Fix mobile header overlap */
          .goog-te-menu-frame {
            max-height: 100% !important;
          }
        `}</style>
      </body>
    </Html>
  );
}

