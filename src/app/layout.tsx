import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/Navbar";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "sonner";
import MySessionProvider from "./../MySession/MySessionProvider";
import CartContextProvider from "@/context/cartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Cart",
  description:
    "An easy-to-use e-commerce website offering a wide range of products with secure payments, fast delivery, and a smooth shopping experience on any device.",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartContextProvider>
          <MySessionProvider>
            <Navbar />
            <Toaster />

            <div className="mt-16">{children}</div>
          </MySessionProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
