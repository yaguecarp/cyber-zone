import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Head from "next/head";
import { UserContextProvider } from "@/components/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserContextProvider>
        <Layout>
          <Head>
            <title>Cyber Zone</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </>
  );
}
