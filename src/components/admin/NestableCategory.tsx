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

const NestableCategory = (props: any) => {
  const { categories } = props
  const [loading, setLoading] = useState<boolean>(false)

  const renderItem = (props: any) => {
    const { item, index, collapseIcon, handler } = props;

    return (
      <div style={{ ...styles, fontWeight: item.children.length ? "400" : "400" }}>
        {handler}
        {collapseIcon}
        <div style={{ padding: ".5rem", flex: 1 }}>
          
          <Link href="/dashboard">{item.text}</Link>
        </div>
        <div style={{ padding: ".5rem", width: "4rem" }}>
          123 €
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
    console.log(items)
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
