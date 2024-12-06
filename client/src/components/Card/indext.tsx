import React from "react";
import { Users } from 'lucide-react';

type ButtonStatus = "open" | "closed" | "historical";

interface CardTesteProps {
  title: string;
  platform: string;
  date: string;
  time: string;
  currentPlayers: number;
  maxPlayers: number;
  buttonstatus?: ButtonStatus;
}

const CardTeste: React.FC<CardTesteProps>= ({title, platform, date, time, currentPlayers, maxPlayers, buttonstatus}) => {
  const color = buttonstatus === "open" ? "bg-cyan-100 hover:bg-cyan-200" : buttonstatus === "closed" ? "bg-violet-300 hover:bg-violet-400" : "bg-gray-200 hover:bg-gray-300";
  return (

      <button className={`flex flex-col rounded-2xl shadow-cardShadow w-60 h-24 py-4 pl-4 ${color} font-light text-sm font-barlow text-textCardColor`}>

        <h1 className="leading-4 font-medium">{title}</h1>
        <p className="my-1">{platform}</p>

        <fieldset className="flex flex-row">
          <div className="flex gap-2">
        <p className="">{date}</p>
        <span>|</span>
        <p className="">{time}</p>
          </div>

          <div className=" flex ml-14 items-center gap-1">
        <p>{currentPlayers}</p>
        <Users className="w-4 h-5" strokeWidth="2.5" />
          </div>
        </fieldset>
      </button>
  );
};

export default CardTeste;