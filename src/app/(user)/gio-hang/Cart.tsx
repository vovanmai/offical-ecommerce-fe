'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { Table, Row, Col, Space, Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ConfirmModal from '@/components/ConfirmModal';
import { list as listCart } from '@/api/user/cart';
import numeral from 'numeral';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  product: {
    price: number;
  };
}

const Cart = () => {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [deleteState, setDeleteState] = useState<{
    visible: boolean;
    id: number | null;
    loading: boolean;
  }>({
    visible: false,
    id: null,
    loading: false,
  });

  const fetchCart = useCallback(async () => {
    try {
      const response = await listCart();
      setCarts(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const showDeleteConfirm = (id: number) => {
    setDeleteState({ visible: true, id, loading: false });
  };

  const deleteCartItem = async () => {
    if (deleteState.id === null) return;

    try {
      setDeleteState(prev => ({ ...prev, loading: true }));
      // await deleteRequest(deleteState.id); // Bật lại nếu có API xoá
      setCarts(prev => prev.filter(item => item.id !== deleteState.id));
      setDeleteState({ visible: false, id: null, loading: false });
      // toast.success("Xoá thành công!");
    } catch (error) {
      console.error(error);
      // toast.error("Xoá thất bại!");
      setDeleteState(prev => ({ ...prev, loading: false }));
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
      dataIndex: 'product',
      key: 'price',
      render: (product: CartItem['product']) =>
        `${numeral(product.price).format('0,0')} đ`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: CartItem) => (
        <Space>
          <Tooltip title="Xoá">
            <Button
              type="text"
              onClick={() => showDeleteConfirm(record.id)}
              icon={<DeleteOutlined style={{ color: 'red' }} />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newKeys: React.Key[]) => {
      setSelectedRowKeys(newKeys as number[]);
    },
  };

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="container__inner">
        <ConfirmModal
          visible={deleteState.visible}
          onOk={deleteCartItem}
          onCancel={() =>
            setDeleteState(prev => ({ ...prev, visible: false }))
          }
          confirmLoading={deleteState.loading}
        />

        <Row gutter={16}>
          <Col lg={16} xs={24}>
            <Table
              // rowSelection={rowSelection}
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
