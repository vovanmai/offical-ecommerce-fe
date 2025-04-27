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
import NavBarClient from './NavBarClient';


export default async function NavBar() {
  const productCategoryRequest = await fetch(`${process.env.API_BASE_URL}/api/categories?type=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    cache: 'no-store'
  })

  const response1 = await productCategoryRequest.json()

  const productCategories = response1.data;


  const postCategoryRequest = await fetch(`${process.env.API_BASE_URL}/api/categories?type=2`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    cache: 'no-store'
  })

  const response2 = await postCategoryRequest.json()

  const postCategories = response2.data;

  return (
    <NavBarClient productCategories={productCategories} postCategories={postCategories} />
  )
}
