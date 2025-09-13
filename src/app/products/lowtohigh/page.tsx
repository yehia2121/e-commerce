import ProductsArrange from "@/api/ProductsArrange";
import Product from "@/app/_components/allProducts/Product";
import SortProducts from "@/app/_components/sortProducts/sortProducts";
import { productWelcome } from "@/Types/Products.type";
import React from "react";

export default async function LowToHigh() {
  const res: productWelcome = await ProductsArrange(`+`);

  return (
    <div>
      <div>
        <SortProducts />
      </div>
      <div className="w-full lg:w-[90%] mx-auto flex flex-wrap">
        {res.data.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
