'use client';

import React, { useState } from "react";
import { Breadcrumb, Card, Row, Col, Typography } from 'antd';
import { HomeOutlined } from "@ant-design/icons";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, FreeMode, Navigation, Thumbs } from 'swiper/modules';
const { Text } = Typography;


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

type Props = {
  product: any;
};

const Page = ({ product }: Props) => {
  const { detail_files = [] } = product;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: <span>Sản phẩm</span>,
            },
            {
              title: product.name,
            },
          ]}
        />

        <Card style={{ width: '100%' }}>
          <Row gutter={10}>
            {/* Phần Ảnh */}
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
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-4"
              >
                {detail_files.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div style={{ aspectRatio: '5/3', position: 'relative', width: '100%' }}>
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
              <Text style={{fontSize: '1.25rem', color: '#00573E'}}>{product.name}</Text>
              <p style={{ marginTop: 8 }}>{product.description}</p>
              {/* Bạn thêm các thông tin khác ở đây */}
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Page;
