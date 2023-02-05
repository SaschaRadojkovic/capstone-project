import styled from "styled-components";
import { NavBar } from "../Navigation";

export const FooterWrapper = styled.footer`
  bottom: 0;
  // padding-top: 2rem;
  box-shadow: 1px 1px 10px;
  background: #6bba6d;
  width: 100%;
  height: 50px;
  position: fixed;
`;

export function Footer() {
  return (
    <FooterWrapper>
      <NavBar />
    </FooterWrapper>
  );
}
