'use client'
import { Card, Button, Table, Tooltip, Space, theme, Image, Badge } from "antd"
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { list as listProducts, deleteProduct } from '@/api/admin/product'
import dayjs from 'dayjs'
import Search from "./Search"
import { removeEmptyFields } from "@/helper/common"
import qs from 'qs'
import withAuth from "@/hooks/withAuth";
import Link from 'next/link'
import { ADMIN_ROUTES } from "@/constants/routes"
import { toast } from 'react-toastify'
import ConfirmModal from "@/components/ConfirmModal"
import Breadcrumb from "@/components/Breadcrumb"
import numeral from 'numeral'

import type { GetProp, TableProps } from 'antd';
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

const ProductList = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deletedId, setDeletedId] = useState<any>(null)
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const actions = (
    <Link href={ ADMIN_ROUTES.PRODUCT_CREATE }>
      <Button
        size="large"
        onClick={() => { router.push('/admin/products/create') }}
        type="primary"
      >
        <PlusCircleOutlined />Tạo mới
      </Button>
    </Link>
  );

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
      const response = await listProducts(removeEmptyFields(params));
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
    router.push(`/admin/products?${queryString}`)
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
    router.push(`/admin/products?${queryString}`)
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
          <Link style={{ color: colorPrimary }} href={`/admin/products/${record.id}/edit`}>{text}</Link>
        )
      }
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'preview_image',
      render: (record) => {
        const url = record && record.data ? `${record.data.endpoint_url}/${record.path}/${record.filename}` : ''
        return (
          url && <Image
            width={80}
            height={80}
            src={url}
            alt="Ảnh đại diện"
            style={{objectFit: 'cover'}}
          />
        )
      }
    },
    {
      title: 'Trang thái',
      dataIndex: 'status',
      render: (status) => {
        return (
          <Badge
            status={status == 1 ? "success" : "default"} 
          />
        )
      }
    },
    {
      title: 'Danh mục',
      sorter: true,
      render: (record) => {
        return (
          <Link style={{ color: colorPrimary }} href={`/admin/categories/${record.category_id}/edit`}>{ record.category_name }</Link>
        )
      }
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      sorter: true,
      render: (text) => {
        return (
          <span>{numeral(text).format('0,0')} đ</span>
        )
      }
    },
    {
      title: 'Giá khuyến mãi',
      dataIndex: 'sale_price',
      sorter: true,
      render: (text) => {
        return (
          <span>{text ? numeral(text).format('0,0') + ' đ' : ''}</span>
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
            <Tooltip title="Chỉnh sửa">
              <Link href={`/admin/products/${record.id}/edit`}>
                <Button shape="circle" icon={<EditOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip title="Xoá">
              <Button onClick={() => {showDeleteConfirm(record.id)}} danger shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Space>
        )
      },
    },
  ];

  const deleteRecord = async () => {
    try {
      setLoadingDelete(true)
      await deleteProduct(deletedId)
      setData(data.filter((item) => item.id !== deletedId))
      setShowConfirmDelete(false)
      toast.success('Xoá thành công!')
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoadingDelete(false)
    }
  }

  const showDeleteConfirm = (id: number) => {
    setShowConfirmDelete(true)
    setDeletedId(id)
  };

  return (
    <div>
      <Breadcrumb items={[{title: 'Sản phẩm'}]} />
      <ConfirmModal
        visible={showConfirmDelete}
        onOk={deleteRecord}
        onCancel={() => setShowConfirmDelete(false)}
        confirmLoading={loadingDelete}
      />
      <Card title="Danh sách sản phẩm" variant="outlined" extra={actions}>
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

export default withAuth(ProductList)
