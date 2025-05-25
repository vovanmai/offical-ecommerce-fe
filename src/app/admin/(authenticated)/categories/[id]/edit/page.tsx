'use client'

import {Card, Select, Radio, Button, theme, Row, Col, Form, Space, Input, Switch } from "antd"
import { PlusCircleOutlined, ClearOutlined, SaveOutlined } from "@ant-design/icons"
import React, { useEffect, useState, useMemo } from "react"
import { buildCategoryTree, getCategoryOptions } from "@/helper/common"
import { toast } from 'react-toastify'
import withAuth from "@/hooks/withAuth";
import Breadcrumb from "@/components/Breadcrumb"
import { validateMessages } from "@/helper/common"
import SpinLoading from "@/components/SpinLoading"
import NestableCategory from "@/components/admin/NestableCategory"
import { getAll, update as updateCategory, updateOrder, getById, deleteCategory } from '@/api/admin/category'
const { TextArea } = Input;
import { useParams } from "next/navigation"
import Link from 'next/link'
import { ADMIN_ROUTES } from "@/constants/routes"
import ConfirmModal from "@/components/ConfirmModal"
import { useRouter } from "next/navigation"

const Page = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm()
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false)
  const [categories, setCategories] = useState([])
  const params = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deletedId, setDeletedId] = useState<any>(null)
  const router = useRouter()
  
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
  }
  const onFinish = async (values: any) => {
      try {
        setIsLoading(true)
        const response = await updateCategory(params.id, values)
        const { data } = response;
        setCategories(buildCategoryTree(data));
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
        setIsLoading(false)
      }
    };

    useEffect(() => {
      const getCategories = async () => {
        try {
          const response = await getAll();
          const { data } = response;
          setCategories(buildCategoryTree(data));
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
    
      const getCategory = async (id: any) => {
        try {
          const response = await getById(id);
          if (form) {
            form.setFieldsValue(response.data);
          }
        } catch (error) {
          console.error("Fetch category error:", error);
        }
      };
    
      getCategories();
      getCategory(params.id);
    }, [params, form]); // ⚠️ Đảm bảo form không bị thay đổi liên tục
    

  const updateCategoryOrder = async (data: Array<object>) => {
    try {
      await updateOrder({categories: data})
      toast.success('Cập nhật thành công!')
    } catch (error: any) {
    } finally {
    }
  }

  const actions = (
    <Link href={ADMIN_ROUTES.CATEGORY_PRODUCT_LIST}>
      <Button
        size="large"
        type="primary"
      >
        <PlusCircleOutlined />Tạo mới
      </Button>
    </Link>
  );

  const categoryOptions = useMemo(() => {
    const id = params.id ? Number(params.id) : null;
    return getCategoryOptions(categories, id);
  }, [categories, params.id]);


  const deleteRecord = async () => {
    try {
      setDeleteLoading(true)
      const response = await deleteCategory(deletedId)
      setShowConfirmDelete(false)
      const { data } = response;
      setCategories(buildCategoryTree(data));
      toast.success('Xoá thành công!')
      router.push(ADMIN_ROUTES.CATEGORY_PRODUCT_LIST)
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
        content={'Xoá danh mục sẽ xoá luôn sản phẩm. Bạn không thể khôi phục lại được.'}
      />
      <Breadcrumb items={[{title: 'Danh mục sản phẩm'}]} />
      <Row gutter={[16, 16]}>
        <Col span={9}>
          <Card title="Danh sách" extra={actions} variant="outlined">
            <NestableCategory id={params.id} categories={categories} onDelete={showDeleteConfirm} onChange={updateCategoryOrder} />
          </Card>
        </Col>
        <Col span={15}>
          <Card title="Chỉnh sửa" variant="outlined">
              <Form
                validateMessages={validateMessages}
                {...layout}
                form={form}
                initialValues={{ status: 1, parent_id: null, name: null, description: null }}
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
                    options={categoryOptions}
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
                  <Switch />
                </Form.Item>
                <Form.Item
                  name="is_display_footer"
                  label="Hiển thị dưới footer"
                  rules={rules.is_display_footer}
                  validateStatus={ errors?.is_display_footer ? 'error' : undefined}
                  help={errors?.is_display_footer ? errors?.is_display_footer : undefined}
                >
                  <Switch />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Space>
                    <Button size="large" disabled={loadingCreate} type="primary" htmlType="submit">
                      { loadingCreate ? <SpinLoading /> : <SaveOutlined /> }
                      Cập nhật
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
