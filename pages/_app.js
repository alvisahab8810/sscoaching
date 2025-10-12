// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'; // your custom global styles
import { useEffect } from 'react';
// import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Import Bootstrap JS dynamically for client-side only
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      {/* <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
      </Head> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
