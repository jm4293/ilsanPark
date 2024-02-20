import React from 'react';
import { Header } from './header';
import { Main } from './main';
import { Footer } from './footer';
import { layout_style } from '../../styles/layout/layout_style';

export const Layout = () => {
  return (
    <div css={layout_style}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
