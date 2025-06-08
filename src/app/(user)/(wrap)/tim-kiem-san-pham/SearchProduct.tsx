'use client'

import { useState } from 'react';
import { Breadcrumb, Empty } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { list as listProducts } from '@/api/user/product';
import numeral from 'numeral';
import Link from 'next/link';

const SearchProduct = () => {
  const [products, setProducts] = useState<any[]>([]);

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={[
            { title: <Link href="/"> <HomeOutlined /> Trang chủ</Link> },
            {
              title: 'Tim kiếm sản phẩm',
            },
          ]}
        />

        
      </div>
    </div>
  );
};

export default SearchProduct;
