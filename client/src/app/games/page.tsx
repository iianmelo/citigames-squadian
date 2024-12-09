import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CardTeste from "@/components/Card/indext";
import CreateButton from "@/components/CreateButton";
import DialogCreateGame from "@/components/dialogCreateGame";

export default function Games() {
  const games = [
    {
      title: "League of Legends",
      platform: "Discord",
      date: "2024-12-02",
      time: "20:00",
      currentPlayers: 4,
      maxPlayers: 10,
    },
    {
      title: "Valorant",
      platform: "Teamspeak",
      date: "2024-12-03",
      time: "22:00",
      currentPlayers: 8,
      maxPlayers: 12,
    },
    {
      title: "Counter-Strike",
      platform: "Steam",
      date: "2024-12-05",
      time: "18:00",
      currentPlayers: 5,
      maxPlayers: 10,
    },
    {
      title: "Fortnite",
      platform: "Epic Games",
      date: "2024-12-06",
      time: "19:00",
      currentPlayers: 6,
      maxPlayers: 16,
    },
    {
      title: "Apex Legends",
      platform: "Origin",
      date: "2024-12-07",
      time: "21:00",
      currentPlayers: 3,
      maxPlayers: 20,
    },
    {
      title: "Dota 2",
      platform: "Steam",
      date: "2024-12-08",
      time: "17:00",
      currentPlayers: 7,
      maxPlayers: 10,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
    {
      title: "Overwatch",
      platform: "Battle.net",
      date: "2024-12-09",
      time: "20:30",
      currentPlayers: 5,
      maxPlayers: 12,
    },
  ];

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col h-screen w-screen bg-loginBg">
        <TopBar isReturnEnabled={false} />

        <div className="flex flex-col flex-grow h-[calc(100vh-152px)]">
          <h1 className="font-barlow font-normal text-[1.75rem] leading-9 mt-8 mb-4 ml-[4.5rem] w-fit">
            Próximas partidas
          </h1>

          <ScrollArea className="h-full mx-12 rounded-md p-0 mb-8">
            {games.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4 p-2">
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
                <p className="text-2xl text-gray-500">
                  Não há partidas no momento
                </p>
              </div>
            )}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <div className="ml-auto mx-[4.5rem] mb-12">
          <DialogCreateGame />
        </div>
      </div>
    </div>
  );
}
