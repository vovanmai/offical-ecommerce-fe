'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Row, Col, Card } from 'antd';

export default function PostByCategory(props: any) {
  const { post } = props;

  const styleName: CSSProperties = {
    marginBottom: '8px',
    lineHeight: '1.5', // Quan trọng để đúng 2 dòng
    maxHeight: '3em',
    minHeight: '3em',  // 2 dòng x 1.5em = 3em
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    fontSize: '14px',
    fontWeight: 600,
  };

  const styleDescription: CSSProperties = {
    marginTop: '3px',
    fontSize: '14px',
    lineHeight: '1.5', // 3 dòng x 1.5 = 4.5em
    maxHeight: '4.5em',
    minHeight: '4.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    color: '#595959', // Màu chữ nhẹ hơn
  };

  if (!post) {
    return null; // Hoặc có thể hiển thị một thông báo nào đó
  }

  const getImageUrl = (previewImage: any) => {
    return `${previewImage.data.endpoint_url}/${previewImage.path}/${previewImage.filename}`;
  }

  return (
    <Card className="post-card" style={{ borderRadius: 12, overflow: 'hidden' }}>
      <Link href={`/bai-viet/${post.slug}.html`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Row>
        <Col span="6">
          <div
            style={{
              width: '100%',
              aspectRatio: '4/3',
              overflow: 'hidden',
              borderRadius: 12,
            }}
          >
            <Image
              src={getImageUrl(post.preview_image)}
              alt={post.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 12,
              }}
              width={400}
              height={300}
            />
          </div>
        </Col>
        <Col span="18" style={{ paddingLeft: '16px' }}>
          <div style={styleName}>{post.name}</div>
          <div style={styleDescription}>{post.short_description}</div>
        </Col>
      </Row>
    </Link>
  </Card>
    
  );
}
