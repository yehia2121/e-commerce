import React from "react";
import { productType } from "./../../../Types/Products.type";
import Image from "next/image";
import AddToCartBtn from "../addToCartBtn/AddToCartBtn";
import Link from "next/link";
import getCategoryProduct from "@/api/getCategoryProduct";
import Product from "../allProducts/Product";

export default async function Details({ data }: { data: productType }) {
  const res = await getCategoryProduct(data.category._id);


  return (
    <>
      <div className="container w-full lg:w-[90%] mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-1/4 w-1/2 mx-auto">
          <Image
            src={data.imageCover}
            alt={data.title}
            width={750}
            height={1000}
            priority={true}
          />
        </div>
        <div className="lg:w-3/4 w-full flex flex-col justify-center gap-3 p-3">
          <p className="text-2xl">{data.title}</p>
          <p className="text-gray-500">{data.description}</p>
          <Link
            href={`/categories/${data._id}`}
            className="text-emerald-500 cursor-pointer"
          >
            {data.category.name}
          </Link>
          <div className="flex justify-between">
            <p>{data.price} EGP</p>
            <p>
              <i className="fas fa-star text-yellow-400"></i>
              {data.ratingsAverage}
            </p>
          </div>
          <AddToCartBtn
            id={data.id}
            style={
              "bg-green-600 hover:bg-green-500 text-white w-full cursor-pointer"
            }
          />
        </div>
      </div>
      <div className="w-[90%] mx-auto flex flex-wrap">
        {res.data.map((product: productType) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
