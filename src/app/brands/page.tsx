import GetBrands from "@/api/brands.api";
import { brandsRoot } from "@/Types/brand.type";
import React from "react";
import BrandSwiper from "../_components/brandsSwiper/BrandSwiper";

export default async function Brands() {
  const brands: brandsRoot = await GetBrands();


  return (
    <div className="lg:w-[90%] w-full mx-auto">
      <BrandSwiper brands={brands.data} />
    </div>
  );
}
