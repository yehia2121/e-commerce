"use client";
import addToCart from "@/actions/cartActions/AddToCart.action";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/context/cartContext";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function AddToCartBtn({
  style,
  id,
}: {
  style: string;
  id: string;
}) {
  const { cartCount, setcartCount } = useContext(cartContext);

  async function addProduct(id: string) {
    const res = await addToCart(`${id}`);

    if (res.status === "success") {
      setcartCount(cartCount + 1);
      toast.success(res.message, { position: "top-center", duration: 2000 });
    } else {
      toast.error(res.message, { position: "top-center", duration: 2000 });
    }
  }

  return (
    <>
      <Button type="button" onClick={() => addProduct(id)} className={style}>
        Add to cart
      </Button>
    </>
  );
}
