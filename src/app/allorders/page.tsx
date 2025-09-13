import GetUserOrdersActions from "@/actions/ordersActions/GetOrder.action";
import { orderCartItem, orderWelcome } from "@/Types/order.type";
import { Banknote, BanknoteX, PackageCheck, Truck } from "lucide-react";
import Image from "next/image";
import React from "react";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function AllOrders() {
  const session = await getServerSession(authOptions);
  const res = await GetUserOrdersActions(session?.userid);

  return (
    <div className="lg:w-[80%] w-[95%] mx-auto mt-4">
      {res.length > 0 ? (
        res.map((order: orderWelcome) => (
          <>
            <div className="mt-10 mb-2 flex justify-between w-full">
              <div>
                <p className="text-slate-400">
                  Created at:{" "}
                  {new Date(order.createdAt).toISOString().slice(0, 10)}
                </p>
                {order.shippingAddress?.details && (
                  <p>Address: {order?.shippingAddress?.details}</p>
                )}
                {order.shippingAddress?.phone && (
                  <p>Phone: {order?.shippingAddress?.phone}</p>
                )}
              </div>
              <div className="flex gap-4 self-end">
                <div>
                  {order.isDelivered ? (
                    <PackageCheck className="text-emerald-500" />
                  ) : (
                    <Truck className="text-yellow-300" />
                  )}
                </div>
                <div>
                  {order.isPaid ? (
                    <Banknote className="text-emerald-500" />
                  ) : (
                    <BanknoteX className="text-red-500" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Count
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((product: orderCartItem) => (
                      <>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b  border-gray-200">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            <Image
                              className="w-1/6"
                              src={product.product.imageCover}
                              alt=""
                              width={500}
                              height={500}
                            />
                            {product.product.title}
                          </th>
                          <td className="px-6 py-4 text-center">
                            {product.count}
                          </td>
                          <td className="px-6 py-4">
                            {product.product.category.name}
                          </td>
                          <td className="px-6 py-4">
                            {product.price * product.count} EGP
                          </td>
                        </tr>
                      </>
                    ))}

                    <p className="p-3">
                      Total Price: {order.totalOrderPrice} EGP
                    </p>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ))
      ) : (
        <div className="capitalize font-semibold mt-12">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>you don&#39;t have any orders.</AlertTitle>
          </Alert>
        </div>
      )}
    </div>
  );
}
