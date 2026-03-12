import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
         <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/online-classes.css" />
          <link rel="stylesheet" href="/assets/css/responsive.css" />

      </Head>
      <body>
        <Main />
        <NextScript />

          {/* Prevent Google Translate from shifting page top */}
        <style>{`
          body { top: 0 !important; }
          .goog-te-banner-frame { display: none !important; }
        `}</style>
      </body>
    </Html>
  );
}

