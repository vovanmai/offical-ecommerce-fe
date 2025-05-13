'use client';

import React, { useState, useCallback } from "react";
import { Breadcrumb, Card, Row, Col, InputNumber, Typography, Rate, Button, Space, Form, Input } from 'antd';
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from 'next/image';


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
  post: any;
};

import { list as listCart } from '@/api/user/cart';
import { useAppDispatch, useAppSelector } from '@/store/user/hooks';
import { setCarts } from "@/store/user/cartSlice"

const Detail = ({ post }: Props) => {
  const buildBreadcrumbItems: any = (category: any): { title: JSX.Element }[] => {
    const items: { title: JSX.Element }[] = [];
  
    if (category.parent) {
      items.push(...buildBreadcrumbItems(category.parent));
    }
  
    items.push({
      title: <Link href={`/danh-muc-bai-viet/${category.slug}`}>{category.name}</Link>,
    });
  
    return items;
  };

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={[
            { title: <Link href="/"> <HomeOutlined /> Trang chủ</Link> },
            ...buildBreadcrumbItems(post.category),
            {
              title: post.name,
            },
          ]}
        />

        <Card style={{ width: '100%' }}>
          <h2>{post.name}</h2>
          <div style={{ 
            marginBottom: 15,
            marginTop: 15,
            borderRadius: "0.5rem", 
            overflow: 'hidden',
            padding: 10,
            background: "#EAF4EC",
          }}>
            <em>
              {post.short_description}
            </em>
            </div>
          <div className="ckeditor-data"
            dangerouslySetInnerHTML={{ __html: post.description || '' }}
          >
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Detail;
