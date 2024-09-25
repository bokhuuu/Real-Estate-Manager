import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'FiraGO', sans-serif;
    line-height: 20px;
  }

  #root {
    width: 1920px;
    min-height: 100vh;
    margin: 0 auto;
  }

  input, select {
    height:30px
  }
`;

export default GlobalStyle;
