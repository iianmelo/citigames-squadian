"use client"

import TopBar from "@/components/topbar";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


export default function ProfilePage() {
  return (
    <div className="flex flex-row w-screen">
      <Sidebar/>
      <div className="w-full  bg-loginBg ">
        <TopBar isReturnEnabled={false} />
        <h1 className = "pt-8 pl-10 font-barlow leading-[38.4px] text-[32px]">Qual o username?</h1>
        
        <div className="flex gap-4 pt-6 pl-10">
          <input 
          className="p-2 border border-inputBorder rounded-sm bg-white w-[320px] placeholder-black-400"
          type="text" 
          placeholder="Digite o username"
          required
          />

          <Button className="bg-[#58CBFB] w-[100px] text-white font-barlow rounded-2xl shadow-custom">Buscar</Button>
        </div>
        <div className = "pt-[121px] pl-10 ">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="justify-start flex w-full border-b-2">
              
                <TabsTrigger className="bg-[#E2F4EC] w-[136px]  border-2 border-blue-500 border-b-0 rounded-b-none" value="Partidas">Partidas</TabsTrigger>
                <TabsTrigger className="w-[136px]  border-2 border-blue-500 border-b-0 rounded-b-none" value="Histórico">Histórico</TabsTrigger>
              <div className="w-full justify-end">
                <input
                id="date"
                  type="date"
                  className="border border-inputBorder rounded-xl bg-white px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-[50px] h-12"
                  placeholder="00/00/0000"
                />
                <input
                  id="date"
                  type="date"
                  className="border border-inputBorder rounded-xl bg-white px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-[50px] h-12"
                  placeholder="00/00/0000"
                />

              </div>
              </TabsList>
              <TabsContent className="flex flex-row w-full" value="Partidas">
                <div>
                  <h1 className="leading-[38.4px] text-[32px] font-barlow">Partidas abertas</h1>
                  <h1 className="leading-[38.4px] text-[32px] font-barlow">Partidas fechadas</h1>
                </div>
              <div>
                
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