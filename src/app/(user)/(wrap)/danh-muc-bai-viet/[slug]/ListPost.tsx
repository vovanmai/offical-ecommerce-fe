'use client';

import React, { useState, useCallback, use, useEffect } from "react";
import { Breadcrumb, Pagination, Row, Col, InputNumber, Typography, Rate, Button, Space, Form, Input } from 'antd';
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from 'next/image';
import { listByCategory } from '@/api/user/post';
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PostByCategory from "@/components/user/PostByCategory";

const ListPost = () => {
  const [posts, setPosts] = useState<any>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const params: any = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const buildBreadcrumbItems: any = (category: any): { title: JSX.Element }[] => {
    const items: any = [];
    if (!category) return items;
    if (category.parent) {
      items.push(...buildBreadcrumbItems(category.parent));
    }
  
    items.push({
      title: category.name,
    });
  
    return items;
  };

  const fetchPosts = async (parameters: any) => {
      setLoading(true);
      try {
        const response = await listByCategory(params.slug, parameters);

        const {post_paginate, category} = response.data;

        setPosts(post_paginate.data);
        setPaginationTotal(post_paginate.last_page);
        setCategory(category);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    const parameters = {
      page: searchParams.get('page') || 1,
      limit: pageSize,
    }
    fetchPosts(parameters);
  }, [searchParams]);

  const handlePageChange = (page: number, pageSize: number) => {
    router.push(`/danh-muc-bai-viet/${params.slug}?page=${page}`);
  };

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={[
            { title: <Link href="/"><HomeOutlined /> Trang chủ</Link> },
            ...buildBreadcrumbItems(category),
          ]}
        />
        <h3>{category?.name}</h3>
        <Row gutter={[14, 14]} style={{ marginTop: 12 }}>
          {posts.map((post: any, index: any) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <PostByCategory
                index={index}
                post={post}
              />
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center" style={{ marginTop: 20 }}>
          <Pagination 
            defaultCurrent={1} 
            pageSize={pageSize}
            total={paginationTotal} 
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPost;
