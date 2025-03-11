'use client'
import {Card, Button, Table, Tooltip, Space, theme, Row, Col } from "antd"
import { PlusCircleOutlined, BarsOutlined, DeleteOutlined } from "@ant-design/icons"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { getAll } from '@/api/admin/category'
import { removeEmptyFields } from "@/helper/common"
import withAuth from "@/hooks/withAuth";
import { toast } from 'react-toastify'
import ConfirmModal from "@/components/ConfirmModal"
import Breadcrumb from "@/components/Breadcrumb"
import Nestable from 'react-nestable'
import {
  AiOutlineDrag,
  AiFillCaretRight,
  AiFillCaretDown
} from "react-icons/ai";

import type { GetProp, TableProps } from 'antd';
import { USER } from "@/constants/common";
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
  id: number
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const Page = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  
  const styles = {
    position: "relative",
    background: "WhiteSmoke",
    display: "flex"
  };
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
  
  const items = [
    {
      id: 0,
      text: "Lot A",
      children: [
        {
          id: 4,
          text: "Ouvrage",
  
          children: [
            {
              id: 12,
              text: "Une ressource",
              amount: 1
            },
            {
              id: 13,
              text: "La main d'œuvre",
              amount: 1
            }
          ]
        }
      ]
    },
  
    {
      id: 3,
      text: "Lot B",
  
      children: [
        {
          id: 1,
          text: "Super Ouvrage",
  
          children: [
            {
              id: "2-1",
              text: "Ressource 1",
              amount: 1
            },
            {
              id: "2-2",
              text: "Ouvrage",
  
              children: [
                { id: "toto", text: "Ressource truc", amount: 1 },
                { id: "toto2", text: "Ressource autre", amount: 1 }
              ]
            }
          ]
        }
      ]
    }
  ];

  const [collapseAll, setCollapseAll] = useState(false);
  const Handler = () => {
    return (
      <div style={{ ...cssCenter, ...handlerStyles }}>
        <AiOutlineDrag />
      </div>
    );
  };
  const Collapser = ({ isCollapsed }: {isCollapsed: boolean}) => {
    return (
      <div style={{ ...cssCenter, ...handlerStyles }}>
        {isCollapsed ? <AiFillCaretRight /> : <AiFillCaretDown />}
      </div>
    );
  };
  
  const renderItem = (props: any) => {
    const { item, index, collapseIcon, handler } = props;
  
    return (
      <div
        style={{ ...styles, fontWeight: item.children.length ? "400" : "400" }}
      >
        {handler}
        {collapseIcon}
  
        <div
          style={{
            padding: ".5rem",
            flex: 1
          }}
        >
          {item.text}
        </div>
        <div
          style={{
            padding: ".5rem",
            width: "4rem"
          }}
        >
          123 €
        </div>
      </div>
    );
  };

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([])



  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await getAll();
      const { data } = response;
      setCategories(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div>
      <Breadcrumb items={[{title: 'Danh mục sản phẩm'}]} />
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Card title="Danh sách" bordered={false}>
          <Nestable
            items={categories}
            renderItem={renderItem}
            handler={<Handler />}
            renderCollapseIcon={({ isCollapsed }) => (
              <Collapser isCollapsed={isCollapsed} />
            )}
            collapsed={false}
            maxDepth={2}
            //onChange={(items) => console.log(items)}
          />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Page)
