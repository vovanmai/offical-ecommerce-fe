
import React from "react";
import Banner from "@/components/user/layout/Banner";
import ProductList from "@/components/user/ProductList";
import HomePostList from "@/components/user/HomePostList";
import { Col, Row, Card } from "antd";
import Image from "next/image";

export const metadata = {
  title: "Trang chủ | Hợp tác xã Lam'sFarm chuyên cung cấp sản phẩm ngon đến quý khách hàng",
  description: "Hợp tác xã Lam'sFarm chuyên cung cấp sản phẩm ngon đến quý khách hàng",
  keywords: 'Công ty ABC, sản phẩm, dịch vụ, ưu đãi, trang chủ, chất lượng',
  authors: [{ name: 'Công ty ABC', url: 'https://example.com' }],
  openGraph: {
    title: "Trang chủ | Hợp tác xã Lam'sFarm",
    description: 'Truy cập trang chủ của Công ty ABC để xem các sản phẩm nổi bật và dịch vụ chuyên nghiệp dành cho bạn.',
    url: 'https://lamsfarm.com.vn',
    siteName: "Hợp tác xã Lam'sFarm",
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
      alt: 'Đổi trả trong 30 ngày',
      src: '/icon-tra-hang.png',
    },
  ]

  return (
    <>
      <Banner banners={banners}/>
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