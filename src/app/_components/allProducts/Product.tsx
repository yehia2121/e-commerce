import { Card } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { productType } from "@/Types/Products.type";
import Image from "next/image";
import AddToCartBtn from "../addToCartBtn/AddToCartBtn";
import AddtoWishlistBtn from "../wishlistBTN/AddtoWishlistBtn";

export default async function Product({ product }: { product: productType }) {
  return (
    <>
      <div className="innr w-full md:w-1/2 lg:w-1/4 xl:w-1/5 mb-3 p-3">
        <Card>
          <div className="m-3">
            <div className="w-full relative">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  className="object-contain w-full"
                  width={500}
                  height={500}
                />
              </Link>
              <AddtoWishlistBtn id={product._id} />
            </div>
            <div>
              <Link href={`/products/${product.id}`}>
                <p className="text-emerald-400">{product.category.name}</p>
                <p className="line-clamp-1">{product.title}</p>
              </Link>
            </div>
            <div className="flex justify-between mt-2">
              <p>{product.price} EGP</p>
              <p>
                <i className="fas fa-star text-yellow-400"></i>
                {product.ratingsAverage}
              </p>
            </div>
          </div>
          <AddToCartBtn
            style={"cursor-pointer w-[97%] mx-auto"}
            id={product.id}
          />
        </Card>
      </div>
    </>
  );
}
