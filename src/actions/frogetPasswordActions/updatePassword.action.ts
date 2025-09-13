"use server";
import GetMyToken from "@/Utilities/GetMyToken";
import { updatePasswordType } from "@/Schema/updatePassword.schema";

export default async function updatePasswordAction(value: updatePasswordType) {
  const token = await GetMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
    {
      method: "PUT",
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: value.currentPassword,
        password: value.password,
        rePassword: value.rePassword
      }),
    }
  );

  const payload = await res.json();
  return payload;
}
