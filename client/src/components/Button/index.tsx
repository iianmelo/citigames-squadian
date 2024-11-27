'use client';

import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';

type RoomStatus = "available" | "full" | "inside";

interface MatchesButtonProps {
  roomStatus?: RoomStatus;
}

export default function MatchesButton({ roomStatus = "available" }: MatchesButtonProps) {
  const router = useRouter();

  const bg = roomStatus === "available" ? "bg-green hover:bg-greenHover" : roomStatus === "full" ? "bg-grayButton hover:bg-grayButtonHover" : "bg-redButton hover:bg-redButtonHover";
  const text = roomStatus === "available" ? "Entrar" : roomStatus === "full" ? "Entrar" : "Sair";

  const handleClick = () => {
    if (roomStatus === "inside") {
      router.push('/dashboard');
    } else if (roomStatus === "available") {
      router.push('/room');
    } else {
      console.log("Sem ação para esse estado");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`${bg} w-80 h-12 text-xl leading-6 rounded-2xl shadow-custom font-bold font-barlow`}
    >
      {text}
    </Button>
  );
}
