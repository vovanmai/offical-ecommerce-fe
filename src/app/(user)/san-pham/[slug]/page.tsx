
import Link from "next/link";
import React from "react";
import Detail from "./Detail";

type Props = {
  params: { slug: string };
};

const Page = async ({ params }: Props) => {
  const cleanSlug = params.slug.replace(/\.html$/, '');

  const data = await fetch(`${process.env.API_BASE_URL}/api/products/${cleanSlug}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });
  const response = await data.json()

  const product = response.data;

  return (
    <Detail product={product} />
  );
};

export default Page;