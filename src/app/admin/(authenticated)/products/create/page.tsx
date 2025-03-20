'use client'
import {Card, Button, Form, Space, Input, Row, Col, Radio, InputNumber } from "antd"
import { UnorderedListOutlined, ClearOutlined, PlusCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import React, { useState } from "react"
import withAuth from "@/hooks/withAuth"
import { ADMIN_ROUTES } from "@/constants/routes"
import { getAll } from "@/api/user/permission"
import { createRole } from '@/api/user/role'
import {useRouter} from "next/navigation"
import { groupBy } from "lodash"
import SpinLoading from "@/components/SpinLoading"
import Breadcrumb from "@/components/Breadcrumb"
import { toast } from 'react-toastify'
import type { UploadFile, UploadProps } from 'antd';
import { validateMessages } from "@/helper/common"
import UploadImage from "@/components/admin/UploadImage"

type ActionType = 'list' | 'edit' | 'create' | 'delete' | 'detail'
interface PermissionItem {
  id: number;
  action: ActionType;
}

interface PermissionGroupInterface {
  group: 'user' | 'role';
  permissions: PermissionItem[];
  checkedValues: number[],
}

const ListRoles = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroupInterface[]>([]);

  const onFinish = async (values: any) => {
    const permissionIds = permissionGroups.flatMap(group => group.checkedValues);

    try {
      setLoadingSubmit(true)
      await createRole({...values, permission_ids: permissionIds})
      toast.success('Tạo thành công!')
      router.push(ROUTES.DASHBOARD_ROLE_LIST)
    } catch (error: any) {
      setErrors(error?.data?.errors as Record<string, string>);
    } finally {
      setLoadingSubmit(false)
    }
  };

  const onReset = () => {
    form.resetFields();
    setErrors({})
    setPermissionGroups(permissionGroups.map(item => ({...item, checkedValues: []})))
  };
  const actions = (
    <Link href={ADMIN_ROUTES.PRODUCT_LIST}>
      <Button
        size="large"
        type="primary"
      >
        <UnorderedListOutlined />Danh sách
      </Button>
    </Link>
  );

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 20 },
  };

  const tailLayout = {
    wrapperCol: { offset: 11, span: 16 },
  };

  const onChangeUploadPreviewImage = (ids: any) => {
    form.setFieldsValue({ preview_image_id: ids[0] ?? null });
    form.setFieldsValue({ preview_image_id: ids.at(0) ?? null });

  };

  const rules: any = {
    name: [
      { required: true },
      { max: 50 },
    ],
    status: [
      { required: true },
    ],
    price: [
      { required: true },
    ],
    preview_image_id: [
      { required: true, message: 'Vui lòng chọn ảnh.' },
    ],
    description: [
      { required: true },
    ],
  }

  const initialValues={ 
    status: 1,
    price: null, 
    name: null, 
    description: null,
    preview_image_id: null,
  }

  return (
    <div>
      <Breadcrumb items={[{title: 'Sản phẩm'}]} />
      <Card title="Tạo mới" bordered={false} extra={actions}>
        <Form
          {...layout}
          form={form}
          onFinish={onFinish}
          style={{ width: '100%' }}
          validateMessages={validateMessages}
          initialValues={initialValues}
        >
          <Row gutter={[24, 24]}>
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
                name="price"
                label="Giá"
                rules={rules.price}
                validateStatus={ errors?.name ? 'error' : undefined}
                help={errors?.name ? errors?.name : undefined}
              >
                <InputNumber size="large" min={1000} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                  name="preview_image"
                  label="Ảnh đại diện"
                  rules={rules.preview_image_id}
                >
                  <UploadImage
                    onChange={onChangeUploadPreviewImage}
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

export default withAuth(ListRoles)
