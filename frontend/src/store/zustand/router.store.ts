import { create } from 'zustand';
import * as process from 'process';

interface State {
  base_url: string;
}

export const useRouterStore = create<State>((set) => ({
  base_url: process.env.REACT_APP_BASE_URL || '',
}));
