"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  updateUserDataSchema,
  updateUserDatatype,
} from "@/Schema/updateUserData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import updateUserDataAction from "@/actions/updateUserActions/updateUserData.action";

export default function UpadteUserData() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(updateUserDataSchema),
  });

  async function handelResetPassword(value: updateUserDatatype) {
    const res = await updateUserDataAction(value);

    if (res.message === "success") {
      toast.success("please Login Again", {
        position: "top-center",
        duration: 2000,
      });
      signOut({ callbackUrl: "/login" });
    } else {
      toast.error(res.errors.msg, {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="cursor-pointer">Edit Profile</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              id="reset-form"
              onSubmit={form.handleSubmit(handelResetPassword)}
              className="h-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="#sheet-demo-name"> Name:</FormLabel>
                    <FormControl>
                      <Input type="text" id="sheet-demo-name" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="#sheet-demo-name">Email:</FormLabel>
                    <FormControl>
                      <Input type="email" id="sheet-demo-name" {...field} />
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
                    <FormLabel htmlFor="#sheet-demo-phone">phone:</FormLabel>
                    <FormControl>
                      <Input type="tel" id="sheet-demo-phone" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <SheetFooter>
            <Button form="reset-form" type="submit" className="cursor-pointer">
              Save changes
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
