import getProducts from "@/api/product.api";
import React from "react";
import Product from "../allProducts/Product";
import { productType } from "@/Types/Products.type";

export default async function HomeProducts() {
  const data = await getProducts();


  return (
    <div>
      <div className="w-full mx-auto flex flex-wrap">
        {data.map((currentproduct: productType) => (
          <Product key={currentproduct._id} product={currentproduct} />
        ))}
      </div>
    </div>
  );
}
