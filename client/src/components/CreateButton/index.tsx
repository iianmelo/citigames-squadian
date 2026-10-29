"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const CreateButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type="button"
      aria-label="Criar partida"
      className={`h-14 w-14 rounded-2xl bg-green px-0 text-white shadow-custom hover:bg-greenHover focus-visible:ring-2 focus-visible:ring-white ${className ?? ""}`}
      {...props}
    >
      <Plus className="size-8" strokeWidth={1.5} />
    </Button>
  );
});

CreateButton.displayName = "CreateButton";

export default CreateButton;
