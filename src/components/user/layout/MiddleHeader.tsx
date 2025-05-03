'use client'
import { Button, Input, Badge, Tooltip } from 'antd';
const { Search } = Input;
import Link from 'next/link'
import Image from 'next/image'
import { SearchOutlined } from '@ant-design/icons';
import { USER_PRIMARY_COLOR } from '@/constants/common';
import { FaUserCircle, FaCartPlus } from "react-icons/fa";
import { DownOutlined, MenuOutlined } from '@ant-design/icons';

import { Dropdown, Space } from 'antd';

import type { MenuProps } from 'antd';

import { useAppSelector } from '@/store/user/hooks';
import { getProfile, logout } from '@/api/user/auth';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/user/hooks';
import { setCurrentUser } from "@/store/user/authSlice"
import { useMessageApi } from '@/components/user/MessageProvider';

const MiddleHeader = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const [items, setItems] = useState<MenuProps['items']>([]);
  const [messageApi] = useMessageApi();
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
    }
  }, []);

  const isLoggedIn = !!currentUser;

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user_token');
      dispatch(setCurrentUser(null));
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

  return (
    <div id="middle-header">
      <div className="container">
        <div className="container__inner">
          <div className="d-flex align-items-center justify-content-between">
            <div id="toggle-menu" >
              <Button  style={{boxShadow: "none"}} type="primary" icon={<MenuOutlined />} />
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
                  <Badge count={5}>
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