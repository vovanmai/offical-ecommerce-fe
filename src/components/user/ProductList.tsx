import { Row, Typography } from 'antd';
const { Title } = Typography;

import ProductCard from './ProductCard';


export default async function ProductList() {
  const data = await fetch('http://laravel.test/api/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  const response = await data.json()

  const products = response.data;



  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        {/* <Title style={{marginTop: 20}} level={4}>Sản phẩm nội bật</Title> */}
        <Row gutter={[25, 25]}>
          {products.map((product: any, index: any) => (
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
