'use client'

import { USER_PRIMARY_COLOR } from "@/constants/common"
import { Row, Col, Typography, Badge, Divider, FloatButton } from "antd"
const { Text } = Typography;
import FloatButtonChat from "@/components/user/FloatButtonChat"

import Link from 'next/link'
import Image from 'next/image'
const { Title } = Typography;
import FacebookPagePlugin from "@/components/user/FacebookPagePlugin"
import { useAppSelector } from "@/store/user/hooks"


const LayoutFooter = () => {
  const postCategories = useAppSelector((state) => state.app.postCategories)
  const productCategories = useAppSelector((state) => state.app.productCategories)
  const pages = useAppSelector((state) => state.app.pages)

  const fillterPages = pages.filter((page: any) => {
    return page.is_display_footer;
  })

  const fillterPostCategories = postCategories.filter((category: any) => {
    return category.is_display_footer;
  })
  const fillterProductCategories = productCategories.filter((category: any) => {
    return category.is_display_footer;
  })

  return (
    <footer style={{ marginTop: 20 }}>
      <div style={{ background: USER_PRIMARY_COLOR, height: "2rem", marginBottom: 20 }}></div>
      <FloatButtonChat/>
      <div className="container">
        <div className="container__inner">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Link href="/">
                  <Image 
                    src="/lamsfarm_logo.jpeg" 
                    alt="Logo" 
                    width={100} 
                    height={100}
                    style={{
                      height: 100,
                      width: 'auto',
                    }}
                  />
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
                { fillterProductCategories && fillterProductCategories.map((category: any) => (
                  <Link key={category.id} style={{color: "inherit"}} href={`/danh-muc-san-pham/${category.slug}`}>{category.name}</Link>
                ))}
              </div>
            </Col>
            <Col style={{gap: 8}} xs={24} sm={12} md={5}>
              <div className="d-flex flex-direction-column" style={{gap: 8}}>
                <Title style={{color: "#00573e", margin: 0}} level={5}>HỖ TRỢ KHÁCH HÀNG</Title>
                { fillterPages && fillterPages.map((page: any) => (
                  <Link key={page.id} style={{color: "inherit"}} href={`/trang/${page.slug}.html`}>{page.name}</Link>
                ))}
                { fillterPostCategories && fillterPostCategories.map((category: any) => (
                  <Link key={category.id} style={{color: "inherit"}} href={`/danh-muc-bai-viet/${category.slug}`}>{category.name}</Link>
                ))}
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