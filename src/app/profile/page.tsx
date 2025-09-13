import { authOptions } from "@/auth";
import { Input } from "@/components/ui/input";
import { getServerSession } from "next-auth";
import React from "react";
import UpadteUserData from "../_components/UpdateUserData/UpdateUserData";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-[80%] mx-auto">
      <article>
        <h3 className="text-center text-2xl">Welcome {session?.user.name}</h3>
      </article>
      <div>
        <p className="mb-1">Email: </p>
        <Input value={session?.user.email} disabled={true} />
      </div>
      <div className="mt-4 flex gap-3">
        <div>
          <UpadteUserData />
        </div>
        <Link href={"/forgetpassword"}>
          <Button className="cursor-pointer">Update Password</Button>
        </Link>
      </div>
    </div>
  );
}
