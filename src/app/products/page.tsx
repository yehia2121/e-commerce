import React from "react";
import getProducts from "../../api/product.api";
import Product from "../_components/allProducts/Product";
import { productType } from "@/Types/Products.type";
import SortProducts from "../_components/sortProducts/sortProducts";

export default async function Products() {
  const data = await getProducts();

  return (
    <>
      <div>
        <SortProducts />
      </div>
      <div className="lg:w-[90%] w-full mx-auto flex flex-wrap">
        {data.map((currentproduct: productType) => (
          <Product key={currentproduct.id} product={currentproduct} />
        ))}
      </div>
    </>
  );
}
