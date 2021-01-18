import React, { useEffect, useState, forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { Pagination, Table } from 'antd';
import cssExports from './AntdTable.less';
import { TableProps } from 'antd/lib/table';
import { IRequestRes } from '@/services/request';
import Column, { ColumnProps } from 'antd/lib/table/Column';

interface IPageData<T> {
  size: number;
  records: T[];
  total: number;
  pages: number;
}
export interface AntdTableRef {

  /**
   * 是否重置页数和条数
   *
   * @memberof AntdTableRef
   */
  reLoad: (isResetPageSize: boolean, isResetPageIndex: boolean) => void;
}
export type AntdTableProps = Omit<TableProps<any>, 'loading' | 'pagination' | 'dataSource'> & {
  pageAndSizeChange?: (page: number, size: number) => void;
  action?: (pageSize: number, pageNum: number) => Promise<IRequestRes<IPageData<any>>>
};
const originIndex = 1;
const originSize = 5;

const AntdTable = (props: AntdTableProps,
  ref: React.RefObject<AntdTableRef> | ((instance: AntdTableRef | null) => void) | null
) => {
  useImperativeHandle(ref, () => ({
    reLoad: (isResetPageSize: boolean, isResetPageIndex: boolean) => {
      if (isResetPageSize && isResetPageIndex) {
        load(originSize, originIndex);
        setPageIndex(originIndex);
        setPageSize(originSize);
      } else if (isResetPageSize && !isResetPageIndex) {
        load(originSize, pageIndex);
        setPageSize(originSize);
      } else if (isResetPageIndex && !isResetPageSize) {
        load(pageSize, originIndex);
        setPageIndex(originIndex);
      } else {
        load(pageSize, pageIndex);
      }
    },
  }));
  const [loading, setLoading] = useState(false);
  const { pageAndSizeChange, columns, action, ...restProps } = props;
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(originSize);
  const [pageIndex, setPageIndex] = useState(originIndex);
  const [pageData, setPageData] = useState<any[]>([]);
  const loadingState = useRef(false);
  const paginationChange = (page: number) => {
    setPageIndex(page);
    load(pageSize, page);
  };
  const onShowSizeChange = (index: number, size: number) => {
    load(size, index);
    setPageIndex(index);
    setPageSize(size);
  };
  const load = (pageSize: number, pageIndex: number) => {
    if (loadingState.current === true) return;
    loadingState.current = true;
    setLoading(true);
    action && action(pageSize, pageIndex).then(res => {
      loadingState.current = false;
      setPageData(res.data.records);
      setTotal(res.data.total);
      setLoading(false);
    }).catch(err => {
      loadingState.current = false;
      setLoading(false);
      return Promise.reject(err);
    });
  };
  useEffect(() => {
    pageAndSizeChange && pageAndSizeChange(pageIndex, pageSize);
  }, [pageSize, pageIndex]);
  useEffect(() => {
    load(originSize, originIndex);
  }, []);
  return (
    <div className={cssExports.table_box}>
      <div className={cssExports.table}>
        <Table loading={loading} {...restProps} columns={columns} dataSource={pageData} pagination={false} />
      </div>
      <div className={cssExports.page}>
        <p></p>
        <Pagination
          onChange={paginationChange}
          onShowSizeChange={onShowSizeChange}
          size='small'
          total={total}
          showSizeChanger
          current={pageIndex}
          pageSize={pageSize}
          // defaultCurrent={1}
          pageSizeOptions={['5', '10', '20', '50', '100']}
          showQuickJumper
          showTotal={total => `共${total}条`}
        />
      </div>
    </div>
  );
};
/** 带类型的colum  */
export function bindColumn<T extends { [key: string]: any }>() {
  return (props: Omit<ColumnProps<T>, 'key'> & { dataIndex: keyof T }) => {
    const dataIndex: keyof T = props.dataIndex as string;
    const columnProps = {
      ...props,
      dataIndex: dataIndex as string | number | (string | number)[] | undefined,
      key: dataIndex as string | number | undefined,
    };
    if (props.render) {
      columnProps.render = (value: any, record: T, index: number) => {
        return props.render && props.render(value, record, index);
      };
    }
    return Column(columnProps);
  };
}

export default memo(forwardRef(AntdTable));
