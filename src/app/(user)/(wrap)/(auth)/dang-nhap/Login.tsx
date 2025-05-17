
'use client'

import React, { useCallback } from 'react';
import type { CascaderProps } from 'antd';
import {
  Button,
  Form,
  Input,
  Select,
  Alert
} from 'antd';

import { login } from '@/api/user/auth';
import { useMessageApi } from '@/components/user/MessageProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

import { useAppDispatch } from '@/store/user/hooks';
import { setCurrentUser } from "@/store/user/authSlice"
import { setCarts } from "@/store/user/cartSlice"
import { list as listCart } from '@/api/user/cart';

const Login = () => {
  const [form] = Form.useForm();
  const [messageApi] = useMessageApi();
  const router = useRouter()
  const dispatch = useAppDispatch()


  const fetchCart = useCallback(async () => {
    try {
      const response = await listCart();
      const { data } = response;
      dispatch(setCarts(data));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [dispatch]);

  const onFinish = async (values: any) => {
    try {
      const response = await login(values)
      const { data } = response;
      localStorage.setItem('user_token', data.access_token)
      const user = data.user
      dispatch(setCurrentUser(user));
      fetchCart()
      messageApi.open({
        type: 'success',
        content: 'Đăng nhập thành công !',
      })
      router.push('/')
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Tài khoản đăng nhập không đúng !',
      })
    }
  };
  
  return (
    <div>
      <h2 style={{ marginBottom: 15}}>Đăng nhập</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
            },
            {
              required: true,
              message: 'Vui lòng nhập'
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập'
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        
        <Form.Item {...tailFormItemLayout}>
          <div>
            <Button className="button-register" type="primary" htmlType="submit" size="large">
              Đăng nhập
            </Button>
          </div>
          <div style={{marginTop: 15}}>
            Đăng ký tài khoản <Link href="/dang-ky">Đăng ký</Link>
          </div>
        </Form.Item>
      </Form>
  </div>
  );
};

export default Login;