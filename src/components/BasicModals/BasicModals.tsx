import Modal, { ModalFuncProps, ModalProps } from 'antd/lib/modal';
import confirm from 'antd/lib/modal/confirm';
import React from 'react';
import cssExports from './BasicModals.less';
import { Button } from 'antd';
import { getMaxModalZIndex } from '@/utils/tools';

const ConfirmTitle = (title?: React.ReactNode) => <p className={cssExports.warn_title}>
  < i className={`iconfont icon_warning ${cssExports.icon_warning} `} />{title}
</p>;

const Content = (v?: React.ReactNode) => {
  return <p className={cssExports.space}>{v}</p>;
};
export type ConfirmModalProps = Omit<ModalFuncProps, 'autoFocusButton' | 'okButtonProps' | 'cancelButtonProps'>;
/** 函数式  */
export const ConfirmModal = (props: ConfirmModalProps) => {
  const res = confirm({
    ...props,
    title: ConfirmTitle(props.title),
    content: Content(props.content),
    autoFocusButton: null,
    okButtonProps: { className: cssExports.confirm_ok },
    cancelButtonProps: { className: cssExports.confirm_cancel },
    zIndex: props.zIndex || getMaxModalZIndex() + 1,
  });
  return res;
};

const ModalHeader = (props: {
  title?: React.ReactNode; content: React.ReactNode;
  headTitleClass?: string;
  onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}) => {
  const { title, content, onClose, headTitleClass = '' } = props;
  return (
    <div className={cssExports.basic_content}>
      <div className={`${cssExports.header} ${headTitleClass}`}>
        <p>{title}</p>
        <i className={`iconfont icon_close ${cssExports.close}`}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => onClose && onClose(e)}
        />
      </div>
      {content}
    </div>
  );
};
export type BasicModalProps = Omit<ModalFuncProps,
  'className' | 'autoFocusButton' | 'okButtonProps' | 'cancelButtonProps'
> & { headTitleClass?: string };
/** 函数式  */
export const BasicModal = (props: BasicModalProps) => {
  const res = confirm({
    zIndex: getMaxModalZIndex() + 1,
    className: cssExports.basic_container,
    ...props,
    title: '',
    content: <ModalHeader headTitleClass={props.headTitleClass} 
    onClose={() => res.destroy()} title={props.title} content={props.content} />,
    autoFocusButton: null,
    okButtonProps: { className: cssExports.basic_ok },
    cancelButtonProps: { className: cssExports.basic_cancel },
  });
  return res;
};

export type RenderBasicModalPorps = Omit<ModalProps,
  'footer' | 'wrapClassName' | 'closable'> & {
    children?: React.ReactNode; btnLoading?: boolean;
    headTitleClass?: string
  };
/** 组件式  */
export const RenderBasicModal = (props: RenderBasicModalPorps) => {
  const { title, btnLoading, headTitleClass, onCancel, ...restProps } = props;
  return (
    <Modal closable={false} title=''  {...restProps}
      wrapClassName={cssExports.basic_container}
      footer={null}
    >
      <ModalHeader onClose={onCancel} headTitleClass={headTitleClass} title={props.title} content={props.children} />
      <div className={cssExports.footer}>
        <span></span>
        <div>
          <Button className={cssExports.basic_cancel} onClick={onCancel} >取消</Button>
          <Button type='primary' disabled={btnLoading} className={cssExports.basic_ok} onClick={props.onOk}>确定</Button>
        </div>
      </div>
    </Modal>
  );
};
