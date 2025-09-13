"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { codeSchema, codeType } from "@/Schema/verfiyCode.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import verifyCodeAction from "@/actions/frogetPasswordActions/verifycode.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function VerfiyResetCode() {
  const navigate = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const session = useSession();

  const form = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(codeSchema),
  });

  async function handelCode(value: codeType) {
    setisLoading(true);
    const res = await verifyCodeAction(value);

    if (res.status === "Success") {
      setisLoading(false);
      toast.success(res.status, { position: "top-center", duration: 2000 });
      if (session.status === "unauthenticated") {
        navigate.push("/resetpassword");
      } else {
        navigate.push("/updatepassword");
      }
    } else {
      setisLoading(false);
      toast.error("Wrong Code", { position: "top-center", duration: 2000 });
    }
  }

  return (
    <div className="lg:w-[60%] md:w-[80%] w-[90%] mx-auto mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handelCode)}>
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="#code">Enter The Reset Code</FormLabel>
                <FormControl>
                  <Input
                    id="code"
                    type="tel"
                    placeholder="The Code"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading}>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
