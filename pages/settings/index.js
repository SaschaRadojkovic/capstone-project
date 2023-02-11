import { useState } from "react";
import allergens from "../../allergens.json";
import additives from "../../additives.json";
import Card from "@/components/Card";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { atom } from "jotai";
import useSWR from "swr";

import { SVGIcon } from "@/components/SVGIcon";
import { useSession, signIn, signOut } from "next-auth/react";

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

export const initialAdditives = atom([]);

export const initialAllergens = atom([]);

export default function Settings() {
  const [showAdditives, setShowAdditives] = useState(true);

  // if (session) {
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
        <Card
          initialItemList={initialAdditives}
          items={additives}
          alertOptions={{ title: "Alle Additive löschen?" }}
          alertSuccess={{ text: "Alle Additive wurden gelöscht" }}
          model={"additives"}
        />
      ) : (
        <Card
          initialItemList={initialAllergens}
          items={allergens}
          alertOptions={{ title: "Alle Allergene löschen?" }}
          alertSuccess={{ text: "Alle Allergene wurden gelöscht" }}
          model={"allergens"}
        />
      )}
    </>
  );
}
