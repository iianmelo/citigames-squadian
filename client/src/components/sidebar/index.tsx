"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation"; 

import {
  GameControllerOn,
  GameControllerOff,
  UserOff,
  UserOn,
  WhiteLogoCITi,
} from "@/assets";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname()

  return (
<div className="flex bg-[#58CBFB] items-center h-dvh w-[280px] p-5 flex-col justify-start">
      <div className="w-[112.75px] h-[59.52px] top-[24px] left-[84px] gap-0 flex justify-center items-center mt-[40px]">
        <Image src={WhiteLogoCITi} alt="Logo citi" width={140} height={420} />
      </div>

      <div className="flex flex-col gap-4 w-full mt-[40px]">
        <button
          className="custom-button w-[232px] h-[43px] top-[110px] left-[24px] gap-0"
          onClick={() => router.push("/games")}
        >
          <Image
            className="ml-3"
            src={pathname === "/games" ? GameControllerOn : GameControllerOff}
            alt="Explore Matches"
            width={30}
            height={30}
          />
          <p className="font-bold text-white">Explorar Partidas</p>
        </button>

        <button
          className="custom-button w-[232px] h-[43px] top-[169px] left-[24px] gap-0"
          onClick={() => router.push("/detailsPage")}
        >
          <Image
            className="ml-3"
            src={pathname === "/detailsPage" ? UserOn : UserOff}
            alt="Profile"
            width={30}
            height={30}
          />
          <p className="font-medium text-white">Perfil</p>
        </button>
      </div>

      <div className="w-[219px] h-[24px] top-[976px] left-[31px] gap-0 flex justify-center items-center mt-auto">
        <p className="text-white text-base">
          Made with <strong>&lt; &#x0002F; &gt;</strong> and{" "}
          <strong>&hearts;</strong> by CITi
        </p>
      </div>
    </div>
  );
}