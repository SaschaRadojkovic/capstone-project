// import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";

export const HeaderWrapper = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  color: white;
  font-size: 2rem;
  text-align: center;
  box-shadow: 0 0 10px 2px rgb(0, 0, 0);
  background: #6bba6d;
  width: 100%;
  height: 50px;
  justify-content: center;
`;
// const StyledLoginIcon = styled(SVGIcon)``;

// const StyledLoginButton = styled.button`
//   position: absolute;
//   right: 0;
//   top: 0.37rem;
//   background: none;
//   border: none;
//   padding: 0;
//   font-size: inherit;
//   cursor: pointer;
//   color: inherit;
// `;

const StyledTitle = styled.h1`
  margin-top: 0.94rem;
`;
export function Header() {
  // const { data: session } = useSession;
  // console.log("CLIEN_SESSION", session);
  return (
    <HeaderWrapper>
      <SVGIcon variant="logo" width="40px"></SVGIcon>

      <StyledTitle>eatable</StyledTitle>
      {/* <StyledButton
        type="button"
        onClick={() => {
          signIn();
        }}
      >
        <StyledLoginIcon variant="login" width="40px" />
      </StyledButton> */}
    </HeaderWrapper>
  );
}
