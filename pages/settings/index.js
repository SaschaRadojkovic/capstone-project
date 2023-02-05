import { useState } from "react";
import allergens from "../../allergens.json";
import additives from "../../additives.json";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import Card from "@/components/Card";
import styled from "styled-components";
import dynamic from "next/dynamic";

const BgImage = dynamic(() => import("../../components/BGImage"), {
  ssr: false,
});

const StyledWrapper = styled.div`
  margin: 1.5rem;
`;

const StyledButton = styled.button`
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  color: ${(props) => (props.isActive ? "black" : "grey")};
  background: none;
  border: ${(props) => (props.isActive ? "1px solid black" : "1px solid grey")};
  font-size: inherit;
  cursor: pointer;
  padding: 15px;
  border-radius: 0.4rem;
  background-color: ${(props) => (props.isActive ? "#E2D194" : "#EFE7CC")};
  flex: 0 0 50%;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 60px;
  width: calc(100vw - 4rem);
  gap: 1rem;
`;
const StyledContent = styled.div`
  margin: 1.5rem;
  margin-top: 8rem;
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
      </StyledWrapper>

      {showAdditives ? (
        <Card initialItemList={initialAdditives} items={additives} />
      ) : (
        <Card initialItemList={initialAllergens} items={allergens} />
      )}
    </>
  );
}
