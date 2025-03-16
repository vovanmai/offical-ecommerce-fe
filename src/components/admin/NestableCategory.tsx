'use client'
import React, { useState } from "react"
import {
  AiOutlineDrag,
  AiFillCaretRight,
  AiFillCaretDown
} from "react-icons/ai";
import dynamic from 'next/dynamic';
const Nestable = dynamic(() => import('react-nestable'), { ssr: false });
import Link from 'next/link'
import { Tooltip } from 'antd';

// Định nghĩa cssCenter bên ngoài
const cssCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const handlerStyles = {
  width: "2rem",
  height: "100%",
  cursor: "pointer",
  borderRight: "1px solid Gainsboro"
};

const styles = {
  position: "relative",
  background: "WhiteSmoke",
  display: "flex"
};
import { useAppSelector } from '@/store/admin/hooks'
import { getPrimaryColor } from "@/store/admin/appSlice"

const NestableCategory = (props: any) => {
  const primaryColor = useAppSelector(getPrimaryColor);
  const { categories, onChange, id } = props
  const [loading, setLoading] = useState<boolean>(false)
  const activeStyle = { color: 'black', fontWeight: 'bold'}

  const renderItem = (props: any) => {
    const { item, index, collapseIcon, handler } = props;

    return (
      <div style={{ ...styles, fontWeight: item.children.length ? "400" : "400" } as React.CSSProperties}>
        {handler}
        {collapseIcon}
        <div style={{ padding: ".5rem", flex: 1 }}>
          
          <Link href={`/admin/categories/${item.id}/edit`} style={ id == item.id ? activeStyle : {color: primaryColor}}>
            <Tooltip title={`ID: ${item.id}`}>
              <span>{item.text}</span>
            </Tooltip>
          </Link>
        </div>
        <div style={{padding: 10}}>
          {/* <span>Sản phẩm: 180</span> */}
        </div>
      </div>
    );
  };

  const Handler = () => {
    return (
      <div style={{ ...cssCenter, ...handlerStyles }}>
        <AiOutlineDrag />
      </div>
    );
  };

  const Collapser = ({ isCollapsed }: { isCollapsed: boolean }) => {
    return (
      <div style={{ ...cssCenter, ...handlerStyles }}>
        {isCollapsed ? <AiFillCaretRight /> : <AiFillCaretDown />}
      </div>
    );
  };

  const handleChange = (items: any) => {
    onChange(items.items)
  };

  return (
    <>
      {loading ? 'Đang tải...' : (<Nestable
        items={categories}
        renderItem={renderItem}
        handler={<Handler />}
        renderCollapseIcon={({ isCollapsed }) => (
          <Collapser isCollapsed={isCollapsed} />
        )}
        collapsed={false}
        maxDepth={2}
        onChange={handleChange} 
      />)}
    </>
  );
};

export default NestableCategory;
