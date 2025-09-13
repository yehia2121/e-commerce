import getProductDetails from "@/api/productDetails.api";
import React from "react";
import Details from "./../../_components/details/Details";

export default async function SingelProduct({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getProductDetails(id);

  return (
    <>
      <Details data={data} />
    </>
  );
}
