'use client'
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { FaPhone } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { USER_PRIMARY_COLOR } from '@/constants/common';

const TopHeader = () => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [time, setTime] = useState(dayjs().format('dddd DD/MM/YYYY HH:mm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format('dddd DD/MM/YYYY HH:mm'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  
  return (
    <div id="top-header" style={{ backgroundColor: USER_PRIMARY_COLOR }}>
      <div className="container">
        <Row justify="center" align="top">
          <Col span={12}>
          </Col>
          <Col span={12} style={{ padding: "7px 0px", textAlign: "right", color: "white", display: "flex", alignItems: "center", justifyContent: "end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
              <FaPhone />
              <span> Hotline: 0986.308.460</span>
            </div>
            <div style={{padding: '0px 5px'}}>|</div>
            <div style={{ display: "flex", alignItems: "center", gap: '5px' }}>
              <IoTimeSharp style={{ fontSize: '16px'}} />
              <span> { capitalizeFirstLetter(time) }</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TopHeader