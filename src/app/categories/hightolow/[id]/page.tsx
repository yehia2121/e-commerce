import ProductCategoryArrange from "@/api/ProductCategoryArrange";
import Product from "@/app/_components/allProducts/Product";
import CategorySlider from "@/app/_components/categorySlider/CategorySlider";
import SortCategoryProducts from "@/app/_components/sortCategoryProduct/SortCategoryProducts";
import { productWelcome } from "@/Types/Products.type";
import React from "react";

export default async function HighToLowCategory({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res: productWelcome = await ProductCategoryArrange("-", id);

  return (
    <div className="w-full lg:w-[90%] mx-auto">
      <div>
        <CategorySlider />
      </div>
      <div>
        <SortCategoryProducts id={id} />
      </div>
      <div className="flex flex-wrap justify-center">
        {res.data.length > 0 ? (
          res.data.map((product) => (
            <Product product={product} key={product._id} />
          ))
        ) : (
          <p className="capitalize text-slate-500">this is not available</p>
        )}
      </div>
    </div>
  );
}
