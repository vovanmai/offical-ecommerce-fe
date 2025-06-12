'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getFileLink } from '@/helper/common';
import Image from 'next/image';

const Banner = ({banners = []}: {banners: any[]}) => {
  return (
    <div id="banner">
      <div className="container">
      <Swiper
        style={{
          aspectRatio: '16/6'
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
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            <div className="w-100 h-100">
              <a className="d-block w-100 h-100" href={banner.url}>
                <Image
                  src={getFileLink(banner.image)}
                  alt={banner.name || 'Banner Image'}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
  )
}

export default Banner