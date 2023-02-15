import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";

export const HeaderWrapper = styled.header`
  z-index: 1;
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

const StyledTitle = styled.h1`
  margin-top: 0.94rem;
`;
export function Header() {
  return (
    <HeaderWrapper>
      <SVGIcon
        aria-label="Ihr Benutzer Bild"
        variant="logo"
        width="40px"
      ></SVGIcon>
      <StyledTitle>eatable</StyledTitle>
    </HeaderWrapper>
  );
}
