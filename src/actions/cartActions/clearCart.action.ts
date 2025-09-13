"use server";
import GetMyToken from "@/Utilities/GetMyToken";

export default async function clearCart() {
  const token = await GetMyToken();
  if (!token) throw new Error("Login First...");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}
