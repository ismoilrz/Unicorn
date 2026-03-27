import React from 'react'
import './visitHistories.css'
import { Space, Table, type TableProps } from 'antd';
import type { Product } from '../../types/types';

interface HistoryMainProps {
    data: Product[];
}

interface TableData {
    id: string | number;
    visitDate: string;
    visitName: string;
    visitTime: string;
}

const HistoryMain: React.FC<HistoryMainProps> = ({ data }) => {
    
    const columns: TableProps<TableData>['columns'] = [
        {
          title: 'Member Name',
          dataIndex: 'visitName',
          key: 'visitName',
        },
        {
          title: 'Visit Time',
          dataIndex: 'visitDate',
          key: 'visitDate',
        },

        {
          title: 'Visit Date',
          dataIndex: 'visitTime',
          key: 'visitTime',
        },
        {
          title: '',
          dataIndex: '',
          key: '',
        },
  
];

const tableData = data?.map((item) => ({
  id: item.id,
  visitDate: item.visitDate,
  visitName: item.visitName,
  visitTime: item.visitTime,
}));

  return (
    <Table 
        columns={columns}
        dataSource={tableData}
        pagination={{pageSize: 7}}
        rowKey={'id'}
    />
  )
}

export default HistoryMain