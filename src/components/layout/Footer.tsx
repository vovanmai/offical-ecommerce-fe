import { Layout } from "antd";
const { Footer } = Layout;

const LayoutFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Ecommerce ©{new Date().getFullYear()} Created by Lionel Vo
    </Footer>
  )
}

export default LayoutFooter