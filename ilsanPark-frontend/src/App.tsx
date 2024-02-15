import React from 'react';
import { Global } from '@emotion/react';
import { globalStyle } from './styles/globalStyle';
import { Layout } from './components/layout/layout';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <Layout />
    </>
  );
}

export default App;
