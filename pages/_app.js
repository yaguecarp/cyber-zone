import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Cyber Zone</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
