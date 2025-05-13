
import React from "react";
import Banner from "@/components/user/layout/Banner";
import ProductList from "@/components/user/ProductList";
import HomePostList from "@/components/user/HomePostList";

export const metadata = {
  title: 'Trang chủ',
  keywords: 'Trang chủ, sản phẩm, dịch vụ',
  icons: {
    icon: '/lamsfarm_logo.jpeg',
    shortcut: '/lamsfarm_logo.jpeg',
    apple: '/lamsfarm_logo.jpeg',
  },
  robots: {
    index: true,
    follow: true,
  }
};

const Page = () => {
  return (
    <>
      <Banner/>
      <ProductList />
      <HomePostList />
    </>
  );
};

export default Page;