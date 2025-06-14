'use client'

import { useState, useEffect, useMemo } from 'react';
import { Breadcrumb, Empty, Row, Pagination, Card, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { list as listProducts } from '@/api/user/product';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/user/ProductCard';
const { Search } = Input;


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
    console.log(keyword)
    fetchProducts();
  }, [keyword, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    router.push(`/danh-muc-san-pham/${params.slug}?page=${page}&keyword=${keyword}`);
  };
  const onSearch = (value: string) => {
    if (value.trim() === '') {
      router.push(`/tim-kiem-san-pham`);
    } else {
      router.push(`/tim-kiem-san-pham?keyword=${value.trim()}&page=1`);
    }
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

        <Card className="search-product-mobile">
          <div>
            <Search
              placeholder="Vui lòng nhập từ khoá tìm kiếm..."
              allowClear
              onSearch={onSearch}
              enterButton
              size="large"
            />
          </div>
        </Card>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <h3 style={{ marginBottom: 20 }}>
              { keyword && total > 0 && (
                <span>
                  Kết quả tìm kiếm cho từ khoá: <strong style={{color: "red"}}>{keyword}</strong> ({total} sản phẩm)
                </span>
              )}
              { keyword && total === 0 && (
                <span>
                  Không tìm thấy sản phẩm nào với từ khoá: <strong style={{color: "red"}}>{keyword}</strong>
                </span>
              )}
          </h3>
        </div>

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
              style={{ marginTop: 20 }}
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
