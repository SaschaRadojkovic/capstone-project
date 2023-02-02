import styled from "styled-components";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/Navigation";

const BgImage = dynamic(() => import("../components/BGImage"), {
  ssr: false,
});

const Wrapper = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  justify-content: center;
  align-items: center;
`;

export default function HomePage() {
  return (
    <>
      <Wrapper>
        <h1>Welcome to Eatable</h1>
        <p>first go to the settings page </p>
        <NavBar />
      </Wrapper>
      <BgImage />
    </>
  );
}
