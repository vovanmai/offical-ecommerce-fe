'use client';
import { useEffect, useState } from 'react';
import NavBarClient from './NavBarClient';
import { list as getCategories } from '@/api/user/category';
import { list as getPages } from '@/api/user/page';
import { useAppDispatch, useAppSelector } from '@/store/user/hooks';
import { setProductCategories, setPostCategories, setPages } from '@/store/user/appSlice';

export default function NavBar() {
  const dispatch = useAppDispatch();
  const productCategories = useAppSelector((state) => state.app.productCategories)
  const postCategories = useAppSelector((state) => state.app.postCategories)
  const pages = useAppSelector((state) => state.app.pages)

  const fillterPages = pages.filter((page: any) => {
    return page.is_display_main_menu;
  })

  const fillterPostCategories = postCategories.filter((category: any) => {
    return category.is_display_main_menu;
  })
  const fillterProductCategories = productCategories.filter((category: any) => {
    return category.is_display_main_menu;
  })

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [productResponse, postResponse, pageResponse] = await Promise.all([
          getCategories({ type: 1 }),
          getCategories({ type: 2 }),
          getPages(),
        ]);
  
        dispatch(setProductCategories(productResponse.data));
        dispatch(setPostCategories(postResponse.data));
        dispatch(setPages(pageResponse.data));
  
      } catch (error: any) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <NavBarClient prodCategories={fillterProductCategories} postCategories={fillterPostCategories} pages={fillterPages} />
  )
}
