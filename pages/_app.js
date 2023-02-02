import { NavBar } from "@/components/Navigation";
import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";
import Image from "next/image";
import styled from "styled-components";

const fetcher = async (url) => {
  const res = await fetch(url);
  const StyledNavBar = styled(NavBar)`
    z-index: 2;
    width: 100%;
    height: 100%;
    position: fixed;
    justify-content: center;
    align-items: center;
    display: flex;
  `;

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
      </SWRConfig>
    </>
  );
}
