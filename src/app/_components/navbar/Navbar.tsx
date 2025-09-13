"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useContext } from "react";
import logo from "../../../../public/images/freshcart-logo.svg";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cartContext } from "@/context/cartContext";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const params = usePathname();
  const { cartCount } = useContext(cartContext);

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }
  return (
    <>
      <nav className="p-3 bg-gray-50 text-gray-400 fixed top-0 start-0 end-0 z-50">
        <div className="lg:w-[90%] w-full mx-auto flex flex-row items-center justify-between">
          <div className="flex gap-2">
            <ul>
              <li className="cursor-pointer">
                <Link href={"/"}>
                  <Image src={logo} alt="logo" />
                </Link>
              </li>
            </ul>
            <ul className="gap-3 items-center hidden lg:flex ">
              <li>
                <Link className={params == "/" ? "active" : ""} href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={params == "/products" ? "active" : ""}
                  href="/products"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className={params == "/categories" ? "active" : ""}
                  href="/categories"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  className={params == "/brands" ? "active" : ""}
                  href="/brands"
                >
                  Brands
                </Link>
              </li>
            </ul>
          </div>
          <ul className="gap-3 text-black hidden lg:flex">
            {status === "authenticated" ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      Hi {session?.user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link className="w-full cursor-pointer" href={`/profile`}>
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link className="w-full cursor-pointer" href={`/cart`}>
                        Cart
                        <DropdownMenuShortcut>{cartCount}</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div>
                        <Link
                          className="w-full cursor-pointer"
                          href={`/wishlist`}
                        >
                          Wish list
                        </Link>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div>
                        <Link
                          className="w-full cursor-pointer"
                          href={`/allorders`}
                        >
                          All Orders
                        </Link>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => logOut()}
                      className="text-red-500"
                    >
                      Logoutd
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <li>
                  <Link href="">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-tiktok"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-youtube"></i>
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400" href="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-400" href="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="lg:hidden border-2 rounded-md flex justify-center items-center p-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <Link href={"/"}>Home</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {status === "authenticated" ? (
                  <>
                    <DropdownMenuItem>
                      <Link href={"/cart"}>Cart</Link>
                      <DropdownMenuShortcut>{cartCount}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/allorders`}>All Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/wishlist`}>Wish list</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  ""
                )}
                <DropdownMenuItem>
                  <Link href={"/products"}>Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/categories"}>Categories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/brands"}>Brands</Link>
                </DropdownMenuItem>

                {session?.user.name && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => logOut()}
                      className="text-red-500"
                    >
                      Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem>Hi {session?.user.name}</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
