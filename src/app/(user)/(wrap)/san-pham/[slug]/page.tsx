
import React from "react";
import Detail from "./Detail";
import { notFound } from 'next/navigation';
import { getFileLink } from "@/helper/common";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

const getDetail = async (slug: string) => {
  const data = await fetch(`${process.env.API_BASE_URL}/api/products/${slug}`, {
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
  const detail = await getDetail(cleanSlug);

  return {
    title: detail.name,
    description: detail.name.slice(0, 150),
    openGraph: {
      title: detail.name,
      description: detail.name.slice(0, 150),
      url: `${process.env.APP_URL}/bai-viet/${detail.slug}.html`,
      type: 'article',
      images: [
        {
          url: getFileLink(detail.preview_image),
          width: 800,
          height: 600,
          alt: detail.name,
        },
      ],
    },
  };
}

const Page = async ({ params }: Props) => {
  const cleanSlug = params.slug.replace(/\.html$/, '');

  const product = await getDetail(cleanSlug)

  return (
    <Detail product={product} />
  );
};

export default Page;