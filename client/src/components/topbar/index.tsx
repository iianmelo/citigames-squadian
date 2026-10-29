"use client";

import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { WhiteLogoCITi } from "@/assets";

interface TopBarProps {
  isReturnEnabled: boolean;
}

function TopBar({ isReturnEnabled }: TopBarProps) {
  const router = useRouter();

  const backButton = isReturnEnabled ? (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Voltar"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-current transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hover:bg-black/5 md:focus-visible:ring-[#58CBFB]"
    >
      <ChevronLeft size={22} />
    </button>
  ) : (
    <span className="h-10 w-10" aria-hidden />
  );

  return (
    <header>
      <div className="flex h-16 items-center justify-between bg-[#58CBFB] px-3 text-white md:hidden">
        {backButton}
        <Image
          src={WhiteLogoCITi}
          alt="CITi"
          width={108}
          height={44}
          className="h-9 w-auto"
        />
        <span className="h-10 w-10" aria-hidden />
      </div>
      <div className="hidden h-12 items-center border-b border-b-gray84 bg-white md:flex">
        {isReturnEnabled ? (
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Voltar"
            className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58CBFB]"
          >
            <ChevronLeft size={22} />
          </button>
        ) : (
          <span className="sr-only">CITi Games</span>
        )}
      </div>
    </header>
  );
}

export default TopBar;
