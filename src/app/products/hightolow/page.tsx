import ProductsArrange from "@/api/ProductsArrange";
import Product from "@/app/_components/allProducts/Product";
import SortProducts from "@/app/_components/sortProducts/sortProducts";
import { productWelcome } from "@/Types/Products.type";
import React from "react";

export default async function HighToLow() {
  const res: productWelcome = await ProductsArrange(`-`);

  return (
    <div>
      <div>
        <SortProducts />
      </div>
      <div className="flex flex-wrap justify-center lg:w-[90%] mx-auto">
        {res.data.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
