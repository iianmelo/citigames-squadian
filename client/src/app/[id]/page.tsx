import React, { useEffect, useState } from "react";
import Topbar from "@/components/topbar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MatchesButton from "@/components/Button";
import DialogEnterGame from "@/components/dialogEnterGame";
import { CircleUserRound } from "lucide-react";
import axios from "axios";
import Sidebar from "@/components/sidebar";

interface DetailsPageProps {
  title: string;
  platform: string;
  date: string;
  time: string;
  link: string;
  description: string;
  maxPlayers: number;
  players: string[];
}

const fetchMatchDetails = async (id: number): Promise<DetailsPageProps> => {
  try {
    const response = await axios.get(`http://localhost:3001/match/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match details:", error);
    throw error;
  }
};

function DetailsPage({
  title,
  platform,
  date,
  time,
  link,
  description,
  maxPlayers,
  players,
}: DetailsPageProps) {
  const currentPlayers = players.length;

  const roomStatus: "available" | "full" | "inside" =
    currentPlayers < maxPlayers
      ? "available"
      : currentPlayers >= maxPlayers
      ? "full"
      : "inside";

  const bgColors = {
    available: "bg-[#D2EFFE]",
    full: "bg-[#D5C6FA]",
    inside: "bg-[##D0F4E4]",
  };

  return (
    <div className="flex h-screen overflow-y-auto">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-y-auto h-full bg-[#F5F5F5]">
        <Topbar isReturnEnabled={true} />
        <div className="flex flex-col gap-4 gdcustom:gap-0 gdcustom:flex-row flex-grow items-center gdcustom:items-start justify-center bg-[#F5F5F5] pr-[40px] pl-16 py-[10vh]">
          <div className="flex flex-col items-center gdcustom:items-start flex-grow max-w-md w-full gdcustom:pr-8">
            <h1 className="text-[#6800E4] font-barlow text-[14px] font-normal leading-[15px] text-left">
              Partidas
            </h1>
            <h1 className="text-[#000000] font-barlow text-[28px] font-medium leading-[36px] text-left">
              {title}
            </h1>
            <p className="text-[16px] leading-[19.2px] font-barlow text-[#454545]">
              {date} | {time}
            </p>
            <p className="font-barlow text-[16px] font-normal leading-[19.2px] text-left py-2">
              {platform}
            </p>
            <div className="py-2">
              <p className="text-[16px] leading-[19.2px] text-[#000000] font-medium font-barlow">
                Descrição:
              </p>
              <p className="text-[14px] leading-[16.8px] font-barlow bg-[#FFFFFF80] text-[#454545] rounded-lg p-2 shadow-md ">
                {description}
              </p>
              <p className="text-[16px] leading-[19.2px] text-[#000000] font-barlow font-medium pt-2">
                Link:
              </p>
              <p className="text-[14px] leading-[16.8px] font-barlow bg-[#FFFFFF80] text-[#454545] rounded-lg p-2 shadow-md">
                {link}
              </p>
              <div className="mt-6 flex justify-center items-center">
                <DialogEnterGame></DialogEnterGame>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gdcustom:items-start p-4 text-lg font-barlow bg-[#F5F5F5] shadow-md gdcustom:w-[400px] min-w-[250px] rounded-2xl">
            <div className="flex items-center justify-between min-w-[10px] w-full mb-4">
              <p className="text-[24px] leading-[32px] font-barlow text-[#000000]">
                Participantes
              </p>
              <p className="text-[24px] leading-[32px] font-barlow text-[#000000]">
                {currentPlayers} / {maxPlayers}
              </p>
            </div>

            <ScrollArea
              className={`mt-4 h-[500px] ${bgColors[roomStatus]} p-5 w-full overflow-y-auto rounded-2xl`}
            >
              <div className="text-[16px] leading-[19.2px] text-[#454545] p-1 font-barlow">
                {players.map((player, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <CircleUserRound size={24} />
                    <span>{player}</span>
                  </div>
                ))}
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
  const [details, setDetails] = useState<DetailsPageProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getMatchDetails = async () => {
      try {
        const data = await fetchMatchDetails(2); // ID da requisição
        setDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getMatchDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return details ? <DetailsPage {...details} /> : <p>No details available</p>;
}