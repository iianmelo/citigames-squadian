"use client";

import TopBar from "@/components/topbar";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardTeste from "@/components/Card/indext";
import CreateButton from "@/components/CreateButton";

export default function Games() {
  const [games, setGames] = React.useState([
    {
      title: "Game 1",
      platform: "PC",
      date: "2023-10-01",
      time: "18:00",
      currentPlayers: 5,
      maxPlayers: 10,
    },
  ]);

  return (
    <div className="flex flex-col h-screen w-screen bg-loginBg">
      <TopBar isReturnEnabled={false} />

      <div className="flex flex-col flex-grow">
        <h1 className="font-barlow font-normal text-[1.75rem] leading-9 pt-12 ml-[4.5rem] w-fit">
          Próximas partidas
        </h1>

        <ScrollArea className="mt-14 mx-[4.5rem] border-2 border-black ">
          {games.length > 0 ? (
        <div className="flex flex-wrap gap-8 p-2">
          {games.map((game, index) => (
            <CardTeste
          key={index}
          title={game.title}
          platform={game.platform}
          date={game.date}
          time={game.time}
          currentPlayers={game.currentPlayers}
          maxPlayers={game.maxPlayers}
            />
          ))}
        </div>
          ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg text-gray-600">Não há partidas</p>
        </div>
          )}
        </ScrollArea>

        <div className="ml-auto mx-[4.5rem] mt-8">
          <CreateButton />
        </div>
      </div>
    </div>
  );
}
