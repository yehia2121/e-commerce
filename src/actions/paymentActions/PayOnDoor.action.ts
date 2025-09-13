"use server";
import { PayOnlineType } from "@/Schema/onlinePay.schema";
import GetMyToken from "@/Utilities/GetMyToken";

export default async function PayOnDoorAction(
  id: string,
  value: PayOnlineType
) {
  const token = await GetMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
    {
      method: "POST",
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: { value } }),
    }
  );

  const payload = await res.json();
  return payload;
}
