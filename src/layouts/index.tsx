import React from 'react';
import { Provider } from 'mobx-react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { IRouteComponentProps } from 'umi';
import rootStore from '@/stores/stores';
import './index.less';

const BasicLayout = (props: IRouteComponentProps) => {
  return (
    <Provider {...rootStore}>
      <ConfigProvider locale={zhCN}>
        <div className='layout'>{props.children}</div>
      </ConfigProvider >
    </Provider>
  );
};

export default BasicLayout;