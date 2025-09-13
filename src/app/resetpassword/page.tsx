"use client";
import updatePasswordAction from "@/actions/updateUserActions/resetPassword.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  resetPasswordSchema,
  resetPasswordType,
} from "@/Schema/resetPassword.schema";
import { signIn } from "next-auth/react";

export default function ResetPassword() {
  const [isLoading, setisLoading] = useState(false);
  const [isPassShow, setisPassShow] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function handelUpdatePass(value: resetPasswordType) {
    const res = await updatePasswordAction(value);
    setisLoading(true);

    if (res.token) {
      setisLoading(false);
      toast.success("success", {
        position: "top-center",
        duration: 2000,
      });
      signIn("credentials", {
        email: value.email,
        password: value.newPassword,
        redirect: false,
        callbackUrl: "/",
      });
      window.location.href = "/";
    } else {
      setisLoading(false);
      toast.error(res.message, {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <div className="w-[75%] mx-auto mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handelUpdatePass)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password:</FormLabel>
                <FormControl>
                  <Input type={isPassShow ? "text" : "password"} {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 my-3">
            <Checkbox
              id="passShow"
              checked={isPassShow}
              onClick={() => setisPassShow(!isPassShow)}
            />
            <FormLabel htmlFor="passShow">Show Password</FormLabel>
          </div>
          <Button disabled={isLoading} className="cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
