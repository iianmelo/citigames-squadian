"use client"

"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import TopBar from "@/components/topbar";
import Sidebar from "@/components/sidebar";
import { CircleAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateButton from "@/components/CreateButton";

import CardTeste from "@/components/Card/indext";


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function ProfilePage() {
  interface UserData {
    username: string;
  }
  const [games, setGames] = React.useState([
    {
      title: "Game 1",
      platform: "PC",
      date: "2025-10-01",
      time: "18:00",
      currentPlayers: 5,
      maxPlayers: 10,
    },
    {
      title: "Game 2",
      platform: "Xbox",
      date: "2025-12-6",
      time: "20:00",
      currentPlayers: 7,
      maxPlayers: 8,
    },
    {
      title: "Game 3",
      platform: "PlayStation",
      date: "2025-12-6",
      time: "22:00",
      currentPlayers: 12,
      maxPlayers: 12,
    },
    {
      title: "Game 4",
      platform: "PlayStation",
      date: "2025-12-6",
      time: "22:00",
      currentPlayers: 7,
      maxPlayers: 12,
    },
    {
      title: "Game 5",
      platform: "PlayStation",
      date: "2025-12-6",
      time: "22:00",
      currentPlayers: 7,
      maxPlayers: 12,
    },
    {
      title: "Game 6",
      platform: "PlayStation",
      date: "2025-12-6",
      time: "22:00",
      currentPlayers: 7,
      maxPlayers: 12,
    },
    {
      title: "Game 7",
      platform: "PlayStation",
      date: "2025-12-6",
      time: "22:00",
      currentPlayers: 7,
      maxPlayers: 12,
    },
    {
      title: "Game 8",
      platform: "PlayStation",
      date: "2023-12-6",
      time: "22:00",
      currentPlayers: 11,
      maxPlayers: 12,
    },
    {
      title: "Game 9",
      platform: "PlayStation",
      date: "2025-12-6",
      time: "22:00",
      currentPlayers: 11,
      maxPlayers: 12,
    },
    {
      title: "Game 10",
      platform: "PlayStation",
      date: "2025-12-6",
      time: "22:00",
      currentPlayers: 11,
      maxPlayers: 12,
    },
  ]);

  const now = new Date();
  const openGames = games.filter(game => new Date(game.date) > now && game.currentPlayers < game.maxPlayers);
  const closedGames = games.filter(game => new Date(game.date) > now && game.currentPlayers >= game.maxPlayers);
  const historicalGames = games.filter(game => new Date(game.date) <= now);


  const { register, handleSubmit, formState: { errors }, } = useForm<UserData>();

  const handleUsernameSubmit = (data: { username: string }) => {
    console.log("Username:", data.username);
  };

  const [date1, setDate1] = React.useState<Date>()
  const [date2, setDate2] = React.useState<Date>()

  return (
    <div className="flex flex-row w-screen">
      <Sidebar/>
      <div className="w-full  bg-loginBg ">
        <TopBar isReturnEnabled={false} />
        <h1 className="pt-4 pl-10 font-barlow leading-[38.4px] text-[32px]">Qual o username?</h1>
        
        <form onSubmit={handleSubmit(handleUsernameSubmit)} className="flex gap-4 pt-6 pl-10 ">
          <div className="flex flex-col w-[320px]">
            <input
              className={`p-2 border ${
                errors.username ? "border-red-500" : "border-inputBorder"
              } rounded-sm bg-white placeholder-black-400 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder`}
              type="text"
              placeholder="Digite o username"
              {...register("username", { required: "O username é obrigatório" })}
            />
            
            {errors.username && (
              <span className="text-red-500 text-sm mt-1">
                {errors.username.message}
                <CircleAlert size={14} strokeWidth={1.7} className="inline-block ml-1" />
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="bg-[#58CBFB] w-[100px] text-white font-barlow rounded-2xl shadow-custom hover:bg-[#1AB7FF]"
          >
            Buscar
          </Button>
        </form>
        
        <div className="pt-[50px] pl-10">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className=" justify-start flex w-full border-b-2">
              <TabsTrigger className="bg-[#E2F4EC] w-[136px]  border-2 border-blue-500 border-b-0 rounded-b-none" value="Partidas">Partidas</TabsTrigger>
              <TabsTrigger className="w-[136px]  border-2 border-blue-500 border-b-0 rounded-b-none" value="Histórico">Histórico</TabsTrigger>
              <div className="ml-[300px] space-x-2">


                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-between text-left font-normal",
                        !date1 && "text-muted-foreground"
                      )}
                    >
          
                    {date1 ? format(date1, "PPP") : <span className="text-black">dd/mm/aaaa</span>}
                    <CalendarIcon className="h-4 w-4 text-black" />
                      </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date1}
                            onSelect={setDate1}
                            initialFocus
                          />
                        </PopoverContent>
                </Popover>
                    
                    


                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-between text-left font-normal",
                        !date2 && "text-muted-foreground"
                      )}
                    >
          
                    {date2 ? format(date2, "PPP") : <span className="text-black">dd/mm/aaaa</span>}
                    <CalendarIcon className="h-4 w-4 text-black" />
                      </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date2}
                            onSelect={setDate2}
                            initialFocus
                          />
                        </PopoverContent>
                </Popover>


                  </div>
            </TabsList>
            <TabsContent className="flex-row" value="Partidas">
              <div>
                <h1 className="leading-[38.4px] text-[32px] font-barlow">Partidas abertas</h1>
                <ScrollArea className=" mt-8 h-30">
            <div className="overflow-y-hidden max-w-screen-lg h-max flex gap-8 overflow-x-auto sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px]">
            {openGames.length > 0 ? (
              openGames.map((game, index) => (
          <CardTeste
              key={index}
              title={game.title}
              platform={game.platform}
              date={game.date}
              time={game.time}
              currentPlayers={game.currentPlayers}
              maxPlayers={game.maxPlayers}
              buttonstatus = "open"
          />
          ))
          ) : (
        <div className="flex justify-center items-center h-40 w-[1000px]">
          <p className="font-barlow text-[24px] text-black">Não há partidas abertas</p>
        </div>
          )}
        </div>
        </ScrollArea>
                <h1 className="leading-[38.4px] text-[32px] font-barlow">Partidas fechadas</h1>
                <ScrollArea className="mt-8 mb-4 h-30">
        <div className="overflow-y-hidden max-w-screen-lg h-max flex gap-8 overflow-x-auto sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px]">
        {closedGames.length > 0 ? (
          closedGames.map((game, index) => (
          <CardTeste
              key={index}
              title={game.title}
              platform={game.platform}
              date={game.date}
              time={game.time}
              currentPlayers={game.currentPlayers}
              maxPlayers={game.maxPlayers}
              buttonstatus = "closed"
          />
          ))
          ) : (
        <div className="flex justify-center items-center h-40 w-[1000px]">
          <p className="font-barlow text-[24px] text-black">Não há partidas fechadas</p>
        </div>
          )}
        </div>
        </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="Histórico">
              <h1 className="leading-[38.4px] text-[32px] font-barlow">Histórico de partidas</h1>
              <ScrollArea className="mt-8 h-30">
        <div className="overflow-y-hidden max-w-screen-lg h-max flex gap-8 overflow-x-auto sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px]">
        {historicalGames.length > 0 ? (
          historicalGames.map((game, index) => (
          <CardTeste
              key={index}
              title={game.title}
              platform={game.platform}
              date={game.date}
              time={game.time}
              currentPlayers={game.currentPlayers}
              maxPlayers={game.maxPlayers}
              buttonstatus = "historical"
          />
          ))
          ) : (
        <div className="flex justify-center items-center h-40 w-[1000px]">
          <p className="font-barlow text-[24px] text-black">Não há partidas</p>
        </div>
          )}
        </div>
        </ScrollArea>
            </TabsContent>
          </Tabs>
          <div className="fixed bottom-0 right-0 m-8">
            <CreateButton />
          </div>
        </div>
      </div>
    </div>
  );
}
