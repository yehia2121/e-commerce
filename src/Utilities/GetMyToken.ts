"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function GetMyToken() {
  const encryptedToken = (await cookies()).get(
    "next-auth.session-token"
  )?.value;

  const token = await decode({
    token: encryptedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token;
}
