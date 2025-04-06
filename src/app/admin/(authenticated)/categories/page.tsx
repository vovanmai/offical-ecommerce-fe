'use client'
import {Card, Select, Radio, Button, Table, Tooltip, theme, Row, Col, Form, Space, Input } from "antd"
import { PlusCircleOutlined, ClearOutlined, DeleteOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { buildCategoryTree, getCategoryOptions } from "@/helper/common"
import { toast } from 'react-toastify'
import withAuth from "@/hooks/withAuth";
import Breadcrumb from "@/components/Breadcrumb"
import { validateMessages } from "@/helper/common"
import SpinLoading from "@/components/SpinLoading"
import NestableCategory from "@/components/admin/NestableCategory"
import { getAll, create as createCategory, updateOrder } from '@/api/admin/category'
const { TextArea } = Input;

const Page = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm()
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false)
  const [categories, setCategories] = useState([])
  
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const onReset = () => {
    form.resetFields();
    setErrors({})
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };
  const rules: any = {
    name: [
      { required: true },
      { max: 50 },
    ],
    status: [
      { required: true },
    ],
    parent_id: [
      { required: false },
    ],
    description: [
      { required: false },
      { max: 255 },
    ],
  }

  const getCategories = async () => {
    try {
      const response = await getAll();
      const { data } = response;
      setCategories(buildCategoryTree(data));
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
    }
  };

  const onFinish = async (values: any) => {
      try {
        setLoadingCreate(true)
        const response = await createCategory(values)
        const { data } = response;
        setCategories(buildCategoryTree(data));
        form.resetFields()
        toast.success('Tạo thành công!')
      } catch (error: any) {
        setErrors(error?.data?.errors as Record<string, string>);
      } finally {
        setLoadingCreate(false)
      }
    };

  useEffect(() => {
    getCategories()
  }, [])

  const updateCategoryOrder = async (items: Array<object>) => {
    try {
      const response = await updateOrder({categories: items})
      const { data } = response;
      setCategories(buildCategoryTree(data));
      toast.success('Cập nhật thành công!')
    } catch (error: any) {
    } finally {
    }
  }

  return (
    <div>
      <Breadcrumb items={[{title: 'Danh mục sản phẩm'}]} />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={9} span={9}>
          <Card title="Danh sách" variant="outlined">
            <NestableCategory categories={categories} onChange={updateCategoryOrder} />
          </Card>
        </Col>
        <Col xs={24} md={15} span={15}>
          <Card title="Tạo mới" variant="outlined">
              <Form
                validateMessages={validateMessages}
                {...layout}
                form={form}
                initialValues={{ status: 1, parent_id: null, name: null, description: null }}
                onFinish={onFinish}
                style={{ width: '100%' }}
              >
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
                  name="parent_id"
                  label="Danh mục cha"
                  rules={rules.parent_id}
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="---Chọn---"
                    filterOption={(input, option) => {
                      const label = String(option?.label ?? ""); // Ép kiểu về string
                      return label.toLowerCase().includes(input.toLowerCase());
                    }}
                    options={getCategoryOptions(categories)}
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Mô tả"
                  rules={rules.description}
                  validateStatus={ errors?.description ? 'error' : undefined}
                  help={errors?.description ? errors?.description : undefined}
                >
                  <TextArea allowClear style={{ height: 100, resize: 'none' }} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Space>
                    <Button size="large" disabled={loadingCreate} type="primary" htmlType="submit">
                      { loadingCreate ? <SpinLoading /> : <PlusCircleOutlined /> }
                      Tạo
                    </Button>
                    <Button size="large" htmlType="button" onClick={onReset}>
                      <ClearOutlined />
                      Xoá
                    </Button>
                  </Space>
                </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Page)
