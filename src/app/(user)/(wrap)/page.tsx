
import React from "react";
import Banner from "@/components/user/layout/Banner";
import ProductList from "@/components/user/ProductList";
import HomePostList from "@/components/user/HomePostList";
import { Col, Row, Card } from "antd";
import Image from "next/image";
import { SLOGAN, WEB_NAME, HOSTNAME } from "@/constants/common"; 

export const metadata = {
  title: `${WEB_NAME} - ${SLOGAN} - ${HOSTNAME}`,
  description: `${WEB_NAME} chuyên cung cấp sản phẩm ngon đến quý khách hàng`,
  keywords: `${WEB_NAME}`,
  authors: [{ name: `${WEB_NAME}`, url: process.env.APP_URL }],
  creator: `${WEB_NAME}`,
  applicationName: `${WEB_NAME}`,
  openGraph: {
    title: `${WEB_NAME} - ${SLOGAN} - ${HOSTNAME}`,
    description: `${WEB_NAME} chuyên cung cấp sản phẩm ngon đến quý khách hàng`,
    url: process.env.APP_URL,
    siteName: `${WEB_NAME}`,
    locale: 'vi_VN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const getBanners = async () => {
  const data = await fetch(`${process.env.API_BASE_URL}/api/banners`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const response = await data.json()
  return response.data;
}

const Page = async () => {

  const banners = await getBanners();

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
      alt: 'Đổi trả trong 3 ngày',
      src: '/icon-tra-hang.png',
    },
  ]

  return (
    <>
      <Banner banners={banners}/>
      <div className="container">
        <div className="container__inner">
          <Row 
            gutter={[14, 14]} 
            style={{ marginTop: 20 }}
          >
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