"use client";

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

const tones: Record<ButtonStatus, string> = {
  open: "bg-cardBlue hover:bg-cardBlueHover",
  closed: "bg-cardPurple hover:bg-cardPurpleHover",
  historical: "bg-cardGray hover:bg-[#cfcfcf]",
};

function CardTeste({
  id,
  name,
  platform,
  date,
  time,
  currentPlayers,
  maxPlayers,
  buttonstatus = "open",
}: CardTesteProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/${id}`)}
      aria-label={`${name}, ${platform}, ${date} às ${time}, ${currentPlayers} de ${maxPlayers} participantes`}
      className={`flex min-h-24 w-full flex-col rounded-2xl px-4 py-3 text-left font-barlow text-sm font-light text-textCardColor shadow-cardShadow transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58CBFB] focus-visible:ring-offset-2 ${tones[buttonstatus]}`}
    >
      <span className="truncate text-base font-medium leading-5">{name}</span>
      <span className="mt-1 truncate">{platform}</span>
      <span className="mt-2 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2">
          <span>{date}</span>
          <span aria-hidden>|</span>
          <span>{time}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 tabular-nums">
          <span>
            {currentPlayers}
            <span className="text-[#454545]">/{maxPlayers}</span>
          </span>
          <Users className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </span>
      </span>
    </button>
  );
}

export default CardTeste;
