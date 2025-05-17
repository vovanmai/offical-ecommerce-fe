import { Col, Input, Button, Menu, Dropdown } from 'antd';
const { Search } = Input;
import { HomeFilled, MenuOutlined } from '@ant-design/icons';
import { USER_PRIMARY_COLOR } from '@/constants/common';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavBarClient({ prodCategories, postCategories, pages }: { prodCategories: any, postCategories: any, pages: any }) {
  const [productCategoryTree, setProductCategoryTree] = useState<any[]>([]);
  const [menuTree, setMenuTree] = useState<any[]>([]);

  const buildCategoryTree = (categories: any, parentId: number | null = null, type: any): any[] => {
    // Lọc các danh mục có parent_id trùng với parentId
    const children = categories.filter((category: any) => category.parent_id === parentId);
  
    return children.map((category: any) => {
      // Khởi tạo đối tượng category
      const categoryNode: any = {
        key: category.id,
        label: <Link href={`/${type}/${category.slug}`}>{category.name}</Link>,
      };
  
      // Gọi đệ quy để lấy các con (nếu có)
      const subCategories = buildCategoryTree(categories, category.id, type);
  
      // Nếu có con, thêm thuộc tính 'children'
      if (subCategories.length > 0) {
        categoryNode.children = subCategories;
      }
  
      return categoryNode;
    });
  };

  useEffect(() => {
    const productTree = buildCategoryTree(prodCategories, null,  'danh-muc-san-pham');
    setProductCategoryTree(productTree);
    const postTree = buildCategoryTree(postCategories, null, 'danh-muc-bai-viet');
    const pageItems = pages ?  pages.map((page: any) => ({
      key: `page-${page.id}`,
      label: <Link href={`/trang/${page.slug}.html`}>{page.name}</Link>,
    })) : [];

    const home = {
      key: 'home',
      label: (<Link href="/">Trang chủ</Link>),
      icon: <HomeFilled />,
    }

    setMenuTree([home, ...postTree, ...pageItems]);
  }, [prodCategories, postCategories, pages]);

  return (
    <div id="pc-menu" style={{ backgroundColor: USER_PRIMARY_COLOR, padding: '0px 0px' }}>
      <div className="container">
        <div className="container__inner d-flex align-items-center">
          <Dropdown
            menu={{ 
              items: productCategoryTree, 
              selectable: true, 
              defaultSelectedKeys: ['21'], 
            }}
          >
            <Button 
              style={{ boxShadow: "none", border: "1px solid white", marginRight: 20 }} 
              type="primary" 
              shape="round" 
              icon={<MenuOutlined />} 
              size="middle"
            >
              Danh mục
            </Button>
          </Dropdown>
          <Menu 
            className="w-100" 
            mode="horizontal" 
            items={menuTree} 
          />
        </div>
      </div>
    </div>
  );
}
