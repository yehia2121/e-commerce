"use client";
import AddToWishlist from "@/actions/wishlistActions/AddToWishlist.action";
import GetUserWishlistAction from "@/actions/wishlistActions/GetUserWishlist.action";
import { wishlistDaum, wishlistRoot } from "@/Types/wishlist.type";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddtoWishlistBtn({ id }: { id: string }) {
  const [wishlistProduct, setwishlistProduct] = useState<wishlistRoot>();

  async function HandelAddToWishlist(event: React.MouseEvent, id: string) {
    event.stopPropagation();
    event.preventDefault();
    const res = await AddToWishlist(id);

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

  async function bridge() {
    const res = await GetUserWishlistAction();
    setwishlistProduct(res);
  }

  useEffect(() => {
    bridge();
  }, []);

  return (
    <div>
      <div
        onClick={(e) => HandelAddToWishlist(e, id)}
        className="absolute top-2 end-2"
      >
        {wishlistProduct &&
        wishlistProduct.data?.some((item: wishlistDaum) => item._id === id) ? (
          <Star className="text-yellow-400" />
        ) : (
          <Star />
        )}
      </div>
    </div>
  );
}
