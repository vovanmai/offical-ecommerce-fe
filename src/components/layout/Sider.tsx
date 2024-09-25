'use client'
import { Layout, Menu, MenuProps } from "antd"
const { Sider } = Layout
import React, {CSSProperties, useEffect, useState} from "react"
import { useRouter, usePathname } from "next/navigation"
type MenuItem = Required<MenuProps>['items'][number]

const LayoutSider = ({collapsed, menus}: {collapsed: boolean, menus: MenuItem[]}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedMenu, setSelectedMenu] = useState<string[]>([])

  useEffect(() => {
    let currentRoute = pathname.replace('/dashboard/', '');
    currentRoute = currentRoute.replace(/^\/|\/$/g, '');
    setSelectedMenu([currentRoute])
  }, [pathname])


  const siderStyle: CSSProperties = {
    height: '100vh',
    position: 'fixed',
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column"
  };

  const menuStyle: CSSProperties = {
    flex: 1,
    overflowY: "auto",
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
  };

  const selectMenu: MenuProps['onSelect'] = (menuInfo) => {
    const routes: { [key: string]: string } = {
      'users': '/dashboard/users',
      'roles': '/dashboard/roles',
    }

    const route = menuInfo?.key && routes[menuInfo.key] ? routes[menuInfo.key] : null;

    if (route) {
      router.push(route)
    }
  }

  return (
    <Sider theme="light" style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
      <div style={{color: 'green', display: "flex", alignItems: "center", justifyContent: "center", height: 64, borderBottom: '1px solid rgba(5, 5, 5, 0.06)', borderRight: '1px solid rgba(5, 5, 5, 0.06)'}}>
        <span style={{fontSize: 30, fontWeight: "bold"}}>XD</span>
      </div>
      <div style={menuStyle}>
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={selectedMenu}
          items={menus}
          onSelect={selectMenu}
        />
      </div>
    </Sider>
  )
}

export default LayoutSider