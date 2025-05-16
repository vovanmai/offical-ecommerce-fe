
import React from "react";
import Detail from "./Detail";
import { notFound } from 'next/navigation';
import { getFileLink } from "@/helper/common";

type Props = {
  params: { slug: string };
};

const getDetailPost = async (slug: string) => {
  const data = await fetch(`${process.env.API_BASE_URL}/api/posts/${slug}`, {
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
  const post = await getDetailPost(cleanSlug);

  return {
    title: post.name,
    description: post.short_description.slice(0, 150),
    openGraph: {
      title: post.name,
      description: post.short_description.slice(0, 150),
      url: `${process.env.APP_URL}/bai-viet/${post.slug}.html`,
      type: 'article',
      images: [
        {
          url: getFileLink(post.preview_image),
          width: 800,
          height: 600,
          alt: post.name,
        },
      ],
    },
  };
}

const Page = async ({ params }: Props) => {
  const cleanSlug = params.slug.replace(/\.html$/, '');

  const post = await getDetailPost(cleanSlug)

  return (
    <Detail post={post} />
  );
};

export default Page;