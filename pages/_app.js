import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/Navigation";
import GlobalStyle from "@/styles";
import dynamic from "next/dynamic";
import Head from "next/head";
import { SWRConfig } from "swr";
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

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Head>
          <title>Eatable</title>
        </Head>
        <Component {...pageProps}></Component>
        {/* <Header /> */}
        <BgImage />
        <Footer />
        <NavBar />
      </SWRConfig>
    </>
  );
}
