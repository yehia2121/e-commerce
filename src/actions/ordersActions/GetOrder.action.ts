"use server";
import GetMyToken from "@/Utilities/GetMyToken";

export default async function GetUserOrdersActions(id: string) {
  const token = await GetMyToken();
  if (!token) throw new Error("Login First...");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
  );

  const payload = await res.json();
  return payload;
}
