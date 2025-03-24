'use client'

import { Card, Button, Form, Space, Input, Row, Col, Radio, InputNumber, TreeSelect } from "antd"
import { UnorderedListOutlined, ClearOutlined, PlusCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import React, { useEffect, useState } from "react"
import withAuth from "@/hooks/withAuth"
import { ADMIN_ROUTES } from "@/constants/routes"
import {useRouter} from "next/navigation"
import SpinLoading from "@/components/SpinLoading"
import Breadcrumb from "@/components/Breadcrumb"
import { toast } from 'react-toastify'
import { validateMessages } from "@/helper/common"
import UploadImage from "@/components/admin/UploadImage"
import { getAll as getAllCategories } from "@/api/admin/category"
import { buildCategoryTree } from "@/helper/common"
import dynamic from 'next/dynamic';
import { create as createProduct } from '@/api/admin/product'

const MyCKEditor = dynamic(() => import('@/components/admin/MyCKEditor'), {
  ssr: false,
});

type ActionType = 'list' | 'edit' | 'create' | 'delete' | 'detail'

const CreateProduct = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [categories, setCategories] = useState([])

  const onFinish = async (values: any) => {
    try {
      await createProduct(values)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategories();
        const { data } = response;
        setCategories(data)
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
      }
    };
    getCategories()
  }, [])

  const onReset = () => {
    form.resetFields();
    setErrors({})
  };
  const actions = (
    <Link href={ADMIN_ROUTES.PRODUCT_LIST}>
      <Button
        size="large"
        type="primary"
      >
        <UnorderedListOutlined />Danh sách
      </Button>
    </Link>
  );

  const onChangePreviewImage = (ids: any) => {
    form.setFieldsValue({ preview_image_id: ids[0] ?? null });
  };

  const onChangeDetailFile = (ids: any) => {
    form.setFieldsValue({ detail_file_ids: ids });
  };

  const rules: any = {
    name: [
      { required: true },
      { max: 50 },
    ],
    status: [
      { required: true },
    ],
    price: [
      { required: true },
    ],
    preview_image_id: [
      { required: true, message: 'Vui lòng chọn ảnh.' },
    ],
    detail_file_ids: [
      { required: true, message: 'Vui lòng chọn ảnh.' },
    ],
    description: [
      { required: true },
    ],
    category_id: [
      { required: true, message: 'Vui lòng chọn.' },
    ],
  }
  const initialValues={
    status: 1,
    price: null, 
    name: null, 
    description: null,
    preview_image_id: null,
    detail_file_ids: [],
    category_id: null
  }

  const handleEditorChange = (data: string) => {
    form.setFieldsValue({ description: data });
  };

  return (
    <div>
      <Breadcrumb items={[{title: 'Sản phẩm'}]} />
      <Card title="Tạo mới" variant="outlined" extra={actions}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ width: '100%' }}
          validateMessages={validateMessages}
          initialValues={initialValues}
        >
          <Row gutter={[100, 0]}>
            <Col sm={24} md={12}>
              <Form.Item
                name="name"
                label="Tên"
                rules={rules.name}
                validateStatus={ errors?.name ? 'error' : undefined}
                help={errors?.name ? errors?.name : undefined}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                  name="status"
                  label="Trạng thái"
                  rules={rules.status}
                >
                  <Radio.Group
                    options={[
                      {
                        value: 1,
                        label: "Active"
                      },
                      {
                        value: 2,
                        label: "Inactive"
                      },
                    ]}
                  />
                </Form.Item>
              <Form.Item
                name="price"
                label="Giá"
                rules={rules.price}
                validateStatus={ errors?.name ? 'error' : undefined}
                help={errors?.name ? errors?.name : undefined}
              >
                <InputNumber size="large" min={1000} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                  name="preview_image_id"
                  label="Ảnh đại diện"
                  rules={rules.preview_image_id}
                >
                  <UploadImage
                    onChange={onChangePreviewImage}
                  />
                </Form.Item>
                <Form.Item
                  name="category_id"
                  label="Danh mục"
                  rules={rules.category_id}
                >
                  <TreeSelect
                    size="large"
                    placeholder="Vui lòng chọn."
                    allowClear
                    treeDefaultExpandAll
                    treeData={buildCategoryTree(categories)}
                  />
                </Form.Item>
            </Col>
            <Col sm={24} md={24}>
              <Form.Item
                name="detail_file_ids"
                label="Ảnh đại diện"
                rules={rules.preview_image_id}
              >
                <UploadImage
                  multiple={true}
                  onChange={onChangeDetailFile}
                  maxCount={10}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={24}>
              <Form.Item
                name="description"
                label="Chi tiết"
                rules={rules.description}
              >
                <MyCKEditor value={initialValues.description} onChange={handleEditorChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Space>
                    <Button size="large" disabled={loadingSubmit} type="primary" htmlType="submit">
                      { loadingSubmit ? <SpinLoading /> : <PlusCircleOutlined /> }
                      Tạo
                    </Button>
                    <Button size="large" htmlType="button" onClick={onReset}>
                      <ClearOutlined />
                      Xoá
                    </Button>
                  </Space>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default withAuth(CreateProduct)
