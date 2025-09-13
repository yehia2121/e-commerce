"use server";
import GetMyToken from "@/Utilities/GetMyToken";

export default async function AddToWishlist(id: string) {
  const token = await GetMyToken();
  if (!token) throw new Error("Login First...");


  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: `${id}` }),
  });

  const payload = await res.json();
  return payload;
}
