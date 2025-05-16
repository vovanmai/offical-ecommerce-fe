
import React from "react";
import Trang from "./Trang";

type Props = {
  params: { slug: string };
};

const Page = async ({ params }: Props) => {
  const cleanSlug = params.slug.replace(/\.html$/, '');

  const data = await fetch(`${process.env.API_BASE_URL}/api/pages/${cleanSlug}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  const response = await data.json()

  const page = response.data;

  return (
    <Trang page={page} />
  );
};

export default Page;