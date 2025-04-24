'use client';
import { Card, Typography, Col } from 'antd';

const { Paragraph, Text } = Typography;
import Link from 'next/link'
import Image from 'next/image';



interface ProductCardProps {
  product: any; // Thay thế bằng kiểu dữ liệu sản phẩm thực tế
  colProps?: any; // Cho phép tuỳ chỉnh Col nếu cần
}

export default function ProductCard(props: ProductCardProps) {
  const { product, colProps } = props;
  const getImageUrl = (previewImage: any) => {
    return `${previewImage.data.endpoint_url}/${previewImage.path}/${previewImage.filename}`;
  }

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
      <Link href={`/products/${name}`}>
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
            <Paragraph 
              ellipsis={{ rows: 3 }}
              style={{
                marginBottom: 8,
                height: '4.5em',
                overflow: 'hidden',
              }}
            >
              <Text>{product.name}</Text>
            </Paragraph>
            
            <Text strong type="danger">{product.price} vnđ</Text>
          </div>
        </Card>
      </Link>
    </Col>
  );
}
