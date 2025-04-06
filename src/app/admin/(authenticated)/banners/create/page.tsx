'use client'

import { Card, Button, Form, Space, Input, Row, Col, Radio } from "antd"
import { UnorderedListOutlined, ClearOutlined, PlusCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import React, { useState } from "react"
import withAuth from "@/hooks/withAuth"
import { ADMIN_ROUTES } from "@/constants/routes"
import {useRouter} from "next/navigation"
import SpinLoading from "@/components/SpinLoading"
import Breadcrumb from "@/components/Breadcrumb"
import { validateMessages } from "@/helper/common"
import UploadImage from "@/components/admin/UploadImage"
import { create as createRequest } from '@/api/admin/banner'

const Create = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

  const onFinish = async (values: any) => {
    try {
      setLoadingSubmit(true)
      await createRequest(values)
      setLoadingSubmit(false)
      router.push('/admin/banners')
    } catch (error: any) {
      const statusCode = error.status
      if(statusCode == 422) {
        setErrors(error?.data?.errors as Record<string, string>);
      }
    } finally {
      setLoadingSubmit(false)
    }
  };

  const onReset = () => {
    form.resetFields();
    setErrors({})
  };
  const actions = (
    <Link href={ADMIN_ROUTES.BANNER_LIST}>
      <Button
        size="large"
        type="primary"
      >
        <UnorderedListOutlined />Danh sách
      </Button>
    </Link>
  );

  const onChangeImage = (ids: any) => {
    form.setFieldsValue({ image_id: ids[0] ?? null });
  };

  const rules: any = {
    name: [
      { required: false },
      { max: 50 },
    ],
    status: [
      { required: true },
    ],
    image_id: [
      { required: true, message: 'Vui lòng chọn ảnh.' },
    ],
    url: [
      { required: false },
    ],
  }
  const initialValues={
    status: 1,
    url: null, 
    name: null, 
    image_id: null,
  }

  return (
    <div>
      <Breadcrumb items={[{title: 'Banner'}, {title: 'Tạo mới'}]} />
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
            </Col>
            <Col sm={24} md={12}>
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
            </Col>
            <Col sm={24} md={12}>
                <Form.Item
                  name="url"
                  label="Đường dẫn"
                  rules={rules.url}
                  validateStatus={ errors?.url ? 'error' : undefined}
                  help={errors?.url ? errors?.url : undefined}
                >
                  <Input size="large" />
                </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                  name="image_id"
                  label="Ảnh"
                  rules={rules.image_id}
                >
                  <UploadImage
                    onChange={onChangeImage}
                  />
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

export default withAuth(Create)
