'use client'

import { USER_PRIMARY_COLOR } from "@/constants/common"
import { Row, Col, Typography, Badge, Divider } from "antd"
const { Text } = Typography;

import Link from 'next/link'
import Image from 'next/image'
const { Title } = Typography;


const LayoutFooter = () => {
  return (
    <footer style={{ marginTop: 20 }}>
      <div style={{ background: USER_PRIMARY_COLOR, height: "2rem" }}></div>
      <div className="container">
        <div className="container__inner">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Link href="/">
                  <Image src="/lam-farm.jpg" alt="Logo" width={100} height={100} />
                </Link>
                <Text italic>Bé xinh shop chuyên bán quần áo trẻ em online Đẹp - Rẻ - Uy Tín tại Tphcm, giao hàng tận nơi trên Toàn quốc. Cam kết: Hàng chất lượng, mẫu mã đa dạng, đổi trả hàng nếu không vừa ý.
                </Text>
                <Badge color="black" text="Phone: 0986.308.460" />
                <Badge color="black" text="Địa chỉ: Thôn sơn viên, xã duy nghĩa, huyện duy xuyên, tỉnh quảng nam" />
              </div>
            </Col>
            <Col className="d-flex flex-direction-column" style={{gap: 8}} xs={24} sm={12} md={6}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Title style={{color: "#00573e", margin: 0}} level={5}>DANH MỤC SẢN PHẨM</Title>
                <Link style={{color: "inherit"}} href="a">Thực phẩm chức năng</Link>
              </div>
            </Col>
            <Col style={{gap: 8}} xs={24} sm={12} md={6}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Title style={{color: "#00573e", margin: 0}} level={5}>CHÍNH SÁCH</Title>
                <Link style={{color: "inherit"}} href="a">Chính sách bán hàng</Link>
                <Link style={{color: "inherit"}} href="a">Hướng dẫn mua hàng</Link>
                <Link style={{color: "inherit"}} href="a">Chính sách đổi trả</Link>
                <Link style={{color: "inherit"}} href="a">Giới thiệu</Link>
                <Link style={{color: "inherit"}} href="a">Tuyển dụng</Link>
              </div>
            </Col>
            <Col className="d-flex flex-direction-column" style={{gap: 8}} xs={24} sm={12} md={6}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Title style={{color: "#00573e", margin: 0}} level={5}>FANPAGE</Title>
                <div>11</div>
              </div>
            </Col>
          </Row>
          <Divider />
          <div className="copyright">
            © 2025 - All rights reserved by <Link style={{color: "inherit"}} href="https:lamsfarm.com">https:lamsfarm.com</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LayoutFooter