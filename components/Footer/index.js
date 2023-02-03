import styled from "styled-components";

export const FooterWrapper = styled.footer`
  bottom: 0;
  padding-top: 2rem;
  box-shadow: 1px 1px 10px;
  background: #6bba6d;
  width: 100%;
  height: 80px;
  position: fixed;
`;

export function Footer() {
  return <FooterWrapper />;
}
