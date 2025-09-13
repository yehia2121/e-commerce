import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import GetMyToken from "./Utilities/GetMyToken";

export async function middleware(request: NextRequest) {
  const token = await GetMyToken();

  if (token) {
    if (
      request.nextUrl.pathname == "/login" ||
      request.nextUrl.pathname == "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (
      request.nextUrl.pathname == "/cart" ||
      request.nextUrl.pathname == "/profile" ||
      request.nextUrl.pathname == "/wishlist" ||
      request.nextUrl.pathname == "/allorders"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/cart",
    "/profile",
    "/wishlist",
    "/allorders",
    "/login",
    "/register",
  ],
};
