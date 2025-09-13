"use server"
import { codeType } from "@/Schema/verfiyCode.schema";

export default async function verifyCodeAction(code: codeType) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    }
  );

  const payload = await res.json();
  return payload;
}
