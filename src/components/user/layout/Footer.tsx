'use client'

import { USER_PRIMARY_COLOR } from "@/constants/common"
import { Row, Col, Typography, Badge, Divider } from "antd"
const { Text } = Typography;

import Link from 'next/link'
import Image from 'next/image'
const { Title } = Typography;
import FacebookPagePlugin from "@/components/user/FacebookPagePlugin"


const LayoutFooter = () => {
  return (
    <footer style={{ marginTop: 20 }}>
      <div style={{ background: USER_PRIMARY_COLOR, height: "2rem", marginBottom: 20 }}></div>
      <div className="container">
        <div className="container__inner">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Link href="/">
                  <Image src="/lamsfarm_logo.jpeg" alt="Logo" width={120} height={100} />
                </Link>
                <Text italic>Lam&apos;s Farm chuyên cung cấp các sản phẩm ngon, uy tín đến quý khách hàng.</Text>
                <Badge color="black" text="Tên đơn vị: Hợp tác xã Lam Nguyễn" />
                <Badge color="black" text="Địa chỉ: 526/13 Nguyễn Tri Phương, khối Thanh Nam, phường Cẩm Nam, tp Hội An, Quảng Nam" />
                <Badge color="black" text="Email: nguyenlam.htx@gmail.com" />
                <Badge color="black" text="Phone: 078.249.7116" />
              </div>
            </Col>
            <Col className="d-flex flex-direction-column" style={{gap: 8}} xs={24} sm={12} md={5}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Title style={{color: "#00573e", margin: 0}} level={5}>DANH MỤC SẢN PHẨM</Title>
                <Link style={{color: "inherit"}} href="a">Sản phẩm khô</Link>
              </div>
            </Col>
            <Col style={{gap: 8}} xs={24} sm={12} md={5}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Title style={{color: "#00573e", margin: 0}} level={5}>CHÍNH SÁCH</Title>
                <Link style={{color: "inherit"}} href="">Chính sách bán hàng</Link>
                <Link style={{color: "inherit"}} href="">Hướng dẫn mua hàng</Link>
                <Link style={{color: "inherit"}} href="">Chính sách đổi trả</Link>
                <Link style={{color: "inherit"}} href="">Giới thiệu</Link>
                <Link style={{color: "inherit"}} href="">Tuyển dụng</Link>
              </div>
            </Col>
            <Col className="d-flex flex-direction-column" style={{gap: 8}} xs={24} sm={12} md={8}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Title style={{color: "#00573e", margin: 0}} level={5}>FANPAGE</Title>
                <div>
                  <FacebookPagePlugin />
                </div>
              </div>
            </Col>
          </Row>
          <Divider />
          <div className="copyright">
            © 2025 - All rights reserved by <Link style={{color: "inherit"}} href="https://lamsfarm.com.vn">https://lamsfarm.com.vn</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LayoutFooter