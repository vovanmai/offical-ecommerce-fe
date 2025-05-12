'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {list as listBanner} from '@/api/user/banner';
import { useEffect, useState } from 'react';


const Banner = () => {

  const [banners, setBanners] = useState<any[]>([]);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await listBanner();
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
      }
    };
    fetchBanners()
  }, [])

  return (
    <div id="banner">
      <div className="container">
      <Swiper
        style={{
          aspectRatio: '16/7', width: '100%'
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
            <div style={{ 
              aspectRatio: '16/7',
              width: '100%',
            }}>
              <a href={banner.url}>
                <img
                src={`${banner.image.data.endpoint_url}/${banner.image.path}/${banner.image.filename}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
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