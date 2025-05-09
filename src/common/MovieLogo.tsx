"use client";
import { cn } from "@/lib/utils";
import { color } from "framer-motion";
import { Film } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const MovieLogo = () => {
  const router = useRouter();

  const GoToHomePage = () => {
    router.push(`/`);
  };
  return (
    <div
      className={cn(
        "flex gap-1 items-center cursor-pointer text-blue-500",
        color
      )}
      onClick={GoToHomePage}
    >
      <Film />
      <h1>MOVIE Z</h1>
    </div>
  );
};
