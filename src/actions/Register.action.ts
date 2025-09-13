"use server";

import { registerType } from "@/Schema/register.schema";

export default async function SignUpAction(value: registerType) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value.name,
        email: value.email,
        password: value.password,
        rePassword: value.rePassword,
        phone: value.phone,
      }),
    }
  );

  const payload = await res.json();
  return payload;
}
