"use client";
import getUserCart from "@/actions/cartActions/GetUserCart.action";
import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartCount, setcartCount] = useState(0);
  async function getCart() {
    try {
      let res = await getUserCart();

      if (res.status === "success") {
        let num = 0;

        res.data.products.forEach((product) => {
          num += product.count;
        });

        setcartCount(num);
      }

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <cartContext.Provider value={{ cartCount, setcartCount, getCart }}>
        {children}
      </cartContext.Provider>
    </>
  );
}
