import styled from "styled-components";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/Navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Welcome } from "@/components/Welcome";

const BgImage = dynamic(() => import("../components/BGImage"), {
  ssr: false,
});

const Wrapper = styled.div`
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  justify-content: center;
  align-items: center;
`;

// export const HeaderWrapper = styled.div`
//   z-index: 5;
//   top: 0;
//   color: white;
//   font-size: 3rem;
//   text-align: center;
//   padding-top: 1.5rem;
//   box-shadow: 0px 0px 10px 2px rgb(0, 0, 0);

//   background: #6bba6d;
//   width: 100%;
//   height: 80px;
//   position: fixed;
//   justify-content: center;
// `;
// const WelcomeWrapper = styled.div`
//   top: 200px;
//   z-index: 2;
//   text-align: center;
// `;

export const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 5;
`;

// export const FooterWrapper = styled.div`
//   z-index: 4;
//   bottom: 0;
//   padding-top: 2rem;
//   box-shadow: 1px 1px 10px;
//   background: #6bba6d;
//   width: 100%;
//   height: 80px;
//   position: fixed;
// `;

export default function HomePage() {
  return (
    <>
      {/* <HeaderWrapper> */}
      <Header />
      {/* </HeaderWrapper> */}
      <Welcome />
      {/* <WelcomeWrapper>
        <h1>Welcome to Eatable</h1>
        <p>first go to the settings page </p>
      </WelcomeWrapper> */}
      <Wrapper>
        {/* <NavBarWrapper> */}
        <NavBar style={{ width: "100%" }} />
        {/* </NavBarWrapper> */}
        <BgImage />
        {/* <FooterWrapper> */}
        <Footer />
        {/* </FooterWrapper> */}
      </Wrapper>
    </>
  );
}
