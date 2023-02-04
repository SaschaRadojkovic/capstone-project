import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";

export const NavBarWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  bottom: 0;
  z-index: 2;

  @media (max-width: 768px) {
    gap: 60px;
    left: 140px;
  }
  @media (min-width: 375px) {
    gap: 80px;
    left: 170px;
  }
  @media (min-width: 425px) {
    gap: 100px;
    left: 190px;
  }
  @media (min-width: 768px) {
    gap: 280px;
    left: 365px;
  }
`;

const NavbarLink = styled(Link)`
  bottom: 0;
  color: black;
  text-decoration: none;
  color: ${(props) => (props.active === "on" ? "white" : "black")};
  ransition: background 0.5s, color 0.5s;
  &:hover {
    color: white;
    // background: grey;
  }
`;

export function NavBar() {
  const { pathname } = useRouter();

  return (
    <NavBarWrapper>
      <NavbarLink
        active={pathname === "/barcodeScanner" ? "on" : "off"}
        href="/barcodeScanner"
      >
        <SVGIcon variant="scanner" width="50px" />
      </NavbarLink>
      <NavbarLink
        active={pathname === "/settings" ? "on" : "off"}
        href="/settings"
      >
        <SVGIcon variant="settings" width="50px" />
      </NavbarLink>
    </NavBarWrapper>
  );
}
