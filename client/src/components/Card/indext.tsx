import React from "react";
import { Users } from 'lucide-react';

interface CardTesteProps {
  title: string;
  platform: string;
  date: string;
  time: string;
  currentPlayers: number;
  maxPlayers: number;
}

const CardTeste: React.FC<CardTesteProps>= ({title, platform, date, time, currentPlayers, maxPlayers}) => {
  return (
      <button className="flex flex-col rounded-2xl shadow-cardShadow w-60 h-24 py-4 pl-4 bg-cardGreen hover:bg-cardGreenHover font-light text-sm font-barlow text-textCardColor">

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