import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";

export const HeaderWrapper = styled.header`
  top: 0;
  color: white;
  font-size: 3rem;
  text-align: center;
  padding-top: 1.5rem;
  box-shadow: 0px 0px 10px 2px rgb(0, 0, 0);
  background: #6bba6d;
  width: 100%;
  height: 80px;
  position: fixed;
  justify-content: center;
`;
export function Header() {
  return (
    <HeaderWrapper>
      <SVGIcon variant="logo" width="50px"></SVGIcon>eatable
    </HeaderWrapper>
  );
}
