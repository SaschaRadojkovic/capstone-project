import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    // background-color:#6BBA6D;
    margin: 0;
   font-family: system-ui;
  }
`;
