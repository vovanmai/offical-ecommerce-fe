'use client'
import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    sorter: true,
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  { title: 'Column 9', dataIndex: 'address', key: '9' },
  { title: 'Column 10', dataIndex: 'address', key: '10' },
  { title: 'Column 11', dataIndex: 'address', key: '11' },
  { title: 'Column 12', dataIndex: 'address', key: '12' },
  { title: 'Column 13', dataIndex: 'address', key: '13' },
  { title: 'Column 14', dataIndex: 'address', key: '14' },
  { title: 'Column 15', dataIndex: 'address', key: '15' },
  { title: 'Column 16', dataIndex: 'address', key: '16' },
  { title: 'Column 17', dataIndex: 'address', key: '17' },
  { title: 'Column 18', dataIndex: 'address', key: '18' },
  { title: 'Column 19', dataIndex: 'address', key: '19' },
  { title: 'Column 20', dataIndex: 'address', key: '20' },
  {
    title: 'Action',
    key: 'operation',
    width: 100,
    render: () => <a>action</a>,
  },
];

const dataSource: DataType[] = [
  { key: '1', name: 'Olivia', age: 32, address: 'New York Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
  { key: '2', name: 'Ethan', age: 40, address: 'London Park' },
];

const Test = () => {
  return (
    <Table<DataType>
      pagination={{ pageSize: 100 }}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 'scroll', y: 400 }}
    />
  );
};

export default Test;