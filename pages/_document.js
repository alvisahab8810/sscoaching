import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
         <Head>

           <meta name="google-site-verification" content="u4uLVEr7luIqu3vdMVQ_ef5jVyiotOBcVuImXZCthCE" />
           <meta name="google-site-verification" content="QoOhqK5CHWXyjbIZF-iesLPbhUupUkgFqNLc7LgiTvk" />
           <meta name="google-site-verification" content="Qo0HqK5CHWXyjbiZF-iesLPbhUupUkgFqNLc7LgiTVk" />



        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/online-classes.css" />
          <link rel="stylesheet" href="/assets/css/responsive.css" />

      </Head>
      <body>
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

