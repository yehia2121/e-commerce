"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { PopcornIcon } from "lucide-react";
import React from "react";

export default function error() {
  return (
    <div className="h-screen flex justify-center items-center ">
      <Alert className="text-red-400 w-[50%]">
        <PopcornIcon />
        <AlertTitle>Error</AlertTitle>
      </Alert>
    </div>
  );
}
