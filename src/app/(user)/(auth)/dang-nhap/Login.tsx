
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

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await register(values)
      
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi trong quá trình đăng ký');
    }
    console.log('Received values of form: ', values);
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