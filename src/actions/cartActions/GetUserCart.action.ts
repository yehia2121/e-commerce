"use server";
import GetMyToken from "@/Utilities/GetMyToken";

export default async function getUserCart() {
  const token = await GetMyToken();
  if (!token) throw new Error("Signin first");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}
