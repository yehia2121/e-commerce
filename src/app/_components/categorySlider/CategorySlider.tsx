import getCategories from "@/api/category.api";
import React from "react";
import CategorySwiper from "../categorySwiper/CategorySwiper";

export default async function CategorySlider() {
  const { data } = await getCategories();

  return (
    <>
      <CategorySwiper data={data} />
    </>
  );
}
