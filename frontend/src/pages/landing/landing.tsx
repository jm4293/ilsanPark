import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as process from 'process';
import { useRouterStore } from '../../data/zustand/router.store';

export const Landing = () => {
  const navigate = useNavigate();
  const BASE_URL = useRouterStore((state) => state.base_url);

  return (
    <>
      <div>Landing</div>
      <button onClick={() => navigate('/' + BASE_URL + '/home')}>이동하기</button>
    </>
  );
};
