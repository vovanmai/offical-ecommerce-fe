'use client'
import { Col, Input, Button, Menu } from 'antd';
import dayjs from 'dayjs';
import { FaPhone } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
const { Search } = Input;
import Link from 'next/link'
import Image from 'next/image'
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import { USER_PRIMARY_COLOR } from '@/constants/common';
import { FaUserCircle, FaCartPlus } from "react-icons/fa";
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import { Dropdown, Space } from 'antd';

import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];


const PcMenu = () => {

  const [current, setCurrent] = useState('trang-chu');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const items2: MenuItem[] = [
    {
      label: 'Trang chủ',
      key: 'trang-chu',
      icon: <HomeOutlined />,
    },
    {
      label: 'Na Two',
      key: 'app',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Ntion Two',
      key: '2',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Naon Two',
      key: 'gfasf2',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Non Two',
      key: 'gfasffs2',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'sfa',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        { label: 'Option 1', key: 'setting:1' },
            { label: 'Option 2', key: 'setting:2' },
      ],
    },
    {
      key: 'alipay',
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Tin Tức
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Xã hội 
        </a>
      ),
      children: [
        {
          key: '2-1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              Truyền thông
            </a>
          ),
        },
        {
          key: '2-2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              Kinh tế
            </a>
          ),
        },
      ]
    },
  ];
  return (
    <div id="pc-menu" style={{ backgroundColor: USER_PRIMARY_COLOR }}>
      <div className="container" style={{ padding: '0px 0px'}}>
        <div className="container__inner d-flex align-items-center">
          <Dropdown 
            menu={{ items, selectable: true, defaultSelectedKeys: ['21'], }}
          >
            <Button style={{ boxShadow: "none", border: "1px solid white", marginRight: 20 }} type="primary" shape="round" icon={<MenuOutlined />} size="middle">
                Danh mục
            </Button>
          </Dropdown>
          <Menu className="w-100" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items2} />
        </div>
      </div>
    </div>
  )
}

export default PcMenu