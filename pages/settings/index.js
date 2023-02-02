import { Fragment, useState } from "react";
import allergens from "../../allergens.json";
import additives from "../../additives.json";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import Card from "@/components/Card";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/Navigation";

import { FooterWrapper, HeaderWrapper, NavBarWrapper } from "..";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const BgImage = dynamic(() => import("../../components/BGImage"), {
  ssr: false,
});

const StyledWrapper = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  justify-content: center;
  align-items: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  margin-left: 50px;
`;

const StyledButtonWrapper = styled.div`
  z-index: 1;
  position: relative;
`;

const initialAdditives = atomWithStorage("additives", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

const initialAllergens = atomWithStorage("allergens", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

export default function Settings() {
  const [showAdditives, setShowAdditives] = useState(true);

  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <StyledWrapper>
        <StyledButtonWrapper>
          <StyledButton
            isActive={showAdditives}
            onClick={() => setShowAdditives(true)}
          >
            Additive
          </StyledButton>

          <StyledButton
            isActive={!showAdditives}
            onClick={() => setShowAdditives(false)}
          >
            Allergene
          </StyledButton>
        </StyledButtonWrapper>

        {showAdditives ? (
          <Card initialItemList={initialAdditives} items={additives} />
        ) : (
          <Card initialItemList={initialAllergens} items={allergens} />
        )}

        <BgImage />
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </StyledWrapper>

      <NavBarWrapper>
        <NavBar style={{ width: "100%" }} />
      </NavBarWrapper>
    </>
  );
}
