import { observer } from 'mobx-react-lite';
import React from 'react';
import cssExports from './DemoCard.less';

const DemoCard = () => {

  return (
    <div className={cssExports.card_box}>这是一个组件 democard</div>
  );
};

export default observer(DemoCard);
