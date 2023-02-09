import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";

export const NavBarWrapper = styled.div`
  display: flex;
  padding-top: 0.3rem;
`;

const NavbarLink = styled(Link)`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  color: black;
  text-decoration: none;
  color: ${(props) => (props.active === "on" ? "white" : "black")};
  transition: background 0.5s, color 0.5s;
  &:hover {
    color: white;
  }
`;

export function NavBar() {
  const { pathname } = useRouter();

  return (
    <NavBarWrapper>
      <NavbarLink active={pathname === "/" ? "on" : "off"} href="/">
        <SVGIcon variant="information" width="40px" />
      </NavbarLink>
      <NavbarLink
        active={pathname === "/barcodeScanner" ? "on" : "off"}
        href="/barcodeScanner"
      >
        <SVGIcon variant="scanner" width="40px" />
      </NavbarLink>
      <NavbarLink
        active={pathname === "/saved" ? "on" : "off"}
        href="/products"
      >
        <SVGIcon variant="saved" width="40px" />
      </NavbarLink>
      <NavbarLink
        active={pathname === "/settings" ? "on" : "off"}
        href="/settings"
      >
        <SVGIcon variant="settings" width="40px" />
      </NavbarLink>
    </NavBarWrapper>
  );
}
