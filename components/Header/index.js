import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";

export const HeaderWrapper = styled.header`
  display: flex;
  flexdirection: row;
  position: fixed;
  top: 0;
  color: white;
  font-size: 2rem;
  text-align: center;
  box-shadow: 0px 0px 10px 2px rgb(0, 0, 0);
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
      <SVGIcon variant="logo" width="40px"></SVGIcon>
      <StyledTitle>eatable</StyledTitle>
    </HeaderWrapper>
  );
}
