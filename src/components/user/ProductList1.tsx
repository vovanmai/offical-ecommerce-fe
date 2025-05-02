import { Row } from 'antd';
import ProductCard from './ProductCard';

export const dynamic = 'force-dynamic';

export default async function ProductList() {
  const data = await fetch(`${process.env.API_BASE_URL}/api/products`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });
  const response = await data.json()

  const products = response.data;

  const style = {
    marginBottom: '0.5em',
    color: 'rgba(0, 0, 0, 0.88)',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: 1.4,
    marginTop: 20,
  };

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <h4 style={style}>Sản phẩm nội bật</h4>
        <Row gutter={[25, 25]}>
          {products && products.map((product: any, index: any) => (
            <ProductCard
              product={product}
              key={index}
            />
          ))}
        </Row>
      </div>
    </div>
  );  
}
