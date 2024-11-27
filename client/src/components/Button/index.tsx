'use client';

import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';

type RoomStatus = "available" | "full" | "inside";

export default function MatchesButton({ roomStatus = "inside" }: { roomStatus?: RoomStatus }) {
  const router = useRouter();

  const buttonStyles = {
    available: {
      classes: "bg-green hover:bg-green/90",
      text: "Entrar",
    },
    full: {
      classes: "bg-grayButton hover:bg-gray-400",
      text: "Entrar",
    },
    inside: {
      classes: "bg-redButton hover:bg-red-600",
      text: "Sair",
    },
  };

  const { classes, text } = buttonStyles[roomStatus] || buttonStyles.available;

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
      className={`${classes} w-80 h-12 text-xl leading-6 rounded-2xl shadow-custom font-bold`}>
      {text}
    </Button>
  );
}
