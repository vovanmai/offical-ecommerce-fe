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
import { validateMessages } from "@/helper/common"
import UploadImage from "@/components/admin/UploadImage"
import { getAll as getAllCategories } from "@/api/admin/category"
import { buildCategoryTree } from "@/helper/common"
import dynamic from 'next/dynamic';
import { update as updateProduct, getById } from '@/api/admin/product'
import { useParams } from "next/navigation"

const MyCKEditor = dynamic(() => import('@/components/admin/MyCKEditor'), {
  ssr: false,
});

const EditProduct = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [categories, setCategories] = useState([])
  const params = useParams()
  const [product, setProduct] = useState(null)

  const onFinish = async (values: any) => {
    try {
      setLoadingSubmit(true)
      await updateProduct(params.id, values)
      setLoadingSubmit(false)
      router.push('/admin/products')
    } catch (error: any) {
      const statusCode = error.status
      if(statusCode == 422) {
        setErrors(error?.data?.errors as Record<string, string>);
      }
    } finally {
      setLoadingSubmit(false)
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
      }
    };

    const getProduct = async (id: any) => {
      try {
        const response = await getById(id);
        const { data } = response;
        setProduct(data)
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    getCategories()
    getProduct(params.id)

  }, [params])

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
    inventory_quantity: [
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
    category_id: null,
    inventory_quantity: null
  }

  const handleEditorChange = (data: string) => {
    data = data.replace(/<p>&nbsp;<\/p>|<p><\/p>/g, '');
    form.setFieldsValue({ description: data });
  };

  return (
    <div>
      <Breadcrumb items={[{title: 'Sản phẩm'}, {title: 'Chỉnh sửa'}]} />
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
                validateStatus={ errors?.price ? 'error' : undefined}
                help={errors?.price ? errors?.price : undefined}
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
                <Form.Item
                  name="inventory_quantity"
                  label="Số lượng tồn kho"
                  rules={rules.inventory_quantity}
                  validateStatus={ errors?.inventory_quantity ? 'error' : undefined}
                  help={errors?.inventory_quantity ? errors?.inventory_quantity : undefined}
              >
                <InputNumber size="large" min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col sm={24} md={24}>
              <Form.Item
                name="detail_file_ids"
                label="Ảnh chi tiết"
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
                      Cập nhật
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

export default withAuth(EditProduct)
