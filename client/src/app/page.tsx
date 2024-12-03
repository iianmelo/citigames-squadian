import Image from "next/image";
import Sidebar from "@/components/sidebar";




import React from "react";


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

export const testvalues: DetailsPageProps = {
  title: "Minecraft",
  platform: "Discord",
  date: "06/07/2023",
  time: "19h",
  link: "Lorem ipsum dolor sit amet consec...",
  description:
  "Texto",
    maxPlayers: 20,
  players: [
    "Jogador1",
    "Jogador2",
    "Jogador3",
    "Jogador4",
    "Jogador5",
    "Jogador6",
    "Jogador7",
    "Jogador8",
    "Jogador9",
    "Jogador10",
    "Jogador11",
    "Jogador12",
    "Jogador13",
    "Jogador14",
    "Jogador15",
    "Jogador16",
    "Jogador17",
    "Jogador18",
    "Jogador19",
    "Jogador20",
  ],
};

const DetailsPage: React.FC<DetailsPageProps> = (props) => {
  const {
    title = testvalues.title,
    platform = testvalues.platform,
    date = testvalues.date,
    time = testvalues.time,
    link = testvalues.link,
    description = testvalues.description,
    maxPlayers = testvalues.maxPlayers,
    players = testvalues.players,
  } = props;

  return (
    <div className="flex">
      <Sidebar></Sidebar>
    </div>
  );
};

export default DetailsPage;

