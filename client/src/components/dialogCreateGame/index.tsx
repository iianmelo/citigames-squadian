"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import ButtonGame from "@/components/CreateButton";
import LoginScreen from "../loginscreen";

import {
} from "@/assets";

export default function DialogCreateGame() {
  
  return (
    <div>
        <Dialog>
           <DialogTrigger asChild>
              <div><ButtonGame/></div>
            </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <LoginScreen />
      </DialogContent>
      </Dialog>
    </div>
  );
}
