'use client'
import { Col, Input, Badge, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { FaPhone } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
const { Search } = Input;
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { USER_PRIMARY_COLOR } from '@/constants/common';
import { FaUserCircle, FaCartPlus } from "react-icons/fa";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

import { Dropdown, Space } from 'antd';

import type { MenuProps } from 'antd';


const MiddleHeader = () => {
  const items: MenuProps['items'] = [
    {
      key: 'dang-nhap',
      label: (
        <Link href="/dang-nhap">
          Đăng nhập
        </Link>
      )
    },
    {
      key: 'dang-ky',
      label: (
        <Link href="/dang-ky">
          Đăng ký
        </Link>
      )
    }
  ];
  return (
    <div id="middle-header">
      <div className="container" style={{ padding: '10px 0px'}}>
        <div className="d-flex align-items-center justify-content-between" style={{ gap: 70}}>
          <div className="logo">
            <Link href="/">
              <Image src="/lam-farm.jpg" alt="Logo" width={80} height={80} />
            </Link>
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
  )
}

export default MiddleHeader