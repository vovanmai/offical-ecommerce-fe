'use client'
import {Card, Select, Radio, Button, Table, Tooltip, theme, Row, Col, Form, Space, Input } from "antd"
import { PlusCircleOutlined, ClearOutlined, DeleteOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { flattenCategories } from "@/helper/common"

import withAuth from "@/hooks/withAuth";
import Breadcrumb from "@/components/Breadcrumb"
import { validateMessages } from "@/helper/common"
import SpinLoading from "@/components/SpinLoading"
import NestableCategory from "@/components/admin/NestableCategory"
import { getAll } from '@/api/admin/category'
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
  const onFinish = async (values: any) => {
      try {
        
      } catch (error: any) {
        setErrors(error?.data?.errors as Record<string, string>);
      } finally {
      }
    };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };
  const rules: any = {
    name: [
      { required: true },
      { max: 50 },
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
      setCategories(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
    }
  };

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div>
      <Breadcrumb items={[{title: 'Danh mục sản phẩm'}]} />
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Card title="Danh sách" bordered={false}>
            <NestableCategory categories={categories} />
          </Card>
        </Col>
        <Col span={14}>
          <Card title="Tạo mới" bordered={false}>
              <Form
                validateMessages={validateMessages}
                {...layout}
                form={form}
                initialValues={{ active: 1, parent_id: null }}
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
                  name="active"
                  label="Trạng thái"
                  rules={rules.active}
                >
                  <Radio.Group
                    options={[
                      {
                        value: 1,
                        label: "Active"
                      },
                      {
                        value: false,
                        label: "Active"
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
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={flattenCategories(categories)}
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
