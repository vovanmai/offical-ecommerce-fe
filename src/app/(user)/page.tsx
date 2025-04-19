'use client';
import React from 'react';
import Banner from '@/components/user/layout/Banner';
import ProductList from '@/components/user/ProductList';

const Page: React.FC = () => {
    return (
        <div>
            <Banner />
            <ProductList />
        </div>
    );
};

export default Page;