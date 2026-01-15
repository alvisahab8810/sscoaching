// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { useEffect } from 'react';
import { Toaster } from "sonner";
import Head from 'next/head';
function MyApp({ Component, pageProps }) {

  useEffect(() => {

    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
     <Head>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
       <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>


       <link rel="preconnect" href="https://fonts.googleapis.com"/>
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
       <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet"></link>
     </Head>
      <Component {...pageProps} />

       <Toaster richColors position="top-right" />
    </>
  );
}

export default MyApp;
