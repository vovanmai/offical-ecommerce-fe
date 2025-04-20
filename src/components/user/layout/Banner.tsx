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
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Banner = () => {
  
  return (
    <div id="banner">
      <div className="container">
      <Swiper
        style={{
          height: '359px',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="/image.png"
            loading="lazy"
            className="w-100"
          />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>
      </Swiper>
      </div>
    </div>
  )
}

export default Banner