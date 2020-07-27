import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '@/stores/stores';

const DemoListItem = () => {
  const { rootStore: { demoStore } } = useStore();
  return (
    <div>身高: {demoStore.zhangjiesheight} 厘米</div>
  );
};

export default observer(DemoListItem);