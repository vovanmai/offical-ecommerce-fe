
import React from "react";
import Banner from "@/components/user/layout/Banner";
import ProductList from "@/components/user/ProductList";
import HomePostList from "@/components/user/HomePostList";
import { Col, Row, Card } from "antd";
import Image from "next/image";

export const metadata = {
  title: 'Trang chủ',
  keywords: 'Trang chủ, sản phẩm, dịch vụ',
};

const Page = () => {

  const items = [
    {
      alt: 'Giao hàng nhanh',
      src: '/icon-giao-hang-nhanh.png',
    },
    {
      alt: 'Hàng chính hãng',
      src: '/icon-hang-chinh-hang.png',
    },
    {
      alt: 'Giá ưu đãi',
      src: '/icon-big-sale.png',
    },
    {
      alt: 'Đổi trả trong 30 ngày',
      src: '/icon-tra-hang.png',
    },
  ]

  return (
    <>
      <Banner/>
      <div className="container">
        <div className="container__inner">
          <Row gutter={[14, 14]} style={{ marginTop: 20 }}>
            {items.map((item, index) => (
              <Col xs={24} sm={12} md={12} lg={6} key={index}>
                <Card style={{ textAlign: 'center', borderRadius: 12, padding: 10 }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={50}
                    height={50}
                    quality={100}
                  />
                  <p style={{ color: '#015C3F' }}>
                    <strong>
                      {item.alt.toUpperCase()}
                    </strong>
                  </p>
                </Card>
              </Col>
            ))}
        </Row>
        </div>
      </div>
      
      <ProductList />
      <HomePostList />
    </>
  );
};

export default Page;