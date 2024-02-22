import { css } from '@emotion/react';

export const landing_skip_style = css`
  position: absolute;
  border: 1px solid red;
`;

const landing_slider_item_common_style = css`
  width: 100%;
  height: 100vh;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const landing_slider_item1_style = css`
  ${landing_slider_item_common_style};
  background-color: lightblue;
`;

export const landing_slider_item2_style = css`
  ${landing_slider_item_common_style};
  background-color: lightgreen;
`;

export const landing_slider_item3_style = css`
  ${landing_slider_item_common_style};
  background-color: lightgray;
`;

export const landing_slider_item4_style = css`
  ${landing_slider_item_common_style};
  background-color: lightyellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const landing_button_style = css`
  position: absolute;
  bottom: 5rem;
  height: 5.6rem;
  font-size: 1.6rem;
  border-radius: 1.2rem;
  width: 90%;
  background-color: rgb(55, 140, 136);
  border: none;
  color: white;
`;
