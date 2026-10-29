"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type RoomStatus = "available" | "full" | "inside";

interface MatchesButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  roomStatus?: RoomStatus;
}

const MatchesButton = forwardRef<HTMLButtonElement, MatchesButtonProps>(
  ({ roomStatus = "available", className, ...props }, ref) => {
    const text = roomStatus === "inside" ? "Sair" : "Entrar";

    return (
      <Button
        ref={ref}
        type="button"
        className={cn(
          "h-12 w-full max-w-[320px] rounded-2xl text-xl font-bold leading-6 text-white shadow-custom focus-visible:ring-2 focus-visible:ring-[#58CBFB] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80",
          roomStatus === "available" && "bg-green hover:bg-greenHover",
          roomStatus === "full" &&
            "bg-grayButton text-[#292929] hover:bg-grayButton",
          roomStatus === "inside" && "bg-redButton hover:bg-redButtonHover",
          className
        )}
        {...props}
      >
        {text}
      </Button>
    );
  }
);

MatchesButton.displayName = "MatchesButton";

export default MatchesButton;
