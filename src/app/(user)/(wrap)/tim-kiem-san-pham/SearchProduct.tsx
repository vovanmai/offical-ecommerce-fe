'use client'

import { useState, useEffect, useMemo } from 'react';
import { Breadcrumb, Empty, Row, Pagination } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { list as listProducts } from '@/api/user/product';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/user/ProductCard';

const SearchProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = useMemo(() => searchParams.get('keyword') || '', [searchParams]);
  const currentPage = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams]);

  const fetchProducts = async () => {
    if (!keyword) return;

    setLoading(true);
    try {
      const response = await listProducts({
        page: currentPage,
        per_page: pageSize,
        keyword,
      });

      const data = response.data;
      setProducts(data.data);
      setPaginationTotal(data.total); // total item count
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    router.push(`/danh-muc-san-pham/${params.slug}?page=${page}&keyword=${keyword}`);
  };

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb style={{ marginBottom: 12 }} items={[
          {
            title: <Link href="/"><HomeOutlined /> Trang chủ</Link>,
          },
          {
            title: 'Tìm kiếm sản phẩm',
          },
        ]} />

        {!keyword ? (
          <h3>Vui lòng nhập từ khoá tìm kiếm</h3>
        ) : (
          <h3 style={{ marginBottom: 20 }}>
            {total === 0 ? 'Không có' : `Có ${total}`} kết quả tìm kiếm cho từ khoá:{' '}
            <span style={{ color: 'red' }}>{keyword}</span>
          </h3>
        )}

        {products.length === 0 ? (
          <Empty />
        ) : (
          <>
            <Row
              gutter={{
                xs: 12,
                sm: 12,
                md: 24,
                lg: 24,
                xl: 24,
                xxl: 24,
              }}
            >
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </Row>
            <div className="d-flex justify-content-center" style={{ marginTop: 20 }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={paginationTotal}
                onChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
