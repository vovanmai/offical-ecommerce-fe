'use client';
import { Card, Typography, Col, Rate } from 'antd';
const { Paragraph, Text } = Typography;
import Link from 'next/link'
import Image from 'next/image';
import numeral from 'numeral';
import Test from '@/components/user/layout/Test';
import { use } from 'react';
import type { CSSProperties } from 'react';


interface ProductCardProps {
  product: any; // Thay thế bằng kiểu dữ liệu sản phẩm thực tế
  colProps?: any; // Cho phép tuỳ chỉnh Col nếu cần
}

export default function ProductCard(props: ProductCardProps) {
  const { product, colProps } = props;
  const getImageUrl = (previewImage: any) => {
    return `${previewImage.data.endpoint_url}/${previewImage.path}/${previewImage.filename}`;
  }

  const styleTitle: CSSProperties = {
    marginBottom: '8px',
    height: '4.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
  };

  const stylePrice: CSSProperties = {
    color: 'red',
  };

  return (
    <Col
      {...{
        xs: 12,
        sm: 12,
        md: 8,
        lg: 6,
        xl: 6,
        ...colProps,
      }}
    >
      <Link href={`/san-pham/${product.slug}.html`}>
        <Card
          className="product-card"
          cover={
            <div
              style={{
                position: "relative",
                width: '100%',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            >
              <Image
                src={getImageUrl(product.preview_image)}
                alt={product.name}
                className="product-image"
                fill
                quality={40}
                style={{
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
            </div>
          }
          style={{ borderRadius: 12 }}
        >
          <div>
            <div style={styleTitle}>{product.name}</div>
            <div>
              <Text strong style={{ color: 'red', marginRight: 8 }}>
                {numeral(product.sale_price ?? product.price).format('0,0')} đ
              </Text>
              {product.sale_price && (
                <Text type="secondary" delete>
                  {numeral(product.price).format('0,0')} đ
                </Text>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </Col>
  );
}
