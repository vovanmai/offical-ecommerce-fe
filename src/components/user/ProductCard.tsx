'use client';
import { Card, Typography, Col } from 'antd';
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
                width: '100%',
                aspectRatio: '1 / 1', // giữ hình vuông
                overflow: 'hidden',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            >
              <Image
                src={getImageUrl(product.preview_image)}
                alt={product.name}
                className="product-image"
                width={179}
                height={179}
              />
            </div>
          }
          style={{ borderRadius: 12 }}
        >
          <div>
            <div style={styleTitle}>{product.name}</div>
            <span style={stylePrice}>
              <strong>{numeral(product.price).format('0,0')} vnđ
              </strong>
            </span>
          </div>
        </Card>
      </Link>
    </Col>
  );
}
