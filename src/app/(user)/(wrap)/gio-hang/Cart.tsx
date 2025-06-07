'use client'

import React, { useCallback } from 'react';
import { Table, Row, Col, Card, Space, Button, Tooltip, InputNumber, Divider, Breadcrumb, Empty } from 'antd';
import { DeleteOutlined, HomeOutlined } from '@ant-design/icons';
import { list as listCart, deleteCart, update as updateCart } from '@/api/user/cart';
import numeral from 'numeral';
import Link from 'next/link';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/store/user/hooks';
import { setCarts } from "@/store/user/cartSlice"

const Cart = () => {
  const dispatch = useAppDispatch()
  const carts = useAppSelector((state) => state.cart.carts)
  const totalPrice = carts.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0);
  const fetchCart = useCallback(async () => {
    try {
      const response = await listCart();
      dispatch(setCarts(response.data));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [dispatch]);

  const onChangeQuantity = async (cartId: Number, value: any) => {
    if(!value) {
      return
    }
    try {
      await updateCart(cartId, { quantity: value })
      await fetchCart();
    } catch (error) {
      
    }

  }

  const onDelete = async (id: Number) => {
    try {
      await deleteCart(id)
      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

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
        `${numeral(record.product.price * record.quantity).format('0,0')} đ`,
    },
    {
      title: 'Số lượng',
      render: (record: any) => {
        return (
          <InputNumber size="large" min={1} max={record.product.inventory_quantity} defaultValue={record.quantity} onChange={(value: any) => onChangeQuantity(record.id, value)} />
        )
      }
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <Space>
          <Tooltip title="Xoá">
            <Button
              type="text"
              onClick={() => onDelete(record.id)}
              icon={<DeleteOutlined style={{ color: 'red' }} />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={[
            { title: <Link href="/"> <HomeOutlined /> Trang chủ</Link> },
            {
              title: 'Giỏ hàng',
            },
          ]}
        />

        {carts.length == 0 && <div>
          <Empty />  
          <div className="d-flex justify-content-center" style={{ marginTop: 20 }}>
            <Link href="/">
              <Button type="primary" size="large">
                Tiếp tục mua sản phẩm
              </Button>
            </Link>
          </div>
        </div>}
        {carts.length > 0 && <Row gutter={[20, 20]}>
          <Col lg={16} xs={24}>
            <Table
              dataSource={carts}
              columns={columns}
              rowKey="id"
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          </Col>
          <Col lg={8} xs={24}>
            <Card style={{ width: '100%' }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>Tổng tiền sản phẩm: </div>
                <div>
                  <strong>{ numeral(totalPrice).format('0,0') } đ</strong>
                </div>
              </div>
              <Divider />
              <div>
                <Link href="/mua-hang">
                  <Button shape="round" type="primary" size="large" style={{ width: '100%' }}>
                    Mua hàng
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>}
      </div>
    </div>
  );
};

export default Cart;
