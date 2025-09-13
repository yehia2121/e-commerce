"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function GetMyToken() {
  const cookieStore = cookies();

  const encryptedToken =
    (await cookieStore).get("next-auth.session-token")?.value ||
    (await cookieStore).get("__Secure-next-auth.session-token")?.value;

  if (!encryptedToken) return null;

  const token = await decode({
    token: encryptedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token;
}
