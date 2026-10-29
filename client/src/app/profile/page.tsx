"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import AppShell from "@/components/AppShell";
import CardTeste from "@/components/Card";
import DialogCreateGame from "@/components/dialogCreateGame";
import EmptyState from "@/components/EmptyState";
import { useMatches } from "@/components/MatchProvider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { endOfDay, formatMatchDate, formatMatchTime, startOfDay } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Match } from "@/lib/matches";

type UserData = {
  username: string;
};

function DateField({
  id,
  date,
  onChange,
}: {
  id: string;
  date?: Date;
  onChange: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn(
            "h-10 w-full justify-between bg-white text-left font-normal sm:w-[180px]",
            !date && "text-black"
          )}
        >
          {date ? format(date, "dd/MM/yyyy") : "dd/mm/aaaa"}
          <CalendarIcon className="h-4 w-4" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          locale={ptBR}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

function MatchGrid({
  games,
  status,
  emptyTitle,
}: {
  games: Match[];
  status: "open" | "closed" | "historical";
  emptyTitle: string;
}) {
  if (games.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {games.map((game) => (
        <CardTeste
          id={game.id}
          key={game.id}
          name={game.name}
          platform={game.platform}
          date={formatMatchDate(game.date)}
          time={formatMatchTime(game.time || game.date)}
          currentPlayers={game.players.length}
          maxPlayers={game.matches_qtd}
          buttonstatus={status}
        />
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const { matches, loading } = useMatches();
  const [submitted, setSubmitted] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>();

  const visibleMatches = useMemo(() => {
    const query = submitted.trim().toLowerCase();
    return matches
      .filter((game) => {
        const when = new Date(game.date);
        if (Number.isNaN(when.getTime())) return false;
        if (dateFrom && when < startOfDay(dateFrom)) return false;
        if (dateTo && when > endOfDay(dateTo)) return false;
        if (!query) return true;
        return game.players.some((player) =>
          player.username.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  }, [matches, submitted, dateFrom, dateTo]);

  const now = startOfDay(new Date());
  const openGames = visibleMatches.filter(
    (game) =>
      new Date(game.date).getTime() >= now.getTime() &&
      game.players.length < game.matches_qtd
  );
  const closedGames = visibleMatches.filter(
    (game) =>
      new Date(game.date).getTime() >= now.getTime() &&
      game.players.length >= game.matches_qtd
  );
  const historicalGames = visibleMatches.filter(
    (game) => new Date(game.date).getTime() < now.getTime()
  );

  const clearFilters = () => {
    setSubmitted("");
    setDateFrom(undefined);
    setDateTo(undefined);
    reset();
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-10 md:py-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-barlow text-2xl font-medium leading-tight md:text-[2rem]">
            Qual o username?
          </h1>
          <div className="md:hidden">
            <DialogCreateGame />
          </div>
        </div>

        <form
          onSubmit={handleSubmit((data) => setSubmitted(data.username.trim()))}
          className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start"
        >
          <div className="w-full max-w-sm">
            <label htmlFor="profile-username" className="sr-only">
              Username
            </label>
            <input
              id="profile-username"
              className={`h-10 w-full rounded-md border bg-white px-3 font-barlow text-base placeholder:text-[#777] focus:border-inputFocusBorder focus:bg-inputFocusBg focus:outline-none focus:ring-2 focus:ring-[#58CBFB] ${
                errors.username ? "border-red-500" : "border-inputBorder"
              }`}
              type="text"
              placeholder="Digite o username"
              autoComplete="username"
              {...register("username", {
                required: "O username é obrigatório",
              })}
            />
            {errors.username ? (
              <span className="mt-1 inline-flex items-center gap-1 text-sm text-red-500">
                {errors.username.message}
                <CircleAlert size={14} strokeWidth={1.7} aria-hidden />
              </span>
            ) : null}
          </div>
          <Button
            type="submit"
            className="h-10 rounded-2xl bg-[#58CBFB] px-6 font-barlow font-semibold text-white shadow-custom hover:bg-[#1AB7FF] focus-visible:ring-2 focus-visible:ring-[#0b6f96]"
          >
            Buscar
          </Button>
          {submitted || dateFrom || dateTo ? (
            <Button
              type="button"
              variant="outline"
              className="h-10 bg-white"
              onClick={clearFilters}
            >
              Limpar
            </Button>
          ) : null}
        </form>

        {submitted ? (
          <p className="mt-4 text-sm text-[#454545]">
            Partidas de <span className="font-medium text-black">{submitted}</span>
          </p>
        ) : null}

        <Tabs defaultValue="Partidas" className="mt-8 w-full">
          <TabsList className="flex h-auto w-full flex-col items-stretch gap-3 rounded-none bg-transparent p-0 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex gap-2 border-b-2 border-[#D1CFCF]">
              <TabsTrigger
                value="Partidas"
                className="w-[136px] rounded-b-none rounded-t-md border border-b-0 border-[#D1CFCF] !bg-[#F0F0F0] data-[state=active]:!bg-[#E2F4EC] data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                Partidas
              </TabsTrigger>
              <TabsTrigger
                value="Histórico"
                className="w-[136px] rounded-b-none rounded-t-md border border-b-0 border-[#D1CFCF] !bg-[#F0F0F0] data-[state=active]:!bg-[#E2F4EC] data-[state=active]:font-semibold data-[state=active]:shadow-none"
              >
                Histórico
              </TabsTrigger>
            </div>
            <div className="flex flex-col gap-2 pb-2 sm:flex-row">
              <DateField id="date-from" date={dateFrom} onChange={setDateFrom} />
              <DateField id="date-to" date={dateTo} onChange={setDateTo} />
            </div>
          </TabsList>

          <TabsContent value="Partidas" className="mt-6">
            {loading ? (
              <div className="h-28 animate-pulse rounded-2xl bg-white" />
            ) : (
              <div className="space-y-8">
                <section>
                  <h2 className="font-barlow text-2xl font-medium">
                    Partidas abertas
                  </h2>
                  <div className="mt-4">
                    <MatchGrid
                      games={openGames}
                      status="open"
                      emptyTitle="Não há partidas abertas"
                    />
                  </div>
                </section>
                <section>
                  <h2 className="font-barlow text-2xl font-medium">
                    Partidas fechadas
                  </h2>
                  <div className="mt-4">
                    <MatchGrid
                      games={closedGames}
                      status="closed"
                      emptyTitle="Não há partidas fechadas"
                    />
                  </div>
                </section>
              </div>
            )}
          </TabsContent>

          <TabsContent value="Histórico" className="mt-6">
            <h2 className="font-barlow text-2xl font-medium">
              Histórico de partidas
            </h2>
            <div className="mt-4">
              {loading ? (
                <div className="h-28 animate-pulse rounded-2xl bg-white" />
              ) : (
                <MatchGrid
                  games={historicalGames}
                  status="historical"
                  emptyTitle="Não há partidas no histórico"
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-8 right-10 z-30 hidden md:block">
        <DialogCreateGame />
      </div>
    </AppShell>
  );
}
