'use client';
import { Row, Typography, Col } from 'antd';
const { Title } = Typography;
import HighlightPost from './HighlightPost';
import {list as listPosts} from '@/api/user/post';
import { useEffect, useState } from 'react';

export default function HomePostList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [ postHighlight, setPostHighlight] = useState<any>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await listPosts({limit: 12});
        const { data } = response;
        setPostHighlight(data[0] ?? null);
        setPosts(data.slice(1));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
      }
    };
    fetchPosts();
  }, []);
  
  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Title style={{marginTop: 20}} level={4}>Bài viết nổi bật</Title>
        <Row gutter={[25, 25]}>
          <Col xs={24} sm={24} md={8}>
            <HighlightPost
              post={postHighlight}
            />
          </Col>
          <Col xs={24} sm={24} md={16}>
            2
          </Col>
        </Row>
      </div>
    </div>
  );
}
