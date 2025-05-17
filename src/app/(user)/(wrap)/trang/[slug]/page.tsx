
import React from "react";
import Trang from "./Trang";
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

const getDetailPage = async (slug: string) => {
  const data = await fetch(`${process.env.API_BASE_URL}/api/pages/${slug}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  if (!data.ok) {
    notFound();
  }

  const response = await data.json()

  return response.data;
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cleanSlug = params.slug.replace(/\.html$/, '');
  const page = await getDetailPage(cleanSlug);

  return {
    title: page.name,
    description: page.name.slice(0, 150),
    openGraph: {
      title: page.name,
      description: page.name.slice(0, 150),
      url: `${process.env.APP_URL}/trang/${page.slug}.html`,
      type: 'website',
    },
  };
}

const Page = async ({ params }: Props) => {
  const cleanSlug = params.slug.replace(/\.html$/, '');

  const page = await getDetailPage(cleanSlug);

  return (
    <Trang page={page} />
  );
};

export default Page;