
import React from "react";
import Banner from "@/components/user/layout/Banner";
import ProductList from "@/components/user/ProductList";
import HomePostList from "@/components/user/HomePostList";

export const metadata = {
  title: 'Trang chủ',
  keywords: 'Trang chủ, sản phẩm, dịch vụ',
  authors: [{ name: 'Nguyễn Văn A', url: 'https://example.com' }],
  creator: 'Nguyễn Văn A',
  publisher: 'Công ty ABC',
  description: 'Mô tả trang',
  openGraph: {
    title: 'Trang chủ',
    description: 'Mô tả trang',
    url: 'https://example.com',
    siteName: 'Tên trang web',
    images: [
      {
        url: 'https://example.com/image.jpg',
        width: 800,
        height: 600,
        alt: 'Mô tả hình ảnh',
      },
    ],
    locale: 'vi-VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trang chủ',
    description: 'Mô tả trang',
    images: ['https://example.com/image.jpg'],
    creator: '@nguyenvana',
    site: '@nguyenvana',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon.png',
    },
  },
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'en-US': '/en',
      'fr-FR': '/fr',
    },
    types: {
      'application/rss+xml': '/feed.xml',
      'application/atom+xml': '/atom.xml',
    },
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