'use client'
import {Card, Select, Radio, Button, Switch, Tooltip, theme, Row, Col, Form, Space, Input } from "antd"
import { PlusCircleOutlined, ClearOutlined, DeleteOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { buildCategoryTree, getCategoryOptions } from "@/helper/common"
import { toast } from 'react-toastify'
import withAuth from "@/hooks/withAuth";
import Breadcrumb from "@/components/Breadcrumb"
import { validateMessages } from "@/helper/common"
import SpinLoading from "@/components/SpinLoading"
import NestableCategory from "@/components/admin/NestableCategory"
import { getAll, create as createCategory, updateOrder, deleteCategory } from '@/api/admin/post-category'
import ConfirmModal from "@/components/ConfirmModal"
const { TextArea } = Input;

const Page = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false)
  const [categories, setCategories] = useState([])
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deletedId, setDeletedId] = useState<any>(null)
  
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const onReset = () => {
    form.resetFields();
    setErrors({})
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };
  const rules: any = {
    name: [
      { required: true },
      { max: 50 },
    ],
    status: [
      { required: true },
    ],
    parent_id: [
      { required: false },
    ],
    description: [
      { required: false },
      { max: 255 },
    ],
    is_display_main_menu: [
      { required: true },
    ],
    is_display_footer: [
      { required: true },
    ],
  }

  const getCategories = async () => {
    try {
      setLoading(true)
      const response = await getAll();
      const { data } = response;
      setCategories(buildCategoryTree(data));
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false)
    }
  };

  const onFinish = async (values: any) => {
      try {
        setLoadingCreate(true)
        const response = await createCategory(values)
        const { data } = response;
        setCategories(buildCategoryTree(data));
        form.resetFields()
        setErrors({})
        toast.success('Tạo thành công!')
      } catch (error: any) {
        const statusCode = error.status
        if(statusCode == 422) {
        setErrors(error?.data?.errors as Record<string, string>);
        } else {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
        }
      } finally {
        setLoadingCreate(false)
      }
    };

  useEffect(() => {
    getCategories()
  }, [])

  const updateCategoryOrder = async (items: Array<object>) => {
    try {
      await updateOrder({categories: items})
      toast.success('Cập nhật thành công!')
    } catch (error: any) {
    } finally {
    }
  }

  const deleteRecord = async () => {
    try {
      setDeleteLoading(true)
      const response = await deleteCategory(deletedId)
      setShowConfirmDelete(false)
      const { data } = response;
      setCategories(buildCategoryTree(data));
      toast.success('Xoá thành công!')
    } catch (error: any) {
      console.log(error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
    } finally {
      setDeleteLoading(false)
    }
  };
  
  const showDeleteConfirm = (id: number) => {
    setShowConfirmDelete(true)
    setDeletedId(id)
  };

  return (
    <div>
      <ConfirmModal
        visible={showConfirmDelete}
        onOk={deleteRecord}
        onCancel={() => setShowConfirmDelete(false)}
        confirmLoading={deleteLoading}
        content={'Xoá danh mục sẽ xoá luôn bài viết. Bạn không thể khôi phục lại được.'}
      />
      <Breadcrumb items={[{title: 'Danh mục bài viết'}]} />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={9} span={9}>
          <Card title="Danh sách" variant="outlined">
            { loading ? 'Đang tải...' :<NestableCategory type='post' categories={categories} onDelete={showDeleteConfirm} onChange={updateCategoryOrder} />}
          </Card>
        </Col>
        <Col xs={24} md={15} span={15}>
          <Card title="Tạo mới" variant="outlined">
              <Form
                validateMessages={validateMessages}
                {...layout}
                form={form}
                initialValues={{ 
                  status: 1, 
                  parent_id: null, 
                  name: null, 
                  description: null,
                  is_display_main_menu: true,
                  is_display_footer: true,
                }}
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
                  name="parent_id"
                  label="Danh mục cha"
                  rules={rules.parent_id}
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="---Chọn---"
                    filterOption={(input, option) => {
                      const label = String(option?.label ?? ""); // Ép kiểu về string
                      return label.toLowerCase().includes(input.toLowerCase());
                    }}
                    options={getCategoryOptions(categories)}
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

                <Form.Item
                  name="is_display_main_menu"
                  label="Hiển thị trên menu chính"
                  rules={rules.is_display_main_menu}
                  validateStatus={ errors?.is_display_main_menu ? 'error' : undefined}
                  help={errors?.is_display_main_menu ? errors?.is_display_main_menu : undefined}
                >
                  <Switch defaultChecked />
                </Form.Item>
                <Form.Item
                  name="is_display_footer"
                  label="Hiển thị dưới footer"
                  rules={rules.is_display_footer}
                  validateStatus={ errors?.is_display_footer ? 'error' : undefined}
                  help={errors?.is_display_footer ? errors?.is_display_footer : undefined}
                >
                  <Switch defaultChecked />
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
