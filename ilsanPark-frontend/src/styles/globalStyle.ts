import { css } from '@emotion/react';

export const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 10px;

    @media (min-width: 1024px) {
      padding: 0 20rem;
    }
  }

  button {
    cursor: pointer;
    padding: 0 20px;
  }
`;
