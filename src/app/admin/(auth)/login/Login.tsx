'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Select, theme } from 'antd'
import {
  LoginOutlined,
  EditOutlined
} from '@ant-design/icons'
import { toast } from 'react-toastify'
import SpinLoading from '@/components/SpinLoading'

import { login as requestLogin } from "@/api/admin/auth/index"

import { useAppSelector } from '@/store/hooks'
import {ROUTES} from "@/constants/routes";

export default function Login() {
  const [form] = Form.useForm();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true)
      const response = await requestLogin(values)
      localStorage.setItem('admin_token', response.data.access_token)
      toast.success('Đăng nhập thành công!')

      const redirect = sessionStorage.getItem('redirect')
      if (redirect) {
        sessionStorage.removeItem('redirect')
        router.push(redirect)
      } else {
        router.push(ROUTES.DASHBOARD_USER_LIST);
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const initialValues = {
    email: '',
    password: '',
  }
  return (
    <Form
      form={form}
      name="login-form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        { required: true, message: 'Vui lòng nhập địa chỉ email.' },
        { type: 'email', message: 'Email không đúng định dạng.'},
        { max: 50, message: 'Tối đa 50 ký tự.'}
      ]}
    >
       <Input
         size="large"
      />
    </Form.Item>

    <Form.Item
      label="Mật khẩu"
      name="password"
      rules={[{ required: true, message: 'Vui lòng nhập mật khẩu.'}]}
    >
      <Input.Password
        size="large"
      />
    </Form.Item>

    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        shape="round"
        block
        disabled={isLoading}
      >
        { isLoading ? <SpinLoading/> : <LoginOutlined />}
        Đăng nhập
      </Button>
    </Form.Item>
  </Form>
  );
}
