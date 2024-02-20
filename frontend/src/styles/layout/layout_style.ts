import { css } from '@emotion/react';

export const layout_style = css`
  @media (min-width: 1024px) {
    position: absolute;
    width: 1024px;
    max-width: 1024px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const header_style = css`
  height: 4.8rem;
  padding: 0 1rem;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const main_style = css`
  border: 1px solid blue;
  font-size: 2rem;
  height: calc(100vh - 12.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const footer_style = css`
  height: 7.7rem;
  padding: 1.2rem 0 2.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const footer_item_style = css`
  cursor: pointer;
  width: calc(100% / 5);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div {
    font-size: 1.4rem;
    margin-top: 0.4rem;
  }
`;
