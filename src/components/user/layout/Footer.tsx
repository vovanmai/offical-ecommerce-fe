'use client'

import { USER_PRIMARY_COLOR } from "@/constants/common"
import { Row, Col, Typography } from "antd"
import Link from 'next/link'

const { Title } = Typography;


const LayoutFooter = () => {
  return (
    <footer style={{ marginTop: 20 }}>
      <div style={{ background: USER_PRIMARY_COLOR, height: "2rem" }}></div>
      <div className="container" style={{ padding: '20px 0px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <p>Content for column 1</p>
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
              <Link style={{color: "inherit"}} href="a">Chính sách giao hàng</Link>
              <Link style={{color: "inherit"}} href="a">Hướng dẫn mua hàng</Link>
              <Link style={{color: "inherit"}} href="a">Chính sách bảo hành</Link>
              <Link style={{color: "inherit"}} href="a">Xử lý khiếu nại</Link>
            </div>
          </Col>
          <Col className="d-flex flex-direction-column" style={{gap: 8}} xs={24} sm={12} md={6}>
            <div className="d-flex flex-direction-column" style={{gap: 8}}>
              <Title style={{color: "#00573e", margin: 0}} level={5}>VỀ CHÚNG TÔI</Title>
              <Link style={{color: "inherit"}} href="a">Giới thiệu</Link>
              <Link style={{color: "inherit"}} href="a">Tuyển dụng</Link>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default LayoutFooter