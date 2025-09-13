"use server"
import { forgetType } from "@/Schema/forget.schema";

export default async function forgetMessage(value: forgetType) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }
  );

  const payload = await res.json();

  return payload;
}
