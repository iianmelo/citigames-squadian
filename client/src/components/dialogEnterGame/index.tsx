"use client";

import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ButtonGame from "@/components/Button";
import rocketCitiLogo from "@/assets/rocketCitiLogo.png";
import {} from "@/assets";
import axios from 'axios';

type RoomStatus = "available" | "full" | "inside";

interface MatchesButtonProps {
  roomStatus?: RoomStatus;
}

interface LoginData {
  username: string;
  email: string;
}

export default function DialogEnterGame({
  roomStatus = "available",
}: MatchesButtonProps) {
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [players, setPlayers] = useState<LoginData[]>([]);
  
  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/player");
      setPlayers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const implement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/player", formData);
      const playerId = response.data.id;
      const url = window.location.href;
      const matchId = url.split('/').pop();
      console.log("Player ID:", playerId);
      console.log("Match ID:", matchId);
      await axios.post("http://localhost:3001/match/addPlayer", {playerId, matchId: Number(matchId)});
      console.log("Player added successfully");
      fetchPlayers();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Dialog>
        <DialogTrigger className="flex w-full max-w-[320px]" asChild>
          <div>
            <ButtonGame roomStatus={roomStatus} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="w-[28rem] h-[31rem] py-16 bg-loginBg rounded-2xl shadow-md flex flex-col items-center bg-gray-100">
            <Image
              src={rocketCitiLogo}
              alt="Logo da RocketCiti"
              width={316}
              height={125}
              quality={100}
            />
            <form
              onSubmit={implement}
              className="flex flex-col mt-8 w-80 gap-8"
            >
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-80 h-12 px-4 py-2 border border-loginInputBorder rounded focus:outline-none focus:ring-1 focus:ring-inputBgBorder focus:bg-inputBg font-barlow font-normal text-loginInputText text-base placeholder-loginPlaceholder"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-80 h-12 px-4 py-2 bg-white border border-loginInputBorder rounded focus:outline-none focus:ring-1 focus:ring-inputBgBorder focus:bg-inputBg font-barlow font-normal text-loginInputText text-base placeholder-loginPlaceholder"
                  placeholder="Email"
                  required
                />
              </div>

              <DialogClose asChild>
                <button
                  type="submit"
                  className="bg-green text-white w-80 h-12 text-xl leading-6 rounded-2xl shadow-custom font-bold font-barlow transition duration-900 focus:outline-none"
                >
                  Entrar
                </button>
              </DialogClose>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
