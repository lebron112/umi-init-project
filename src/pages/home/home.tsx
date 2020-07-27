import React, { useState, useEffect } from 'react';
import styles from './home.less';
import DemoCard from '@/components/DemoCard/DemoCard';
import DemoListItem from '@/components/DemoListItem/DemoListItem';
import { Button, message } from 'antd';
import { useStore } from '@/stores/stores';
import { observer } from 'mobx-react-lite';

type TExample = {
  id: string; name: string
};
export default observer(() => {
  const [list, setList] = useState<TExample[]>([]);
  const { rootStore: { demoStore: { setzhangjiesshengao, zhangjiesheight } } } = useStore();
  useEffect(() => {
    setList([1, 2, 3].map(item => {
      return {
        id: Math.random().toString().slice(2),
        name: '张洁'
      };
    }));
  }, []);
  const clickAddBtn = () => {
    if (zhangjiesheight > 170) {
      return message.error('他没那么高');
    }
    setzhangjiesshengao(zhangjiesheight + 10);
  };
  const clickUnAddBtn = () => {
    if (zhangjiesheight < 2) {
      return message.error('不能再矮了');
    }
    setzhangjiesshengao(zhangjiesheight - 10);
  };
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      {
        list.map(item => <DemoListItem key={item.id} />)
      }
      <Button onClick={clickAddBtn}>增加</Button>
      <Button onClick={clickUnAddBtn}>减少</Button>
      <DemoCard />
      <h3>rules</h3>
      <p> 请使用react hooks 开发 不到万不得已 不使用any </p>
      <p> 函数入参需指定类型，返回可写可不写 </p> 
      <p> 组件使用大驼峰形式 例如  DemoCard </p>
      <p> page使用 小驼峰</p>
      <p>http请求需指定 请求参数接口或返回数据格式接口的 inferface 可以使用联合类型 并使用document this 的格式注释字段名</p>
      <p> 提交代码前所有页面红色error提醒 需解决掉 </p>
      <p> dom 类操作的事件绑定及操作 需方在 useEffect里 及首次挂载后 </p>
    </div>

  );
});
