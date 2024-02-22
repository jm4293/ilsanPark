import React from 'react';
import { main_style } from '../../styles/layout/layout.style';
import { Outlet } from 'react-router-dom';

export const Main = () => {
  return (
    <>
      <div css={main_style}>
        <Outlet />
      </div>
    </>
  );
};
