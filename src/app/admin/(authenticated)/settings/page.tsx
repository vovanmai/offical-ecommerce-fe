'use client'

import { Card, Button, Form, Space, Input, Row, Col } from "antd"
import { UnorderedListOutlined, ClearOutlined, SaveOutlined } from "@ant-design/icons"
import Link from 'next/link'
import React, { useEffect, useState } from "react"
import withAuth from "@/hooks/withAuth"
import { ADMIN_ROUTES } from "@/constants/routes"
import {useRouter} from "next/navigation"
import SpinLoading from "@/components/SpinLoading"
import Breadcrumb from "@/components/Breadcrumb"
import { validateMessages } from "@/helper/common"
import { create as createRequest, list as listRequest } from '@/api/admin/setting'
import { toast } from "react-toastify"

const Setting = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [settings, setSettings] = useState<any>([])

  const onFinish = async (values: any) => {
    try {
      setLoadingSubmit(true)
      const data = Object.entries(values).map(([key, value]) => ({
        key,
        value
      }));
      await createRequest({data: data})
      toast.success('Cập nhật thành công')
      setLoadingSubmit(false)
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

  useEffect(() => {
      const listSettings = async () => {
        try {
          const response = await listRequest();
          const { data } = response;
          setSettings(data)
          const fields = data.reduce((acc: any, item: any) => {
            acc[item.key] = item.value;
            return acc;
          }, {});
          form.setFieldsValue(fields)
        } catch (error) {
          console.error('Fetch error:', error);
        } finally {
        }
      };
      listSettings()
    }, [form])

  return (
    <div>
      <Breadcrumb items={[{title: 'Cài đặt'}]} />
      <Card title="Thiết lập" variant="outlined">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ width: '100%' }}
          validateMessages={validateMessages}
        >
          <Row gutter={[100, 0]}>
          {settings.map((item: any) => (
            <Col xs={24} sm={24} md={12} key={item.id}>
              <Form.Item
                name={item.key}
                label={item.name}
              >
                {item.type === 'input' && <Input size="large" />}
                {item.type === 'textarea' && <Input.TextArea size="large" />}
              </Form.Item>
            </Col>
          ))}
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

export default withAuth(Setting)
