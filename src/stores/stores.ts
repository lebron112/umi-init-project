import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import DemoStore from './demo-store/demo-store';

interface IStore {
  demoStore: DemoStore;
}

const createStore = (): IStore => {
  return {
    demoStore: new DemoStore(),
  };
};

const rootStore = createStore();

export default rootStore;

export const useStore = () => {
  return { ...React.useContext(MobXProviderContext), rootStore };
};
