'use client';

import React, { useState } from "react";
import { Breadcrumb, Card, Row, Col, InputNumber, Typography, Rate, Button, Space, Form, Input } from 'antd';
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, FreeMode, Navigation, Thumbs } from 'swiper/modules';
const { Text } = Typography;
import type { FormProps } from 'antd';
import { create as createCart } from '@/api/user/cart';
import { useRouter } from 'next/navigation';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { useMessageApi } from "@/components/user/MessageProvider";

type Props = {
  product: any;
};

const Detail = ({ product }: Props) => {
  const { detail_files = [] } = product;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
  const [messageApi] = useMessageApi();


  const buildBreadcrumbItems: any = (category: any): { title: JSX.Element }[] => {
    const items: { title: JSX.Element }[] = [];
  
    if (category.parent) {
      items.push(...buildBreadcrumbItems(category.parent));
    }
  
    items.push({
      title: <Link href={`/danh-muc-san-pham/${category.slug}`}>{category.name}</Link>,
    });
  
    return items;
  };

  const onChangeQuantity = (value: any) => {
    setQuantity(value)
  };

  const addToCart = async () => {
    const userToken = localStorage.getItem('user_token')

    if (!userToken) {
      messageApi.open({
        type: 'error',
        content: 'Vui lòng đăng nhập.',
      })
      router.push('/dang-nhap')
    }
    try {
      const params = {
        quantity,
        product_id: product.id
      }
      await createCart(params)
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error.data.message
      })
    }
  }

  const addToCartSubmit = async (values: any) => {
    await addToCart()
    messageApi.open({
      type: 'success',
      content: 'Thêm vào giỏ hàng thành công',
    })
  }

  const buyNow = async () => {
    await addToCart()
  }


  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={[
            { title: <Link href="/"> <HomeOutlined /> Trang chủ</Link> },
            ...buildBreadcrumbItems(product.category),
            {
              title: product.name,
            },
          ]}
        />

        <Card style={{ width: '100%' }}>
          <Row gutter={30}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Swiper
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper }}
                navigation
                modules={[Autoplay, Pagination, Navigation, FreeMode, Thumbs]}
              >
                {detail_files.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div style={{ aspectRatio: '1/1', position: 'relative', width: '100%' }}>
                      <img
                        src={`${item.data.endpoint_url}/${item.path}/${item.filename}`}
                        loading="lazy"
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Swiper Thumbs */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="my-swiper mt-4"
              >
                {detail_files.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div style={{ aspectRatio: '1/1', position: 'relative', width: '100%' }}>
                      <img
                        src={`${item.data.endpoint_url}/${item.path}/${item.filename}`}
                        loading="lazy"
                        alt={`Thumb ${index + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>

            {/* Phần Nội dung */}
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div style={{ marginBottom: 15 }}>
                <Text style={{fontSize: '1.25rem' }}>{product.name}</Text>
              </div>
              <div style={{ marginBottom: 15 }}><Rate defaultValue={5} disabled style={{fontSize: '.875rem'}} /></div>
              <div style={{padding: '0.8rem', backgroundColor: '#F9FAFB', marginBottom: 15 }}>
                <span style={{ fontSize: '1.5rem', color: '#EF4444' }}>
                  <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
                </span>
              </div>
              <div style={{ marginBottom: 15 }}>
                Đơn vị: <strong>{product.unit}</strong>
              </div>
              <div style={{ marginBottom: 15 }}>
                <Form
                  layout="horizontal"
                  initialValues={{}}
                >
                  <Form.Item
                    label="Số lượng"
                    name="quantity"
                  >
                    <Space>
                      <InputNumber size="large" min={1} max={product.inventory_quantity} defaultValue={1} onChange={onChangeQuantity} />
                      <div>Số lượng tồn kho: {product.inventory_quantity}</div>
                    </Space>
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button type="primary" size="large" ghost onClick={addToCartSubmit}>
                        Thêm vào giỏ hàng
                      </Button>
                      <Button type="primary" size="large" onClick={buyNow}>
                        Mua ngay
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </Card>
        <Card style={{ marginTop: 12 }}>
          <h3 style={{marginBottom: 12}}>Chi tiết sản phẩm</h3>
          <div 
            className="ckeditor-data"
            dangerouslySetInnerHTML={{ __html: product.description || '' }}
          >
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Detail;
