'use client'

import { Card, Button, Form, Space, Input, Row, Col, Radio } from "antd"
import { UnorderedListOutlined, ClearOutlined, SaveOutlined } from "@ant-design/icons"
import Link from 'next/link'
import React, { useEffect, useState } from "react"
import withAuth from "@/hooks/withAuth"
import { ADMIN_ROUTES } from "@/constants/routes"
import {useRouter} from "next/navigation"
import SpinLoading from "@/components/SpinLoading"
import Breadcrumb from "@/components/Breadcrumb"
import { validateMessages } from "@/helper/common"
import dynamic from 'next/dynamic';
import { update as updatePage, getById } from '@/api/admin/page'
import { useParams } from "next/navigation"

const MyCKEditor = dynamic(() => import('@/components/admin/MyCKEditor'), {
  ssr: false,
});

const Edit = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const params = useParams()
  const [description, setDescription] = useState<string>('')

  const onFinish = async (values: any) => {
    try {
      setLoadingSubmit(true)
      await updatePage(params.id, values)
      setLoadingSubmit(false)
      router.push('/admin/pages')
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
    const getDetail = async (id: any) => {
      try {
        const response = await getById(id);
        const { data } = response;
        form.setFieldsValue({
          name: data.name,
          status: data.status,
          description: data.description
        })
        setDescription(data.description)
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    getDetail(params.id)

  }, [params, form])

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
    status: [
      { required: true },
    ],
    description: [
      { required: true },
    ],
  }

  const handleEditorChange = (data: string) => {
    data = data.replace(/<p>&nbsp;<\/p>|<p><\/p>/g, '');
    form.setFieldsValue({ description: data });
  };

  return (
    <div>
      <Breadcrumb items={[{title: 'Trang'}, {title: 'Chỉnh sửa'}]} />
      <Card title="Tạo mới" variant="outlined" extra={actions}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ width: '100%' }}
          validateMessages={validateMessages}
        >
          <Row gutter={[100, 0]}>
            <Col xs={24} sm={24} md={12}>
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
            <Col xs={24} sm={24} md={12}>
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
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                  name="description"
                  label="Chi tiết"
                  rules={rules.description}
                >
                  <MyCKEditor value={description} onChange={handleEditorChange} />
                </Form.Item>
            </Col>
            <Col span={24}>
              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Space>
                    <Button size="large" disabled={loadingSubmit} type="primary" htmlType="submit">
                      { loadingSubmit ? <SpinLoading /> : <SaveOutlined /> }
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

export default withAuth(Edit)
