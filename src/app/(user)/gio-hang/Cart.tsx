'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { Table, Row, Col, Space, Button, Tooltip, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { list as listCart, deleteCart, update as updateCart } from '@/api/user/cart';
import numeral from 'numeral';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  product: {
    price: number;
  };
}

import { useAppDispatch, useAppSelector } from '@/store/user/hooks';
import { setCarts } from "@/store/user/cartSlice"

const Cart = () => {
  const dispatch = useAppDispatch()
  const carts = useAppSelector((state) => state.cart.carts)
  const fetchCart = useCallback(async () => {
    try {
      const response = await listCart();
      dispatch(setCarts(response.data));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, []);

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

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

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
            <img
              src={`${product.preview_image.data.endpoint_url}/${product.preview_image.path}/${product.preview_image.filename}`}
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
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: CartItem) => (
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
    <div className="container" style={{ marginTop: 24 }}>
      <div className="container__inner">
        <Row gutter={16}>
          <Col lg={16} xs={24}>
            <Table
              dataSource={carts}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          </Col>
          <Col lg={8} xs={24}>
            {/* Có thể bổ sung tổng tiền / nút thanh toán ở đây */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cart;
