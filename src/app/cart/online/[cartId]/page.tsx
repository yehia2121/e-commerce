"use client";
import PayOnlineAction from "@/actions/paymentActions/Payonline.action";
import { Button } from "@/components/ui/button";
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
import { PayOnlineSchema, PayOnlineType } from "@/Schema/onlinePay.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function PayOnline({ params }: { params: { cartId: string } }) {
  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(PayOnlineSchema),
  });

  async function handelPayOnline(value: PayOnlineType) {
    const { cartId } = await params;
    const res = await PayOnlineAction(value, cartId);

    if (res.status === "success") {
      toast.success("Success", {
        position: "top-center",
        duration: 2000,
      });
      window.location.href = res.session.url;
    } else {
      toast.error("Try Again Laiter", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handelPayOnline)}
          className="flex flex-col gap-4 w-[80%] mx-auto mt-6"
        >
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your Address</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} value={field.value as string} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your City</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full cursor-pointer">Pay Online</Button>
        </form>
      </Form>
    </div>
  );
}
