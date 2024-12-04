"use client"

import TopBar from "@/components/topbar";
import Sidebar from "@/components/sidebar";
import { CircleAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
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

  const { register, handleSubmit, formState: { errors }, } = useForm<UserData>();

  const handleUsernameSubmit = (data: { username: string }) => {
    console.log("Username:", data.username);
  };

  return (
    <div className="flex flex-row w-screen">
      <Sidebar/>
      <div className="w-full  bg-loginBg ">
        <TopBar isReturnEnabled={false} />
        <h1 className="pt-8 pl-10 font-barlow leading-[38.4px] text-[32px]">Qual o username?</h1>
        
        <form onSubmit={handleSubmit(handleUsernameSubmit)} className="flex gap-4 pt-6 pl-10">
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
        
        <div className="pt-[121px] pl-10">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="justify-start flex w-full border-b-2">
              <TabsTrigger className="bg-[#E2F4EC] w-[136px]  border-2 border-blue-500 border-b-0 rounded-b-none" value="Partidas">Partidas</TabsTrigger>
              <TabsTrigger className="w-[136px]  border-2 border-blue-500 border-b-0 rounded-b-none" value="Histórico">Histórico</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-row w-full" value="Partidas">
              <div>
                <h1 className="leading-[38.4px] text-[32px] font-barlow">Partidas abertas</h1>
                <h1 className="leading-[38.4px] text-[32px] font-barlow">Partidas fechadas</h1>
              </div>
            </TabsContent>
            <TabsContent value="Histórico">
              <h1 className="leading-[38.4px] text-[32px] font-barlow">Histórico de partidas</h1>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
