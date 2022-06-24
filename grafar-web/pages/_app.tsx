import { Fragment } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.scss";

toast.configure({
  autoClose: 5000,
  draggable: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>GRAFAR App</title>
        <meta
          name="description"
          content="2D and 3D mathematical functions plotter"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
