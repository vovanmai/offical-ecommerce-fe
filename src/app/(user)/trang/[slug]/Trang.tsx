'use client'

import React from 'react';
import { Card, Breadcrumb } from 'antd';
import { HomeOutlined } from "@ant-design/icons";
import Link from 'next/link';

const Trang = (props: any) => {
  const { page } = props;

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={[
            { title: <Link href="/"> <HomeOutlined /> Trang chủ</Link> },
            {
              title: page.name,
            },
          ]}
        />
        <Card style={{ marginTop: 12 }}>
          <div 
            className="ckeditor-data"
            dangerouslySetInnerHTML={{ __html: page.description || '' }}
          >
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Trang;
