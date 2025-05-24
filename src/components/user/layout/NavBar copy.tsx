'use client';
import { useEffect, useState } from 'react';
import NavBarClient from './NavBarClient';
import { list as getCategories } from '@/api/user/category';
import { list as getPages } from '@/api/user/page';


export default function NavBar() {

  const [productCategories, setProductCategories] = useState<any[]>([]);
  const [postCategories, setPostCategories] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [productResponse, postResponse, pageResponse] = await Promise.all([
          getCategories({ type: 1 }),
          getCategories({ type: 2 }),
          getPages(),
        ]);
  
        setProductCategories(productResponse.data);
        setPostCategories(postResponse.data);
        setPages(pageResponse.data);
  
      } catch (error: any) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <NavBarClient prodCategories={productCategories} postCategories={postCategories} pages={pages} />
  )
}
