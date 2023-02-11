import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import GlobalStyle from "@/styles";
import dynamic from "next/dynamic";
import Head from "next/head";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
const BgImage = dynamic(() => import("@/components/BGImage"), {
  ssr: false,
});

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <SWRConfig value={{ fetcher }}>
          <Head>
            <title>Eatable</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="color-scheme" content="light only" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <GlobalStyle />
          <Header />
          <Component {...pageProps}></Component>
          <BgImage />
          <Footer />
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
