import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

export default function SortProducts() {
  return (
    <div className="w-full lg:w-[90%] mx-auto mt-3">
      <DropdownMenu>
        <DropdownMenuTrigger>Sort By</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/products/lowtohigh">Low/High</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/products/hightolow">High/Low</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
}
