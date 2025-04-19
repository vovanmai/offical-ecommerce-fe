'use client';
import { Row, Typography } from 'antd';
const { Title } = Typography;


import ProductCard from './ProductCard';
import { USER_PRIMARY_COLOR } from '@/constants/common';

const products = [
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/anh-render-iPhone12-1_EboWB3cK1.jpg',
    name: 'Dế sấy combo siêu ngon hiện đại(Duy nhất tại Lam Farm)',
    price: '99.000',
  },
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/200097704_2zeBpDuVR.jpg',
    name: 'Editable text with a custom enter icon in edit field. Editable text with a custom enter icon in edit field.',
    price: '99.000',
  },
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/200097704_2zeBpDuVR.jpg',
    name: 'Europe Street Beat with Super Long Name That Should Be Trimmed',
    price: '99.000',
  },
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/200097704_2zeBpDuVR.jpg',
    name: 'Europe Be Trimmed',
    price: '99.000',
  },
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/car-967387_1280_qZ_AJqGqZ.webp',
    name: 'Europe Street Beat with Super Long Name That Should Be Trimmed',
    price: '99.000',
  },
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/200097704_2zeBpDuVR.jpg',
    name: 'Europe Street Beat with Super Long Name That Should Be Trimmed',
    price: '99.000',
  },
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/lam-farm_x1X2aPHBt.jpg',
    name: 'Europe Street Beat with Super Long Name That Should Be Trimmed',
    price: '99.000',
  },
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/storedata__1__0Hil5ZISr.avif?updatedAt=1743864000715',
    name: 'Europe Street Beat with Super Long Name That Should Be Trimmed',
    price: '99.000',
  },
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/200097704_2zeBpDuVR.jpg',
    name: 'Europe Street Beat with Super Long Name That Should Be Trimmed fjsh síhakfhsd dfsafjsf sdofjsifdj',
    price: '99.000',
  },
  {
    image: 'https://ik.imagekit.io/ejqr7rydp/uploads/200097704_2zeBpDuVR.jpg',
    name: '123',
    price: '99.000',
  },
];

export default function ProductList() {
  return (
    <div className="container" style={{ marginTop: 12 }}>
      <Title style={{color: USER_PRIMARY_COLOR, marginTop: 20}} level={4}>Sản phẩm nội bật</Title>
      <Row gutter={[15, 15]}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </Row>
    </div>
  );
}
