'use client'
import { Button, Input, Badge, Tooltip, Drawer, Menu } from 'antd';
const { Search } = Input;

type MenuItem = Required<MenuProps>['items'][number];
import Link from 'next/link'
import Image from 'next/image'
import { SearchOutlined } from '@ant-design/icons';
import { USER_PRIMARY_COLOR } from '@/constants/common';
import { FaUserCircle, FaCartPlus } from "react-icons/fa";
import { DownOutlined, MenuOutlined, HomeFilled } from '@ant-design/icons';
import { list as listCart } from '@/api/user/cart';


import { Dropdown, Space } from 'antd';

import type { MenuProps } from 'antd';
import { useAppSelector } from '@/store/user/hooks';
import { getProfile, logout } from '@/api/user/auth';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '@/store/user/hooks';
import { setCurrentUser } from "@/store/user/authSlice"
import { setCarts } from "@/store/user/cartSlice"
import { useMessageApi } from '@/components/user/MessageProvider';

const MiddleHeader = () => {
  const dispatch = useAppDispatch()
  const carts = useAppSelector((state) => state.cart.carts)
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const [items, setItems] = useState<MenuProps['items']>([]);
  const [messageApi] = useMessageApi();
  const [cartCount, setCartCount] = useState(0)
  const productCategories = useAppSelector((state) => state.app.productCategories)
  const postCategories = useAppSelector((state) => state.app.postCategories)
  const pages = useAppSelector((state) => state.app.pages)

  const fetchCart = useCallback(async () => {
      try {
        const response = await listCart();
        const { data } = response;
        dispatch(setCarts(data));
        const count = data.reduce((acc: number, item: any) => acc + item.quantity, 0);
        setCartCount(count);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const fetchUserProfile = async () => {
      try {
        const response = await getProfile();
        const { data } = response;
        dispatch(setCurrentUser(data));
      } catch (error) {
      }
    };
    if (token) {
      fetchUserProfile();
      fetchCart();
    }
  }, [dispatch, fetchCart]);

  useEffect(() => {
    const count = carts.reduce((acc: number, item: any) => acc + item.quantity, 0);
    setCartCount(count);
  }, [carts])

  const isLoggedIn = !!currentUser;

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user_token');
      dispatch(setCurrentUser(null));
      dispatch(setCarts([]));
      messageApi.open({
        type: 'success',
        content: 'Đăng xuất thành công !',
      })
    }
    catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const newItems: MenuProps['items'] = isLoggedIn
      ? [
          {
            key: 'profile',
            label: <Link href="/thong-tin-ca-nhan">Thông tin cá nhân</Link>,
          },
          {
            key: 'logout',
            label: <span onClick={handleLogout}>Đăng xuất</span>,
          },
        ]
      : [
          {
            key: 'dang-nhap',
            label: <Link href="/dang-nhap">Đăng nhập</Link>,
          },
          {
            key: 'dang-ky',
            label: <Link href="/dang-ky">Đăng ký</Link>,
          },
        ];
  
    setItems(newItems);
  }, [isLoggedIn]);

  const [open, setOpen] = useState(false);


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const menus: MenuItem[] = [
    {
      key: 'home',
      label: (<Link href="/">Trang chủ</Link>),
      icon: <HomeFilled />,
    },
    {
      key: '1',
      label: 'Trang chủ',
      children: [
        { key: '11', label: 'Option 1' },
        { key: '12', label: 'Option 2' },
        { key: '13', label: 'Option 3' },
        { key: '14', label: 'Option 4' },
      ],
    },
    {
      key: '2',
      label: 'Tra22ng chủ',
      children: [
        { key: '11', label: 'Option 1' },
        { key: '12', label: 'Option 2' },
        { key: '13', label: 'Option 3' },
        { key: '14', label: 'Option 4' },
      ],
    },
  ];

  const buildCategoryTree = (categories: any, parentId: number | null = null, type: any): any[] => {
    // Lọc các danh mục có parent_id trùng với parentId
    const children = categories.filter((category: any) => category.parent_id === parentId);
  
    return children.map((category: any) => {
      // Khởi tạo đối tượng category
      const categoryNode: any = {
        key: category.id,
        label: <Link href={`/${type}/${category.slug}`}>{category.name}</Link>,
      };
  
      // Gọi đệ quy để lấy các con (nếu có)
      const subCategories = buildCategoryTree(categories, category.id, type);
  
      // Nếu có con, thêm thuộc tính 'children'
      if (subCategories.length > 0) {
        categoryNode.children = subCategories;
      }
  
      return categoryNode;
    });
  };

  return (
    <div id="middle-header">
      <div className="container">
        <div className="container__inner">
          <div className="d-flex align-items-center justify-content-between">
            <div id="toggle-menu" >
              <Button onClick={showDrawer}  style={{boxShadow: "none"}} type="primary" icon={<MenuOutlined />} />
              <Drawer
                className="drawer-mobile"
                title="Danh mục"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                width={250}
                open={open}
                styles={{ body: { padding: 12 } }}
              >
                <Menu
                  className="menu-mobile"
                  mode="inline"
                  defaultSelectedKeys={['home']}
                  onClick={(e) => {
                    setOpen(false);
                  }}
                  style={{ width: 256 }}
                  items={[
                    {
                      key: 'home',
                      label: (<Link href="/">Trang chủ</Link>),
                      icon: <HomeFilled />,
                    },
                    ...buildCategoryTree(productCategories, null, 'danh-muc-san-pham'),
                    ...buildCategoryTree(postCategories, null, 'danh-muc-bai-viet'),
                    ...pages.map((page: any) => ({
                      key: `page-${page.id}`,
                      label: <Link href={`/trang/${page.slug}.html`}>{page.name}</Link>,
                    })),
                  ]}
                />
              </Drawer>
            </div>
            <Link id="button-search-mobile" href="/">
              <Button style={{boxShadow: "none"}} type="primary" shape="circle" icon={<SearchOutlined />} />
            </Link>
            <div className="logo" style={{ padding: '5px 0px' }}>
              <a href="/">
                <Image src="/lamsfarm_logo.jpeg" alt="Logo" width={100} height={80} />
              </a>
            </div>
            <div className="flex-1 search-input" style={{ padding: '0px 0px' }}>
              <Search
                placeholder="Tìm kiếm sản phẩm..."
                allowClear
                enterButton
                size="large"
              />
            </div>
            <div className="d-flex align-items-center">
              <Link href="/gio-hang">
                <Tooltip title="Giỏ hàng">
                  <Badge showZero count={cartCount}>
                    <FaCartPlus style={{fontSize: 28, color: USER_PRIMARY_COLOR}} />
                  </Badge>
                </Tooltip>
              </Link>
            </div>
            <div className="d-flex align-items-center">
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <FaUserCircle style={{fontSize: 25, color: USER_PRIMARY_COLOR}} />
                    <DownOutlined style={{color: USER_PRIMARY_COLOR}} />
                  </Space>
                </a>
                </Dropdown>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiddleHeader