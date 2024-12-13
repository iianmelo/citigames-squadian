"use client";

import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CardTeste from "@/components/Card/indext";
import DialogCreateGame from "@/components/dialogCreateGame";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Games() {
  interface Game {
    id: number;
    name: string;
    platform: string;
    date: string;
    time: string;
    currentPlayers: number;
    matches_qtd: number;
  }

  const [games, setGames] = React.useState<Game[]>([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:3001/match");
        setGames(response.data);
      } catch (err) {
        setError("Erro ao carregar as partidas. Tente novamente mais tarde.");
        console.error(err);
      }
    };

    fetchGames();
  }, []);

  const handleClick = (id: number) => () => {
    console.log(id);
  };

  return (
    <div className="flex h-screen w-screen flex-row">
      <Sidebar />
      <div className="flex flex-col h-screen w-screen bg-loginBg">
        <TopBar isReturnEnabled={false} />

        <div className="flex flex-col flex-grow h-[calc(100vh-152px)]">
          <h1 className="font-barlow font-normal text-[1.75rem] leading-9 mt-8 mb-4 ml-[4.5rem] w-fit">
            Próximas partidas
          </h1>

          <ScrollArea className="h-full mx-12 rounded-md p-0 mb-8">
            {error ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-2xl text-red-500">{error}</p>
              </div>
            ) : games.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4 p-2">
                {games.map((game, index) => (
                  <CardTeste
                    id={game.id}
                    key={index}
                    name={game.name}
                    platform={game.platform}
                    date={format(parseISO(game.date), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                    time={format(parseISO(game.time), "HH'h'", {
                      locale: ptBR,
                    })} 
                    currentPlayers={14}
                    maxPlayers={game.matches_qtd}
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
