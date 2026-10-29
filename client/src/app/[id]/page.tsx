"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import AppShell from "@/components/AppShell";
import DialogEnterGame from "@/components/dialogEnterGame";
import EmptyState from "@/components/EmptyState";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMatches } from "@/components/MatchProvider";
import { formatMatchDate, formatMatchTime } from "@/lib/format";
import { getSession, type Session } from "@/lib/matches";

export default function MatchDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { matches, loading, joinMatch, leaveMatch } = useMatches();
  const match = matches.find((item) => item.id === id);
  const [session, setSessionState] = useState<Session | null>(null);

  useEffect(() => {
    setSessionState(getSession());
  }, [matches]);

  const currentPlayers = match?.players.length ?? 0;
  const joined = Boolean(
    session &&
      match?.players.some(
        (player) =>
          player.username.toLowerCase() === session.username.toLowerCase()
      )
  );
  const roomStatus = joined
    ? "inside"
    : match && currentPlayers >= match.matches_qtd
      ? "full"
      : "available";

  const bgColors = {
    available: "bg-cardBlue",
    full: "bg-cardPurple",
    inside: "bg-cardGreen",
  };

  return (
    <AppShell showBack>
      <div className="mx-auto flex w-full max-w-5xl flex-col items-stretch gap-8 px-4 py-6 md:px-10 md:py-10 gdcustom:flex-row gdcustom:items-start gdcustom:justify-center gdcustom:gap-16">
        {loading ? (
          <div className="h-80 w-full animate-pulse rounded-2xl bg-white" />
        ) : !match ? (
          <EmptyState
            title="Partida não encontrada"
            description="Ela pode ter saído da lista ou o link está incompleto."
          />
        ) : (
          <>
            <section className="w-full max-w-md flex-1">
              <p className="font-barlow text-sm text-[#6800E4]">Partidas</p>
              <h1 className="mt-2 font-barlow text-[1.75rem] font-medium leading-9">
                {match.name}
              </h1>
              <p className="mt-2 flex gap-2 font-barlow text-base text-[#454545]">
                <span>{formatMatchDate(match.date)}</span>
                <span aria-hidden>|</span>
                <span>{formatMatchTime(match.time || match.date)}</span>
              </p>
              <p className="mt-1 font-barlow text-base text-[#454545]">
                {match.platform}
              </p>

              <div className="mt-8">
                <h2 className="font-barlow text-base font-medium">Descrição</h2>
                <p className="mt-2 rounded-lg bg-white/80 p-4 font-barlow text-sm leading-6 text-[#454545] shadow-md">
                  {match.description || "Sem descrição."}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="font-barlow text-base font-medium">Link</h2>
                <div className="mt-2 break-all rounded-lg bg-white/80 p-4 font-barlow text-sm leading-6 text-[#454545] shadow-md">
                  {/^https?:\/\//i.test(match.link) ? (
                    <a
                      href={match.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[#1a73e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58CBFB]"
                    >
                      {match.link}
                    </a>
                  ) : (
                    match.link || "Sem link."
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <DialogEnterGame
                  roomStatus={roomStatus}
                  onJoin={(data) => {
                    joinMatch(match.id, data);
                    setSessionState(data);
                  }}
                  onLeave={() => {
                    if (!session) return;
                    leaveMatch(match.id, session.username);
                  }}
                />
              </div>
            </section>

            <aside className="w-full rounded-2xl bg-loginBg p-4 shadow-cardShadow gdcustom:w-[400px] gdcustom:shrink-0">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="font-barlow text-2xl">Participantes</h2>
                <p className="font-barlow text-2xl tabular-nums">
                  {currentPlayers}
                  <span className="text-[#454545]">/{match.matches_qtd}</span>
                </p>
              </div>
              <ScrollArea
                className={`h-80 w-full rounded-2xl p-4 md:h-[28rem] ${bgColors[roomStatus]}`}
              >
                <ul className="space-y-3 font-barlow text-base text-[#454545]">
                  {match.players.length > 0 ? (
                    match.players.map((player) => (
                      <li key={player.id} className="flex items-center gap-2">
                        <CircleUserRound size={22} aria-hidden />
                        <span>{player.username}</span>
                      </li>
                    ))
                  ) : (
                    <li>Ninguém entrou ainda.</li>
                  )}
                </ul>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </aside>
          </>
        )}
      </div>
    </AppShell>
  );
}
