import React from 'react';
import { Layout } from './components/layout/layout';
import './styles/common.css';
import './styles/font/font.css';
import { BrowserRouter } from 'react-router-dom';
import { RootRouters } from './routers/rootRouters';

function App() {
  return (
    <>
      <BrowserRouter>
        {/*<Layout />*/}
        <RootRouters />
      </BrowserRouter>
    </>
  );
}

export default App;
