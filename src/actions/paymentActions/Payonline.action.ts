"use server"
import { PayOnlineType } from "@/Schema/onlinePay.schema";
import GetMyToken from "@/Utilities/GetMyToken";

export default async function PayOnlineAction(
  form: PayOnlineType,
  id: string
) {
  const token = await GetMyToken();

  
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
    {
      method: "POST",
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"shippingAddress":form}),
    }
  );
  
  const payload = res.json();
  return payload;
}
