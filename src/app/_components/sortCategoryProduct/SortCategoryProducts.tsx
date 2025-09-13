import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

export default function SortCategoryProducts({ id }: { id: string }) {
  return (
    <div className="w-full mx-auto mt-3">
      <DropdownMenu>
        <DropdownMenuTrigger>Sort By</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link className="w-full" href={`/categories/lowtohigh/${id}`}>
              Low/High
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href={`/categories/hightolow/${id}`}>
              High/Low
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
