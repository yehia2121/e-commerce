"use server";
import GetMyToken from "@/Utilities/GetMyToken";

export default async function UpdateCart(id: string, count: number) {
  const token = await GetMyToken();
  if (!token) throw new Error("login First...");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
  });

  const payload = await res.json();
  return payload;
}
