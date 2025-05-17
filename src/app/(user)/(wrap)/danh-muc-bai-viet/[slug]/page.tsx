
import React from "react";
import ListPost from "./ListPost";
import { notFound } from 'next/navigation';

const getCategoryDetail = async (slug: string) => {
  const params = new URLSearchParams({ type: '2' });
  const data = await fetch(`${process.env.API_BASE_URL}/api/categories/${slug}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!data.ok) {
    notFound();
  }

  const response = await data.json()

  return response.data;
}



export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = await getCategoryDetail(params.slug);
  return {
    title: category.name,
    description: category.name.slice(0, 150),
    openGraph: {
      title: category.name,
      description: category.name.slice(0, 150),
      url: `${process.env.APP_URL}/danh-muc-bai-viet/${category.slug}`,
      type: 'article',
    },
  };
}

const Page = async ({params}: any) => {
  const category = await getCategoryDetail(params.slug);
  return (
    <ListPost category={category} />
  );
};

export default Page;