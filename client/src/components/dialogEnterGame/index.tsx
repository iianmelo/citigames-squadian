"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MatchesButton from "@/components/Button";
import IdentityForm from "@/components/identityForm";

type RoomStatus = "available" | "full" | "inside";

type DialogEnterGameProps = {
  roomStatus?: RoomStatus;
  onJoin: (data: { username: string; email: string }) => void;
  onLeave: () => void;
};

export default function DialogEnterGame({
  roomStatus = "available",
  onJoin,
  onLeave,
}: DialogEnterGameProps) {
  const [open, setOpen] = useState(false);

  if (roomStatus !== "available") {
    return (
      <MatchesButton
        roomStatus={roomStatus}
        disabled={roomStatus === "full"}
        onClick={roomStatus === "inside" ? onLeave : undefined}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MatchesButton roomStatus={roomStatus} />
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-0 bg-loginBg p-0 sm:max-w-[420px] sm:rounded-2xl">
        <DialogTitle className="sr-only">Entrar na partida</DialogTitle>
        <DialogDescription className="sr-only">
          Informe username e email para entrar na partida.
        </DialogDescription>
        <IdentityForm
          onSubmit={(data) => {
            onJoin(data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
