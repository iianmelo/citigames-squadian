"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Topbar from "@/components/topbar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import DialogEnterGame from "@/components/dialogEnterGame";
import { CircleUserRound } from "lucide-react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import { format } from "date-fns";
import { mt, ptBR } from "date-fns/locale";


interface DetailsPageProps {
  name: string;
  platform: string;
  date: string;
  time: string;
  link: string;
  description: string;
  matches_qtd: number;
  players: string[];
}

const fetchMatchDetails = async (id: number): Promise<DetailsPageProps> => {
  try {
    console.log("Fetching match details for id:", id);
    const response = await axios.get(`http://localhost:3001/match/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match details:", error);
    throw error;
  }
};

function DetailsPage({
  name,
  platform,
  date,
  time,
  link,
  description,
  matches_qtd,
  players,
}: DetailsPageProps) {
  const currentPlayers = 10;
  const formattedDate = format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
  const formattedTime = format(new Date(date), "HH'h'");


  const roomStatus: "available" | "full" | "inside" =
    currentPlayers < matches_qtd
      ? "available"
      : currentPlayers >= matches_qtd
      ? "full"
      : "inside";

  const bgColors = {
    available: "bg-[#D2EFFE]",
    full: "bg-[#D5C6FA]",
    inside: "bg-[##D0F4E4]",
  };

  return (
    <div className="flex flex-row w-screen h-screen">
      <Sidebar/>
      <div className="flex flex-col flex-grow overflow-y-auto w-full h-full bg-[#F5F5F5]">
        <Topbar isReturnEnabled={true} />
        <div className="flex flex-col gap-[70px] gdcustom:justify-center gdcustom:gap-0 gdcustom:flex-row flex-grow items-center gdcustom:items-start justify-center bg-[#F5F5F5] pr-[40px] pl-16 py-[10vh]">
          <div className="flex flex-col items-center gdcustom:items-start flex-grow max-w-md w-full gdcustom:pr-0 gdcustom:mr-[60px]">
            <h1 className="text-[#6800E4] font-barlow text-[14px] font-normal leading-[15px] text-left ">
              Partidas
            </h1>
            <h1 className="text-[#000000] font-barlow text-[28px] font-medium leading-[36px] text-left mt-2 mb-3">
              {name}
            </h1>
            <div className="flex text-[16px] leading-[19.2px] font-barlow text-[#454545] gap-2">
              <p>{formattedDate}</p> 
              <span>|</span> 
              <p>{formattedTime}</p>
            </div>
            <p className="font-barlow text-[16px] font-normal leading-[19.2px] text-left py-2 mb-[40px] text-[#454545]">
              {platform}
            </p>
            <div className="py-2 w-full">
              <p className="text-[16px] leading-[19.2px] text-[#000000] font-medium font-barlow mb-2">
                Descrição:
              </p>
              <p className="text-[14px] leading-[16.8px] font-barlow bg-[#FFFFFF80] text-[#454545] rounded-lg shadow-md p-4 mb-8">
                {description}
              </p>

              <p className="text-[16px] leading-[19.2px] text-[#000000] font-barlow font-medium mb-2 pt-2">
                Link:
              </p>
              <p className="text-[14px] leading-[16.8px] font-barlow bg-[#FFFFFF80] text-[#454545] rounded-lg shadow-md p-4">
                <a href={link} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                  {link}
                </a>
              </p>
              <div className="gdcustom:mt-10 mt-6 flex justify-center items-center">
                <DialogEnterGame></DialogEnterGame>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gdcustom:items-start p-4 text-lg font-barlow bg-[#F5F5F5] shadow-cardShadow gdcustom:w-[400px] min-w-[250px] rounded-2xl">
            <div className="flex items-center justify-between min-w-[10px] w-full mb-4">
              <p className="text-[24px] leading-[32px] font-barlow text-[#000000]">
                Participantes
              </p>
              <p className="text-[24px] leading-[32px] font-barlow text-[#000000]">
                {currentPlayers} / {matches_qtd}
              </p>
            </div>

            <ScrollArea className={`mt-4 h-[500px] ${bgColors[roomStatus]} p-5 w-full overflow-y-auto rounded-2xl`} >
              <div className="text-[16px] leading-[19.2px] text-[#454545] p-1 font-barlow">
                
                  <div className="flex items-center gap-2 mb-2">
                    <CircleUserRound size={24} />
                    <span>sokdkjs</span>
                  </div>
              
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [details, setDetails] = useState<DetailsPageProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const getMatchDetails = async () => {
        try {
          const data = await fetchMatchDetails(Number(id));
          setDetails(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      getMatchDetails();
    }
  }, [id]);

  if (loading) return <p></p>;
  if (error) return <p>Error: {error.message}</p>;

  return details ? <DetailsPage {...details} /> : <p>No details available</p>;
}