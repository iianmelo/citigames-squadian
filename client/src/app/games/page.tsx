"use client";

import AppShell from "@/components/AppShell";
import CardTeste from "@/components/Card";
import DialogCreateGame from "@/components/dialogCreateGame";
import EmptyState from "@/components/EmptyState";
import { useMatches } from "@/components/MatchProvider";
import { formatMatchDate, formatMatchTime, startOfDay } from "@/lib/format";

export default function Games() {
  const { matches, loading, source } = useMatches();
  const today = startOfDay(new Date());
  const upcoming = matches
    .filter((game) => new Date(game.date).getTime() >= today.getTime())
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-10 md:py-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-barlow text-2xl font-medium leading-tight md:text-[1.75rem]">
            Próximas partidas
          </h1>
          <div className="md:hidden">
            <DialogCreateGame />
          </div>
        </div>

        {source === "demo" ? (
          <p className="mt-4 rounded-xl bg-cardBlue px-4 py-3 text-sm leading-6 text-[#454545]">
            Modo demonstração: partidas locais enquanto a API está fora do ar.
          </p>
        ) : null}

        <div className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-2xl bg-white"
                />
              ))}
            </div>
          ) : upcoming.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {upcoming.map((game) => (
                <CardTeste
                  id={game.id}
                  key={game.id}
                  name={game.name}
                  platform={game.platform}
                  date={formatMatchDate(game.date)}
                  time={formatMatchTime(game.time || game.date)}
                  currentPlayers={game.players.length}
                  maxPlayers={game.matches_qtd}
                  buttonstatus={
                    game.players.length >= game.matches_qtd ? "closed" : "open"
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Não há partidas no momento"
              description="Crie uma partida para a galera entrar."
            />
          )}
        </div>
      </div>
      <div className="fixed bottom-8 right-10 z-30 hidden md:block">
        <DialogCreateGame />
      </div>
    </AppShell>
  );
}
