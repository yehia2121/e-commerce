"use server";
import { updateUserDatatype } from "@/Schema/updateUserData";
import GetMyToken from "@/Utilities/GetMyToken";

export default async function updateUserDataAction(value: updateUserDatatype) {
  const token = await GetMyToken();
  if (!token) throw new Error("Login first...");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
    {
      method: "PUT",
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value.name,
        email: value.email,
        phone: value.phone,
      }),
    }
  );

  const payload = await res.json();
  return payload;
}
