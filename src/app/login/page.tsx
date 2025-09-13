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
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "@/Schema/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handelLogin(value: loginType) {
    const res = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (!res?.error) {
      toast.success("Success", {
        position: "top-center",
        duration: 2000,
      });
      window.location.href = "/";
    } else {
      toast.error(res?.error, {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <>
      <div className="w-3/4 lg:w-1/2 mx-auto">
        <h2 className="text-3xl font-semibold my-5">Login Now</h2>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handelLogin)}
          >
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Link className="text-gray-500 hover:underline hover:text-gray-700" href={"/forgetpassword"}>Forget my Password</Link>

              <Button>Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
