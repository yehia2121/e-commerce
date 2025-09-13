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
import { forgetPassSchema, forgetType } from "@/Schema/forget.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import forgetMessage from "@/actions/frogetPasswordActions/forgetmessage.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ForgetPassword() {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPassSchema),
  });

  async function handelForget(value: forgetType) {
    setisLoading(true);
    const res = await forgetMessage(value);

    if (res.statusMsg === "success") {
      setisLoading(false);
      router.push("/verifyresetcode");
      toast.success(res.message, { position: "top-center", duration: 2000 });
    } else {
      setisLoading(false);
      toast.error(res.message, { position: "top-center", duration: 2000 });
    }
  }

  return (
    <div className="lg:w-[60%] md:w-[80%] w-[90%] mx-auto mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handelForget)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="#email">Enter Your Email:</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="your Email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading}>Send</Button>
        </form>
      </Form>
    </div>
  );
}
