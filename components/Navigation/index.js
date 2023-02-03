import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 2;
`;

const NavbarLink = styled(Link)`
  bottom: 0;
  color: black;
  text-decoration: none;
  padding: 0.2rem;
  background: ${(props) => (props.active === "on" ? "grey" : "lightgrey")};
  align-items: center;
  font-size: 2rem;
  transition: background 0.5s, color 0.5s;
  &:hover {
    color: white;
    background: grey;
  }
`;

export function NavBar() {
  const { pathname } = useRouter();

  return (
    <>
      <NavBarWrapper>
        <NavbarLink
          active={pathname === "/barcodeScanner" ? "on" : "off"}
          href="/barcodeScanner"
        >
          scan
        </NavbarLink>
        <NavbarLink
          active={pathname === "/settings" ? "on" : "off"}
          href="/settings"
        >
          settings
        </NavbarLink>
      </NavBarWrapper>
    </>
  );
}
