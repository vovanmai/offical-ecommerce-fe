'use client'

import { Card, Button, Form, Space, Input, Row, Col, Radio, Switch, TreeSelect } from "antd"
import { UnorderedListOutlined, ClearOutlined, PlusCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import React, { useState } from "react"
import withAuth from "@/hooks/withAuth"
import { ADMIN_ROUTES } from "@/constants/routes"
import {useRouter} from "next/navigation"
import SpinLoading from "@/components/SpinLoading"
import Breadcrumb from "@/components/Breadcrumb"
import { validateMessages } from "@/helper/common"
import dynamic from 'next/dynamic';
import { create as createPage } from '@/api/admin/page'
import { toast } from 'react-toastify'

const MyCKEditor = dynamic(() => import('@/components/admin/MyCKEditor'), {
  ssr: false,
});

const CreatePage = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

  const onFinish = async (values: any) => {
    try {
      setLoadingSubmit(true)
      await createPage(values)
      setLoadingSubmit(false)
      router.push('/admin/pages')
    } catch (error: any) {
      const statusCode = error.status
      if(statusCode == 422) {
        setErrors(error?.data?.errors as Record<string, string>);
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
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
    <Link href={ADMIN_ROUTES.PAGE_LIST}>
      <Button
        size="large"
        type="primary"
      >
        <UnorderedListOutlined />Danh sách
      </Button>
    </Link>
  );

  const rules: any = {
    name: [
      { required: true },
      { max: 50 },
    ],
    short_description: [
      { required: true },
      { max: 255 },
    ],
    status: [
      { required: true },
    ],
    description: [
      { required: true },
    ],
  }
  const initialValues={
    status: 1,
    name: null,
    short_description: null,
    description: null,
    is_display_footer: true,
    is_display_main_menu: true,
  }

  const handleEditorChange = (data: string) => {
    data = data.replace(/<p>&nbsp;<\/p>|<p><\/p>/g, '');
    form.setFieldsValue({ description: data });
  };

  return (
    <div>
      <Breadcrumb items={[{title: 'Trang'}, {title: 'Tạo mới'}]} />
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
                name="short_description"
                label="Mô tả ngắn"
                rules={rules.short_description}
                validateStatus={errors?.short_description ? 'error' : undefined}
                help={errors?.short_description ? errors?.short_description : undefined}
              >
                <Input.TextArea rows={4} />
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
                  name="is_display_main_menu"
                  label="Hiển thị trên menu chính"
                  rules={rules.is_display_main_menu}
                  validateStatus={ errors?.is_display_main_menu ? 'error' : undefined}
                  help={errors?.is_display_main_menu ? errors?.is_display_main_menu : undefined}
                >
                  <Switch />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="is_display_footer"
                label="Hiển thị dưới footer"
                rules={rules.is_display_footer}
                validateStatus={ errors?.is_display_footer ? 'error' : undefined}
                help={errors?.is_display_footer ? errors?.is_display_footer : undefined}
              >
                <Switch />
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

export default withAuth(CreatePage)
