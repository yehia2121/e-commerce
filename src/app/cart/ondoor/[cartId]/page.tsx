"use client";
import PayOnDoorAction from "@/actions/paymentActions/PayOnDoor.action";
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
import { useRouter } from "next/navigation";

export default function PayOnDoor({ params }: { params: { cartId: string } }) {
  const navigate = useRouter();

  async function getCartID() {
    const { cartId } = await params;

    return cartId;
  }

  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(PayOnlineSchema),
  });

  async function handelPayOnDoor(value: PayOnlineType) {
    const cartID = await getCartID();
    const res = await PayOnDoorAction(cartID, value);

    if (res.status === "success") {
      toast.success("Order Submited", {
        position: "top-center",
        duration: 2000,
      });
      navigate.push(`/allorders`);
    } else {
      toast.error(res.message, {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <div className="w-[80%] mx-auto mt-4">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handelPayOnDoor)}>
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
                    <Input type="tel" {...field} />
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
            <Button className="cursor-pointer">Pay on Door</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
