import { SVGIcon } from "@/components/SVGIcon";
import { Welcome } from "@/components/Welcome";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

const StyledLogButton = styled.button`
  z-index: 1;
  position: fixed;
  top: 0.65rem;
  right: 0.2rem;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  color: ${(props) => (props.variant === "black" ? "black" : "white")};
`;
const StyledImage = styled(Image)`
  z-index: 1;
  border: 3px solid white;
  position: fixed;
  top: 0.47rem;
  right: 2.5rem;
  border-radius: 50%;
`;

export default function HomePage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Welcome />
        <StyledLogButton
          type="button"
          variant="white"
          onClick={() => signOut("github")}
        >
          <SVGIcon variant="logout" width="30px" />
        </StyledLogButton>
        <StyledImage
          src={session.user.image}
          alt={session.user.image}
          width="35"
          height="35"
        />
      </>
    );
  } else {
    return (
      <>
        <Welcome />
        <StyledLogButton
          type="button"
          variant="black"
          onClick={() => signIn("github")}
        >
          <SVGIcon variant="login" width="30px" />
        </StyledLogButton>
      </>
    );
  }
}
