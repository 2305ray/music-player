import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    font-family: Inter, sans-serif;
    font-size: 1rem;

  }

  h1 {
    font-size: 1rem;
    font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
}

  p {
    font-size: 0.875rem;
    font-weight: 200;
  }
`;
