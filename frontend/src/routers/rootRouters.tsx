import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { Layout } from '../components/layout/layout';
import { Landing } from '../pages/landing/landing';
import { ChargingStation } from '../pages/chargingStation/chargingStation';
import { Wallet } from '../pages/wallet/wallet';
import { MyCar } from '../pages/myCar/myCar';
import { Setting } from '../pages/setting/setting';
import { useRouterStore } from '../data/zustand/router.store';

export const RootRouters = () => {
  const BASE_URL = useRouterStore((state) => state.base_url);

  console.log('BASE_URL', BASE_URL);

  return (
    <Routes>
      <Route path={BASE_URL} element={<Landing />} />

      <Route element={<Layout />}>
        <Route path={BASE_URL + '/home'} element={<Home />} />
        <Route path={BASE_URL + '/charging'} element={<ChargingStation />} />
        <Route path={BASE_URL + '/wallet'} element={<Wallet />} />
        <Route path={BASE_URL + '/mycar'} element={<MyCar />} />
        <Route path={BASE_URL + '/setting'} element={<Setting />} />
      </Route>
    </Routes>
  );
};
