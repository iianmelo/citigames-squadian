import React from "react";
import { Users } from 'lucide-react';

const CardTeste = () => {
  return (
      <button className={`flex flex-col rounded-2xl shadow-cardShadow w-60 h-24 py-4 pl-4 bg-cardGreen hover:bg-cardGreenHover font-light text-sm font-barlow text-textCardColor`}>

        <h1 className="leading-4 font-medium">Minecraft</h1>
        <p className="my-1">Discord</p>

        <fieldset className="flex flex-row">
          <div className="flex gap-2">
        <p className="">06/07/2023</p>
        <span>|</span>
        <p className="">18:35</p>
          </div>

          <div className=" flex ml-14 items-center gap-1">
        <p>05</p>
        <Users className="w-4 h-5" strokeWidth="2.5" />
          </div>
        </fieldset>
      </button>
  );
};

export default CardTeste;