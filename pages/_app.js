import { NavBar } from "@/components/Navigation";
import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig>
        <GlobalStyle />
        <Head>
          <title>Eatable</title>
        </Head>

        <Component {...pageProps} />
        <NavBar />
      </SWRConfig>
    </>
  );
}
