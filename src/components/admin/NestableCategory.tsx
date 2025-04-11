'use client'
import React, { useState } from "react"
import { DeleteOutlined } from "@ant-design/icons"
import {
  AiOutlineDrag,
  AiFillCaretRight,
  AiFillCaretDown,
} from "react-icons/ai";
import dynamic from 'next/dynamic';
const Nestable = dynamic(() => import('react-nestable'), { ssr: false });
import Link from 'next/link'
import { Tooltip, Button } from 'antd';

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
  const { categories, onChange, id, type, onDelete } = props
  const activeStyle = { color: 'black', fontWeight: 'bold'}

  const renderItem = (props: any) => {
    const { item, index, collapseIcon, handler } = props;

    return (
      <div style={styles as React.CSSProperties}>
        {handler}
        {collapseIcon}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, padding: "10px" }}>
            <Link href={`/admin/${type ? 'post-categories' : 'categories'}/${item.id}/edit`} style={ id == item.id ? activeStyle : {color: primaryColor}}>
              <Tooltip title={`ID: ${item.id}`}>
                <span>{item.text}</span>
              </Tooltip>
            </Link>
          </div>
          <div>
            <Tooltip title={ type ? "Số lượng bài viết" : "Số lượng sản phẩm"}>
              { type ? item.posts_count : item.products_count }
            </Tooltip>
          </div>
          <div style={{ padding: "0px 10px" }}>
            <Tooltip title="Xoá">
              <Button size="small" onClick={() => {onDelete(item.id)}} danger shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </div>
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
    <Nestable
      items={categories}
      renderItem={renderItem}
      handler={<Handler />}
      renderCollapseIcon={({ isCollapsed }) => (
        <Collapser isCollapsed={isCollapsed} />
      )}
      collapsed={false}
      maxDepth={2}
      onChange={handleChange} 
    />
  );
};

export default NestableCategory;
