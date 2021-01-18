import React, { Component, useEffect, ReactElement, useState, useRef } from 'react';
import { Modal as AntdModal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import cssExports from './DraggableAntdModal.less';
import DelJPG from './del.jpg';
import { getMaxModalZIndex, storeModalZIndex } from '@/utils/tools';

const getMaxModalZIndex = (): number => {
  const res = sessionStorage.getItem('modal_zIndex');
  if (!res) return 1000;
  return Number(res) || 1000;
};

const storeModalZIndex = (zIndex: number) => {
  sessionStorage.setItem('modal_zIndex', zIndex + '');
};
const containsNode = (parentNode: any, childrenNode: any) => {
  if (!parentNode || !childrenNode) {
    return false;
  }
  if (parentNode === childrenNode) return true;
  let targetNode: any = childrenNode;
  while (targetNode) {
    targetNode = targetNode.parentNode;
    if (targetNode === parentNode) return true;
  }
  return false;
};
export type DraggableAntdModalProps = Omit<ModalProps, 'zIndex' | 'closable' | 'title'> &
{
  children?: React.ReactNode;
  draggable?: boolean;
  nameTitle?: React.ReactNode;
  headTitleClass?: string;
  contentClass?: string;
  customHeader?: React.ReactNode;
};

const DraggableAntdModal = (props: DraggableAntdModalProps) => {
  const { contentClass = '', children, wrapClassName = '',
    bodyStyle = {}, visible, draggable, nameTitle, headTitleClass = '', customHeader,
    ...restProps } = props;
  const [randomId] = useState(`draggable-antd-modal-${parseInt(Math.random() * 1000000 + '', 10)}`);
  const beginDrag = useRef(false);
  const modalWrapper = useRef<Element | null>(null);
  const modalContent = useRef<Element | null>(null);
  const points = useRef([0, 0]);
  const [zIndex, setZIndex] = useState(getMaxModalZIndex());
  useEffect(() => {
    storeModalZIndex(zIndex);
  }, [zIndex]);
  useEffect(() => {
    // document.addEventListener('mousemove', handleMouseMove);
    // console.log('bind');
    // return () => {
    //   console.log('un-bind');
    //   document.removeEventListener('mousemove', handleMouseMove);
    // };
  }, []);
  useEffect(() => {
    if (!visible) {
      beginDrag.current = false;
    }
    if (visible) {
      draggable && document.addEventListener('mousemove', handleMouseMove);
      setZIndex(getMaxModalZIndex() + 1);
    }
    return () => {
      // console.log('un-bind');
      draggable && document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [visible, randomId]);

  const handleMouseDown = (e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { visible, draggable } = props;
    if (!visible || !draggable) return;
    const wrapper = document.querySelector(`.${randomId}`);
    if (!wrapper) return;
    const content = wrapper.querySelector('.ant-modal-content');
    const title = wrapper.querySelector('.draggable-antd-modal-header');
    if (content && wrapper && containsNode(title, e.target)) {
      beginDrag.current = true;
      modalWrapper.current = wrapper;
      modalContent.current = content;
      points.current = [e.clientX, e.clientY];
    }
  };

  const handleMouseUp = () => {
    beginDrag.current = false;
    modalContent.current = null;
    modalWrapper.current = null;
  };
  const handleMouseMove = (e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!beginDrag || !modalWrapper.current || !modalContent.current) return;
    const { clientX, clientY } = e;
    const diffX = clientX - points.current[0];
    const diffY = clientY - points.current[1];
    points.current = [e.clientX, e.clientY];
    const { style } = modalContent.current as HTMLDivElement;
    (modalContent.current as HTMLDivElement).style.left = `${(parseFloat(style.left) || 0) + diffX}px`;
    (modalContent.current as HTMLDivElement).style.top = `${(parseFloat(style.top) || 0) + diffY}px`;
  };

  return (
    <AntdModal
      title={null}
      visible={visible}
      zIndex={zIndex}
      bodyStyle={Object.assign({ padding: '0', backgroundColor: 'none', borderRadius: '4px' }, bodyStyle)}
      closable={false}
      {...restProps}
      wrapClassName={`${randomId} ${wrapClassName} ${draggable ? cssExports.content : ''}`}
      footer={null}
    >
      <div onMouseDown={() => setZIndex(getMaxModalZIndex() + 1)}>
        <div className={contentClass}  >
          <div
            onMouseDown={handleMouseDown}
            // onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className={`${draggable ? 'draggable-antd-modal-header' : ''} ${headTitleClass}`}
          >
            {customHeader || <div className={cssExports.base_header}>
              <span>{nameTitle}</span>
              <img src={DelJPG} onClick={props.onCancel} />
            </div>}
          </div>
          {children}
          {props.footer &&
            <div className={cssExports.base_footer}>
              <div />
              {props.footer}
            </div>
          }
        </div>
      </div>

    </AntdModal>
  );
};
DraggableAntdModal.info = AntdModal.info;
DraggableAntdModal.success = AntdModal.success;
DraggableAntdModal.error = AntdModal.error;
DraggableAntdModal.warning = AntdModal.warning;
DraggableAntdModal.confirm = AntdModal.confirm;
// 支持拖拽和多个弹窗显示时点击后层级变化
export default DraggableAntdModal;
