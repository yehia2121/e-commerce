import GetBrands from "@/api/brands.api";
import GetBrandProducts from "@/api/GetBrandProducts.api";
import Product from "@/app/_components/allProducts/Product";
import BrandSwiper from "@/app/_components/brandsSwiper/BrandSwiper";
import { brandsRoot } from "@/Types/brand.type";
import { productWelcome } from "@/Types/Products.type";
import { Frown } from "lucide-react";
import React from "react";

export default async function BrandProducts({
  params,
}: {
  params: { brandID: string };
}) {
  const { brandID } = await params;
  const res: brandsRoot = await GetBrands();
  const products: productWelcome = await GetBrandProducts(brandID);

  return (
    <div className="w-full lg:w-[90%] mx-auto">
      <div>
        <BrandSwiper brands={res.data} />
      </div>

      <div className="w-full mx-auto flex flex-wrap justify-center">
        {products.data.length > 0 ? (
          products.data.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p className="justify-self-center text-2xl font-semibold text-center text-slate-500 flex items-center gap-2 capitalize">
            this brand is currently not available <Frown />
          </p>
        )}
      </div>
    </div>
  );
}
