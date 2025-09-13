"use client";
import DeleteWishProduct from "@/actions/wishlistActions/deletewish.action";
import React from "react";
import { toast } from "sonner";

export default function WishlistRemoveBTN({ id }: { id: string }) {
  async function HandelDeletWish(id: string) {
    const res = await DeleteWishProduct(id);


    if (res.status === "success") {
      toast.success(res.message, {
        position: "top-center",
        duration: 2000,
      });
    } else {
      toast.error(res.message, {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <>
      <button
        onClick={() => HandelDeletWish(id)}
        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
      >
        Remove
      </button>
    </>
  );
}
