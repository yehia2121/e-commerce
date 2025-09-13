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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import resetPasswordAction from "@/actions/frogetPasswordActions/updatePassword.action";
import {
  updatePasswordSchema,
  updatePasswordType,
} from "@/Schema/updatePassword.schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";

export default function UpdatePassword() {
  const [isLoading, setisLoading] = useState(false);
  const [isPassShow, setisPassShow] = useState(false);
  const session = useSession();

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  async function handelResetPassword(value: updatePasswordType) {
    const res = await resetPasswordAction(value);
    setisLoading(true);

    if (res.message === "success") {
      setisLoading(false);
      toast.success(res.message, {
        position: "top-center",
        duration: 2000,
      });
      signIn("credentials", {
        email: session.data?.user.email,
        password: value.password,
        redirect: false,
        callbackUrl: "/",
      });
      window.location.href = "/profile";
    } else {
      setisLoading(false);
      toast.error(res.message, {
        position: "top-center",
        duration: 3500,
      });
    }
  }

  return (
    <div className="lg:w-[60%] md:w-[80%] w-[90%] mx-auto mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handelResetPassword)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your Current Password:</FormLabel>
                <FormControl>
                  <Input
                    type={isPassShow ? "text" : "password"}
                    placeholder="old password"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your New Password:</FormLabel>
                <FormControl>
                  <Input
                    type={isPassShow ? "text" : "password"}
                    placeholder="new password"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repassword:</FormLabel>
                <FormControl>
                  <Input
                    type={isPassShow ? "text" : "password"}
                    placeholder="rePassword"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Checkbox
              onClick={() => setisPassShow(!isPassShow)}
              id="pass"
              checked={isPassShow}
            />
            <FormLabel htmlFor="pass">Show Password</FormLabel>
          </div>

          <Button className="cursor-pointer" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
