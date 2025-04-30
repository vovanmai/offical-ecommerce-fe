
'use client'

import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import {
  Button,
  Form,
  Input,
  Select,
  Alert
} from 'antd';

import { register } from '@/api/user/auth';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
  },
};

export const metadata = {
  title: 'Đăng ký',
  description: 'Đăng ký',
}

const Register = () => {
  const [form] = Form.useForm();

  const router = useRouter()

  const onFinish = async (values: any) => {
    try {
      await register(values)
      router.push('/dang-nhap')
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi trong quá trình đăng ký');
    }
    console.log('Received values of form: ', values);
  };

  
  return (
    <div>
      <h2 style={{ marginBottom: 15}}>Đăng ký tài khoản</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Alert style={{ marginBottom: 25}} showIcon message="Bất kỳ thông tin nào đăng ký không đúng, đều có thể bị khóa tài khoản!" type="warning" />


        <Form.Item
          name="name"
          label="Họ và tên"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập'
            },
            {
              max: 50,
              message: 'Tối đa 50 ký tự'
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
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
            {
              max: 50,
              message: 'Tối đa 50 ký tự'
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>


        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập'
            },
            {
              pattern: /^\d{10,11}$/,
              message: 'Số điện thoại không hợp lệ (chỉ gồm 10 hoặc 11 chữ số)',
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
            {
              min: 8,
              message: 'Phải ít nhất 8 ký tự'
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="password_confirmation"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Xác nhận mật khẩu không khớp'));
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        
        <Form.Item {...tailFormItemLayout}>
          <div>
            <Button className="button-register" type="primary" htmlType="submit" size="large">
              Đăng ký
            </Button>
          </div>
          <div style={{marginTop: 15}}>
            Bạn có tài khoản rồi ? <Link href="/dang-nhap">Đăng nhập</Link>
          </div>
        </Form.Item>
      </Form>
  </div>
  );
};

export default Register;