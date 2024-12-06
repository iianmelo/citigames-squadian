"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import ButtonGame from "@/components/Button";
import LoginScreen from "../loginscreen";

import {
} from "@/assets";

type RoomStatus = "available" | "full" | "inside";

interface MatchesButtonProps {
  roomStatus?: RoomStatus;
}

export default function DialogEnterGame({ roomStatus = "available" }: MatchesButtonProps) {
  
  return (
    <div className="flex w-full justify-center">
        <Dialog >
           <DialogTrigger className="flex w-full max-w-[320px]" asChild>
              <div><ButtonGame roomStatus={roomStatus} /></div>
            </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <LoginScreen />
      </DialogContent>
      </Dialog>
    </div>
  );
}