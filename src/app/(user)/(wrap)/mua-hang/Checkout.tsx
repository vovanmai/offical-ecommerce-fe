'use client'

import React, { useEffect } from 'react';
import { Table, Row, Col, Card, Form, Button, Input, Radio, Divider } from 'antd';
import numeral from 'numeral';
import { useRouter } from 'next/navigation';
import { create as createOrder } from '@/api/user/order'
import Image from 'next/image';
import Link from 'next/link';
import type { RadioChangeEvent } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/user/hooks';
import { setCarts } from "@/store/user/cartSlice"
import { useMessageApi } from '@/components/user/MessageProvider';
const { TextArea } = Input;

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const Checkout = () => {
  const router = useRouter()
  const [messageApi] = useMessageApi();
  const dispatch = useAppDispatch()
  const [form] = Form.useForm();
  const carts = useAppSelector((state) => state.cart.carts)
  const totalPrice = carts.reduce((acc: number, item: any) => acc + (item.product.sale_price ?? item.product.price) * item.quantity, 0);
  const currentUser: any = useAppSelector((state) => state.auth.currentUser)

  useEffect(() => {
    if(carts.length === 0) {
      router.push('/gio-hang')
    }
  }, [carts, router])

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      render: (product: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={`${product.preview_image.data.endpoint_url}/${product.preview_image.path}/${product.preview_image.filename}`}
              alt={product.name}
              width={179}
              height={179}
              style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4, marginRight: 12 }}
            />
            <span>{product.name}</span>
          </div>
        )
      },
    },
    {
      title: 'Giá thành',
      render: (record: any) =>
        `${numeral((record.product.sale_price ?? record.product.price) * record.quantity).format('0,0')} đ`,
    },
    {
      title: 'Số lượng',
      render: (record: any) => {
        return (
          record.quantity
        )
      }
    },
  ];

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
  };

  const onSubmit = async () => {
    form.validateFields()
      .then(async (values) => {
        console.log(values)
        try {
          await createOrder(values)
          dispatch(setCarts([]))
          messageApi.open({
            type: 'success',
            content: 'Đặt hàng thành công !. Cảm ơn bạn đã mua hàng của chúng tôi..',
          })
          router.push('/')
        }
        catch (error) {
          messageApi.open({
            type: 'error',
            content: 'Có lỗi xảy ra !',
          })
        }
      }).catch((error: any) => {
        
      })
  };

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="container__inner">
        <Row gutter={[20, 20]}>
          <Col lg={16} xs={24}>
            <Table
              dataSource={carts}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                initialValues={{
                  name: currentUser?.name, 
                  email: currentUser?.email, 
                  phone: currentUser?.phone,
                  payment_method: 1,
                }}
                style={{ maxWidth: "100%" }}
                scrollToFirstError
              >
                <Card style={{ width: '100%', marginTop: 24 }}>
                  <h4 style={{ marginBottom: 15}}>Thông tin người mua</h4>
                  
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
                </Card>
                <Card style={{ width: '100%', marginTop: 24 }}>
                  <h4 style={{ marginBottom: 15}}>Thông tin giao hàng</h4>
                    <Form.Item
                      name="shipping_address"
                      label="Địa chỉ giao hàng"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập'
                        },
                        {
                          max: 255,
                          message: 'Tối đa 255 ký tự'
                        },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Tối đa 255 ký tự" />
                    </Form.Item>
                    <Form.Item
                      name="note"
                      label="Ghi chú"
                      rules={[
                        {
                          max: 255,
                          message: 'Tối đa 255 ký tự'
                        },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Tối đa 255 ký tự" />
                    </Form.Item>
                </Card>
                <Card style={{ width: '100%', marginTop: 24 }}>
                  <h4 style={{ marginBottom: 15}}>Phương thức thanh toán</h4>
                    <Form.Item
                      name="payment_method"
                      labelCol={{ span: 6 }} // chiếm không gian label
                      wrapperCol={{ span: 18 }}
                    >
                      <Radio.Group
                        style={style}
                        options={[
                          { value: 1, label: 'Tiền mặt' },
                        ]}
                      />
                    </Form.Item>
                </Card>
            </Form>
          </Col>
          <Col lg={8} xs={24}>
            <Card style={{ width: '100%' }}>
              <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 12 }}>
                <div>Tổng tiền sản phẩm: </div>
                <div>
                  <strong>{ numeral(totalPrice).format('0,0') } đ</strong>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 12 }}>
                <div>Phí giao hàng: </div>
                <div>
                  <strong>{ numeral(30000).format('0,0') } đ</strong>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div>Tổng tiền: </div>
                <div>
                  <strong>{ numeral(totalPrice + 30000).format('0,0') } đ</strong>
                </div>
              </div>
              <Divider />
              <div>
                <Button onClick={onSubmit} shape="round" type="primary" size="large" style={{ width: '100%', marginBottom: 12 }} >
                  Hoàn tất đơn hàng
                </Button>
                <Link href="/gio-hang">
                    <Button shape="round" type="default" size="large" style={{ width: '100%' }}>
                      Trở về giỏ hàng
                    </Button>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
