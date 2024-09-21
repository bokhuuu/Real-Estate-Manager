import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'FiraGO', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }

  #root {
    max-width: 1920px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
