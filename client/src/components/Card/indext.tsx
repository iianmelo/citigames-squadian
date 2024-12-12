import React from "react";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

type ButtonStatus = "open" | "closed" | "historical";

interface CardTesteProps {
  id: number;
  name: string;
  platform: string;
  date: string;
  time: string;
  currentPlayers: number;
  maxPlayers: number;
  buttonstatus?: ButtonStatus;
}

const CardTeste: React.FC<CardTesteProps> = ({
  id,
  name,
  platform,
  date,
  time,
  currentPlayers,
  maxPlayers,
  buttonstatus,
}) => {
  const color =
    buttonstatus === "open"
      ? "bg-cyan-100 hover:bg-cyan-200"
      : buttonstatus === "closed"
      ? "bg-violet-300 hover:bg-violet-400"
      : "bg-gray-200 hover:bg-gray-300";

  const router = useRouter();

  const handleClick = () => {
    router.push(`/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col rounded-2xl shadow-cardShadow w-60 h-24 py-4 pl-4 ${color} font-light text-sm font-barlow text-textCardColor`}
    >
      <h1 className="leading-4 font-medium">{name}</h1>
      <p className="my-1">{platform}</p>
      <fieldset className="flex flex-row">
        <div className="flex gap-2">
          <p className="">{date}</p>
          <span>|</span>
          <p className="">{time}</p>
        </div>
        <div className="flex ml-14 items-center gap-1">
          <p>
            {currentPlayers}
          </p>
          <Users className="w-4 h-5" strokeWidth="2.5" />
        </div>
      </fieldset>
    </button>
  );
};

export default CardTeste;
