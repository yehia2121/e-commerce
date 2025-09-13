import getCategoryProduct from "@/api/getCategoryProduct";
import Product from "@/app/_components/allProducts/Product";
import CategorySlider from "@/app/_components/categorySlider/CategorySlider";
import SortCategoryProducts from "@/app/_components/sortCategoryProduct/SortCategoryProducts";
import { productType, productWelcome } from "@/Types/Products.type";
import React from "react";

export default async function ProductCategory({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const res: productWelcome = await getCategoryProduct(id);

  return (
    <div className="w-[90%] mx-auto">
      <div className="mt-3">
        <CategorySlider />
      </div>
      <div>
        <SortCategoryProducts id={id}/>
      </div>
      <article className="my-3">
        <h3 className="text-2xl">{(await res)?.data[0]?.category?.name}</h3>
      </article>
      <div className="flex flex-wrap justify-center">
        {res.data.length === 0 ? (
          <p className="capitalize text-2xl my-3 text-red-500">
            This Category is Unavailbale right now
          </p>
        ) : (
          (await res).data.map((product: productType) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
