
import React from "react";
import SearchProduct from "./SearchProduct";
export const metadata = {
  title: 'Tim kiếm sản phẩm',
  description: 'Tìm kiếm sản phẩm',
  openGraph: {
    title: 'Tìm kiếm sản phẩm',
    description: 'Tìm kiếm sản phẩm',
    url: `${process.env.APP_URL}/tim-kiem-san-pham`,
    type: 'website',
  },
}

import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense fallback={''}>
      <SearchProduct />
    </Suspense>
  );
};

export default Page;