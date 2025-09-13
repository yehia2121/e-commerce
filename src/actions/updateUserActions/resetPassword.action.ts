"use server";
import { resetPasswordType } from "@/Schema/resetPassword.schema";

export default async function resetPasswordAction(value: resetPasswordType) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: value.email,
        newPassword: value.newPassword,
      }),
    }
  );

  const payload = await res.json();
  return payload;
}
