"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ButtonGame from "@/components/CreateButton";
import IdentityForm from "@/components/identityForm";
import { setSession } from "@/lib/matches";

export default function DialogCreateGame() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonGame />
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-0 bg-loginBg p-0 sm:max-w-[420px] sm:rounded-2xl">
        <DialogTitle className="sr-only">Criar partida</DialogTitle>
        <DialogDescription className="sr-only">
          Informe username e email para organizar uma partida.
        </DialogDescription>
        <IdentityForm
          onSubmit={({ username, email }) => {
            setSession({ username, email });
            const query = new URLSearchParams({ username, email }).toString();
            setOpen(false);
            router.push(`/CreateGame?${query}`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
