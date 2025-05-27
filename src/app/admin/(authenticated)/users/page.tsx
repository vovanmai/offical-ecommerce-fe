'use client'
import { Card, Button, Table, Tooltip, Space, theme, Tag } from "antd"
import { InfoOutlined } from "@ant-design/icons"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { list as listRequest } from '@/api/admin/user'
import dayjs from 'dayjs'
import Search from "./Search"
import { removeEmptyFields } from "@/helper/common"
import qs from 'qs'
import withAuth from "@/hooks/withAuth";
import Link from 'next/link'
import Breadcrumb from "@/components/Breadcrumb"

import type { GetProp, TableProps } from 'antd';
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

const List = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const router = useRouter()
  const searchParams = useSearchParams()

  type SearchDataType = {
    name?: string,
    created_at_from?: string,
    created_at_to?: string,
    updated_at_from?: string,
    updated_at_to?: string,
  }

  type SortDataType = {
    sort?: string,
    order?: string,
  }

  type QueryParamType = SearchDataType & SortDataType & {
    page?: number,
    per_page?: number,
  }

  const [searchData] = useState<SearchDataType>({
    name: searchParams.get('name') || '',
    created_at_from: searchParams.get('created_at_from') || '',
    created_at_to: searchParams.get('created_at_to') || '',
    updated_at_from: searchParams.get('updated_at_from') || '',
    updated_at_to: searchParams.get('updated_at_to') || '',
  })

  const [queryParams, setQueryParams] = useState<QueryParamType>({
    ...searchData,
    sort: searchParams.get('sort') || '',
    order: searchParams.get('order') || '',
    page: 1,
    per_page: 15,
  })

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 15,
  })

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await listRequest(removeEmptyFields(params));
      const { data: responseData } = response;
      setData(responseData.data);
      setPagination({
        current: responseData.current_page,
        pageSize: responseData.per_page,
        total: responseData.total,
      });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(queryParams)
  }, [queryParams]);

  const handleTableChange: TableProps<any>['onChange'] = async (pagination, filters, sorter) => {
    setPagination(pagination)
    const isSorterArray = Array.isArray(sorter);
    const sortField = isSorterArray ? sorter[0]?.field : sorter?.field;
    const sortOrder = isSorterArray ? sorter[0]?.order : sorter?.order;

    const sort = typeof sortField === 'string' ? sortField : '';
    let order = sortOrder ? sortOrder : '';
    order = order ? (order === 'ascend' ? 'asc' : 'desc') : ''

    const params = {
      ...queryParams,
      page: pagination.current,
      per_page: pagination.pageSize,
      sort: sort,
      order: order,
    }
    setQueryParams(params)
    const queryString = qs.stringify(removeEmptyFields(params));
    router.push(`/admin/users?${queryString}`)
  }

  const onSearch = async (data: any) => {
    const params = {
      name: data.name,
      created_at_from: data.created_at_from,
      created_at_to: data.created_at_to,
      updated_at_from: data.updated_at_from,
      updated_at_to: data.updated_at_to,
    }
    setQueryParams(params)
    const queryString = qs.stringify(removeEmptyFields(params));
    router.push(`/admin/users?${queryString}`)
  }

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: true,
      render: (text, record) => {
        return (
          <Link style={{ color: colorPrimary }} href={`/admin/pages/${record.id}/edit`}>{text}</Link>
        )
      }
    },
    {
      title: 'Trang thái',
      dataIndex: 'status',
      render: (status) => {
        return (
          <>
            {status == 1 && <Tag color="#87d068">Unverified</Tag>}
            {status == 2 && <Tag color="#87d068">Active</Tag>}
            {status == 3 && <Tag color="#f50">Inactive</Tag>}
          </>
        )
      }
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updated_at',
      sorter: true,
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Hành động',
      render: (record) => {
        return (
          <Space>
            <Tooltip title="Chi tiết">
              <Link href={`/admin/users/${record.id}`}>
                <Button shape="circle" icon={<InfoOutlined />} />
              </Link>
            </Tooltip>
          </Space>
        )
      },
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{title: 'Khách hàng'}]} />
      <Card title="Danh sách khách hàng" variant="outlined">
        <Search
          onSearch={onSearch}
          resetForm={() => { setQueryParams({}) }}
          formData={searchData}
        />
        <div>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Card>
    </div>
  );
}

export default withAuth(List)
