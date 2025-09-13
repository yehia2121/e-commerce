import React from "react";
import GetUserWishlistAction from "@/actions/wishlistActions/GetUserWishlist.action";
import WishlistRemoveBTN from "../_components/wishlistremovebtn/WishlistRemoveBTN";
import Image from "next/image";
import { wishlistDaum, wishlistRoot } from "@/Types/wishlist.type";

export default async function wishlist() {
  const wishlistData: wishlistRoot = await GetUserWishlistAction();

  return (
    <div className="lg:w-[75%] mx-auto mt-6">
      {wishlistData.data.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistData.data.map((product: wishlistDaum) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <Image
                      width={500}
                      height={500}
                      src={product.imageCover}
                      alt={product.title}
                      className="w-16 md:w-32 max-w-full max-h-full"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-emerald-500">
                      {product.category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <WishlistRemoveBTN id={product.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-2xl text-center capitalize">
          Your wishlist is empty. Start adding items you love!
        </h3>
      )}
    </div>
  );
}
