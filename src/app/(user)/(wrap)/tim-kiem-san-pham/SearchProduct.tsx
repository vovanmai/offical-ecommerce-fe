'use client'

import { useState, useEffect } from 'react';
import { Breadcrumb, Empty, Row, Pagination } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { list as listProducts } from '@/api/user/product';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/user/ProductCard";

const SearchProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const params: any = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [total, setTotal] = useState(0);

  const fetchProducts = async (parameters: object) => {
    setLoading(true);
    try {
      const response = await listProducts(parameters);
      const data = response.data;
      setProducts(data.data);
      setPaginationTotal(data.last_page);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }
  
    useEffect(() => {
      const keyword = searchParams.get('keyword') || '';
      if (!keyword) return
      const parameters = {
        page: searchParams.get('page') || 1,
        per_page: pageSize,
        keyword: searchParams.get('keyword') || '',
      }
      fetchProducts(parameters);
    }, [searchParams]);
  
    const handlePageChange = (page: number, pageSize: number) => {
      router.push(`/danh-muc-san-pham/${params.slug}?page=${page}`);
    };

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={[
            { title: <Link href="/"> <HomeOutlined /> Trang chủ</Link> },
            {
              title: 'Tim kiếm sản phẩm',
            },
          ]}
        />
        { !searchParams.get('keyword') && (
          <h3>Vui lòng nhập từ khoá tìm kiếm</h3>
        )}
        { searchParams.get('keyword') && (
          <h3 style={{ marginBottom: 20 }}>{total == 0 ? 'Không có' : 'Có ' + total } kết quả tìm kiếm cho từ khoá: '<span style={{ color: 'red' }}>{searchParams.get('keyword')}</span>'</h3>
        )}

        {products.length == 0 && <Empty />}
        { products.length > 0 && (<div>
          <Row 
            gutter={{
              xs: 12,    // <576px
              sm: 12,   // ≥576px
              md: 24,   // ≥768px
              lg: 24,   // ≥992px
              xl: 24,   // ≥1200px
              xxl: 24,  // ≥1600px
            }}
          >
            {products.map((product: any, index: any) => (
              <ProductCard
                product={product}
                key={index}
              />
            ))}
          </Row>
          <div className="d-flex justify-content-center" style={{ marginTop: 20 }}>
            <Pagination 
              defaultCurrent={1} 
              pageSize={pageSize}
              total={paginationTotal} 
              onChange={handlePageChange}
            />
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default SearchProduct;
