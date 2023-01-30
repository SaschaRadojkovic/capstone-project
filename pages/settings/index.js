import { useState } from "react";
import allergens from "../../allergens.json";
import additives from "../../additives.json";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import Card from "@/components/Card";
import styled from "styled-components";

const StyledButton = styled.button`
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
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
      <StyledButton
        isActive={showAdditives}
        onClick={() => setShowAdditives(true)}
      >
        Additives
      </StyledButton>

      <StyledButton
        isActive={!showAdditives}
        onClick={() => setShowAdditives(false)}
      >
        Allergens
      </StyledButton>

      {showAdditives ? (
        <Card initialItemList={initialAdditives} items={additives} />
      ) : (
        <Card initialItemList={initialAllergens} items={allergens} />
      )}
    </>
  );
}
