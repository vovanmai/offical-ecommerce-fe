'use client';
import { Card } from 'antd';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

export default function HighlightPost(props: any) {
  const { post } = props;

  const styleName: CSSProperties = {
    marginBottom: '8px',
    marginTop: '8px',
    lineHeight: '1.5', // Quan trọng để đúng 2 dòng
    maxHeight: '3em',  // 2 dòng x 1.5em = 3em
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    fontSize: '16px',
    fontWeight: 600,
  };

  const styleDescription: CSSProperties = {
    marginTop: '4px',
    fontSize: '14px',
    lineHeight: '1.5', // 3 dòng x 1.5 = 4.5em
    maxHeight: '4.5em',
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
    <Link className='zoom' href={`/bai-viet/${post.slug}.html`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div>
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
            className="zoom-image"
            width={179}
            height={179}
          />
        </div>
        <div style={styleName}>{post.name}</div>
        <div style={styleDescription}>{post.short_description}</div>
      </div>
    </Link>
  );
}
