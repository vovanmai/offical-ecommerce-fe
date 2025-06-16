'use client';
import { Row, Typography } from 'antd';
const { Title } = Typography;

import ProductCard from './ProductCard';

import { list as listProducts } from '@/api/user/product';
import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listProducts({limit: 12});
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  
  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Title style={{marginTop: 20}} level={4}>Sản phẩm nội bật</Title>
        <Row
          gutter={[
            { xs: 10, sm: 16, md: 24, lg: 24 },
            { xs: 10, sm: 16, md: 24, lg: 24 }
          ]}
        >
          {products.map((product, index) => (
            <ProductCard
              product={product}
              key={index}
            />
          ))}
        </Row>
      </div>
    </div>
  );
}
