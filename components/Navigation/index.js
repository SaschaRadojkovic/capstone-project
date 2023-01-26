import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const NavbarLink = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 0.2rem;
  background: ${(props) => (props.active === "true" ? "grey" : "lightgrey")};
  align-items: center;
  font-size: 2rem;
  transition: background 0.5s, color 0.5s;
  &:hover {
    color: white;
    background: grey;
  }
`;

export function NavBar() {
  const [currentPage, setCurrentPage] = useState(1);
  function handlePageChange(page) {
    setCurrentPage(page);
  }
  return (
    <>
      <NavbarLink
        onClick={() => handlePageChange(1)}
        active={currentPage === 1 ? "true" : "false"}
        href="/barcodeScanner"
      >
        scan
      </NavbarLink>
      <NavbarLink
        onClick={() => handlePageChange(2)}
        active={currentPage === 2 ? "true" : "false"}
        href="/settings"
      >
        settings
      </NavbarLink>
    </>
  );
}
