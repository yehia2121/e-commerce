"use client";
import { ProductElement, Welcome } from "@/Types/cart.type";
import { toast } from "sonner";
import React, { useContext, useEffect, useState } from "react";
import getUserCart from "@/actions/cartActions/GetUserCart.action";
import Image from "next/image";
import removeFromCart from "@/actions/cartActions/removeFromCart.action";
import UpdateCart from "@/actions/cartActions/UpdateCart.action";
import { Button } from "@/components/ui/button";
import clearCart from "@/actions/cartActions/clearCart.action";
import { cartContext } from "@/context/cartContext";
import Link from "next/link";

export default function Cart() {
  const [cartProducts, setcartProducts] = useState<ProductElement[] | []>([]);
  const [removeLoading, setremoveLoading] = useState(false);
  const [cartLoading, setcartLoading] = useState(true);
  const [updateLoading, setupdateLoading] = useState(false);
  const [productId, setproductId] = useState<string | undefined>();
  const [clearLoading, setclearLoading] = useState(false);
  const { cartCount, setcartCount } = useContext(cartContext);
  const [totalCart, settotalCart] = useState(0);
  const [cartID, setcartID] = useState();

  function TotalCartCalc(value: ProductElement[]) {
    let num = 0;
    value.forEach((product: ProductElement) => {
      num += product.count * product.price;
    });
    settotalCart(num);
  }

  async function gatUserProducts(): Promise<Welcome> {
    const cart = await getUserCart();

    if (cart.status === "success") {
      setcartID(cart.cartId);
      TotalCartCalc(cart.data.products);
    }

    return cart;
  }

  async function RemoveItem(id: string) {
    setremoveLoading(true);
    const res = await removeFromCart(id);

    if (res.status === "success") {
      setremoveLoading(false);
      setcartProducts(res?.data?.products);
      TotalCartCalc(res.data.products);
      toast.success("product removed successfully", {
        position: "top-center",
        duration: 2000,
      });
    } else {
      setremoveLoading(false);
      TotalCartCalc(res.data.products);
      toast.error("this product can't be deleted", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  async function updateUserProducts(id: string, count: number, sign: string) {
    setproductId(id);
    setupdateLoading(true);
    const res = await UpdateCart(id, count);

    if (res.status === "success") {
      if (sign == "+") {
        setcartCount(cartCount + 1);
      } else if (sign == "-") {
        setcartCount(cartCount - 1);
      }
      setupdateLoading(false);
      TotalCartCalc(res.data.products);
      setcartProducts(res?.data?.products);
      toast.success("success", {
        position: "top-center",
        duration: 2000,
      });
    } else {
      setupdateLoading(false);
      toast.error("faild", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  async function clearProducts() {
    setclearLoading(true);
    const res = await clearCart();

    if (res.message === "success") {
      setcartCount(0);
      setclearLoading(false);
      setcartProducts([]);
      settotalCart(0);
      toast.success("cleared", {
        position: "top-center",
        duration: 2000,
      });
    } else {
      setcartLoading(false);
      toast.error("Faild", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  useEffect(() => {
    async function start() {
      const res = await gatUserProducts();

      if (res.status === "success") {
        setcartProducts(res.data.products);
        setcartLoading(false);
        TotalCartCalc(res.data.products);
      }
    }
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {cartLoading ? (
        <>
          <div className="h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          {cartProducts?.length >= 1 ? (
            <>
              <div className="flex justify-between w-[80%] mx-auto items-center">
                <p className="font-bold text-xl text-emerald-500 m-0 p-0">
                  Total: {totalCart}
                </p>
                <Button
                  disabled={clearLoading}
                  onClick={() => clearProducts()}
                  className="ms-auto cursor-pointer mt-4"
                >
                  {clearLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Clear"
                  )}
                </Button>
              </div>
              <div className="relative overflow-x-auto shadow-xl sm:rounded-lg w-4/5 mx-auto mt-3">
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
                        Qty
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
                    {cartProducts?.map((product: ProductElement) => (
                      <tr
                        key={product.product._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <Image
                            priority={true}
                            width={400}
                            height={400}
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updateUserProducts(
                                  product.product.id,
                                  product.count - 1,
                                  "-"
                                )
                              }
                              disabled={updateLoading}
                              className="inline-flex disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-white items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">-</span>
                              {product.count == 1 ? (
                                <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                  />
                                </svg>
                              )}
                            </button>
                            <div>
                              <span
                                id="first_product"
                                className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                {productId == product.product.id ? (
                                  updateLoading ? (
                                    <i className="fas fa-spinner fa-spin"></i>
                                  ) : (
                                    product.count
                                  )
                                ) : (
                                  product.count
                                )}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                updateUserProducts(
                                  product.product.id,
                                  product.count + 1,
                                  "+"
                                )
                              }
                              disabled={updateLoading}
                              className="inline-flex disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-white items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">+</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price * product.count} EGP
                        </td>
                        <td className="px-6 py-4">
                          <button
                            disabled={removeLoading}
                            onClick={() => RemoveItem(product.product._id)}
                            className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline p-1 disabled:cursor-not-allowed disabled:bg-red-200 disabled:rounded-2xl"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-[80%] mx-auto my-5">
                <Button className="me-3">
                  <Link href={`/cart/online/${cartID}`}>Pay Online</Link>
                </Button>
                <Button>
                  <Link href={`/cart/ondoor/${cartID}`}>Pay On Door</Link>
                </Button>
              </div>
            </>
          ) : (
            <div>
              <h1 className="text-red-500 text-2xl text-center mt-9">
                The Cart Is Empty...
              </h1>
            </div>
          )}
        </>
      )}
    </>
  );
}
