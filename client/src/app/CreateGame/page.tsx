"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft, CircleAlert } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import { useMatches } from "@/components/MatchProvider";
import type { MatchDraft } from "@/lib/matches";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span className="mt-1 inline-flex items-center gap-1 text-sm text-redButton">
      {message}
      <CircleAlert size={14} strokeWidth={1.7} aria-hidden />
    </span>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-inputBorder bg-white px-3 font-barlow text-base focus:border-inputFocusBorder focus:bg-inputFocusBg focus:outline-none focus:ring-2 focus:ring-[#58CBFB]";

function CreateGamePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") ?? "";
  const email = searchParams.get("email") ?? "";
  const router = useRouter();
  const { createMatch } = useMatches();
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MatchDraft>({ mode: "onChange" });

  const onSubmit = async (data: MatchDraft) => {
    setSubmitError("");
    setSubmitting(true);
    const formattedDateTime = new Date(`${data.date}T${data.time}`).toISOString();

    try {
      const match = await createMatch(
        {
          ...data,
          date: formattedDateTime,
          time: formattedDateTime,
          matches_qtd: Number(data.matches_qtd),
        },
        {
          username: username || "Convidado",
          email: email || "convidado@citigames.local",
        }
      );
      router.push(`/${match.id}`);
    } catch {
      setSubmitError("Não foi possível criar a partida. Tente novamente.");
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-5xl px-4 py-6 md:px-10 md:py-10">
        <form onSubmit={handleSubmit(onSubmit)} className="font-barlow">
          <h1 className="mb-6 flex items-center text-2xl font-semibold md:text-4xl">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Voltar"
              className="mr-1 inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58CBFB]"
            >
              <ChevronLeft size={28} />
            </button>
            Criar Partida
          </h1>

          {username ? (
            <p className="mb-6 text-sm text-[#454545]">
              Organizando como{" "}
              <span className="font-medium text-black">{username}</span>
            </p>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2 md:gap-10">
            <div>
              <label htmlFor="title" className="mb-2 block font-medium">
                Nome do jogo
              </label>
              <input
                id="title"
                type="text"
                placeholder="Jogo"
                aria-invalid={errors.name ? true : undefined}
                className={inputClass}
                {...register("name", { required: "Este campo é obrigatório" })}
              />
              <FieldError message={errors.name?.message} />
            </div>
            <div>
              <label htmlFor="platform" className="mb-2 block font-medium">
                Plataforma de reunião
              </label>
              <input
                id="platform"
                type="text"
                placeholder="Plataforma"
                aria-invalid={errors.platform ? true : undefined}
                className={inputClass}
                {...register("platform", {
                  required: "Este campo é obrigatório",
                })}
              />
              <FieldError message={errors.platform?.message} />
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="date" className="mb-2 block font-medium">
                Data da Partida
              </label>
              <input
                id="date"
                type="date"
                min={today}
                className={inputClass}
                aria-invalid={errors.date ? true : undefined}
                {...register("date", { required: "Este campo é obrigatório" })}
              />
              <FieldError message={errors.date?.message} />
            </div>
            <div>
              <label htmlFor="time" className="mb-2 block font-medium">
                Hora da Partida
              </label>
              <input
                id="time"
                type="time"
                className={inputClass}
                aria-invalid={errors.time ? true : undefined}
                {...register("time", { required: "Este campo é obrigatório" })}
              />
              <FieldError message={errors.time?.message} />
            </div>
            <div>
              <label htmlFor="maxplayers" className="mb-2 block font-medium">
                Quantidade máxima de pessoas
              </label>
              <input
                id="maxplayers"
                type="number"
                min={2}
                placeholder="0"
                className={inputClass}
                aria-invalid={errors.matches_qtd ? true : undefined}
                {...register("matches_qtd", {
                  required: "Este campo é obrigatório",
                  valueAsNumber: true,
                  min: { value: 2, message: "Informe ao menos 2 pessoas" },
                  validate: (value) =>
                    Number.isFinite(value) || "Informe um número válido",
                })}
              />
              <FieldError message={errors.matches_qtd?.message} />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="gamelink" className="mb-2 block font-medium">
              Link da partida
            </label>
            <input
              id="gamelink"
              type="url"
              placeholder="https://"
              className={inputClass}
              aria-invalid={errors.link ? true : undefined}
              {...register("link", {
                required: "Este campo é obrigatório",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Informe um link começando com http:// ou https://",
                },
              })}
            />
            <FieldError message={errors.link?.message} />
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="mb-2 block font-medium">
              Descrição
            </label>
            <textarea
              id="description"
              placeholder="Descrição da partida"
              className={`${inputClass} h-36 resize-none py-3`}
              aria-invalid={errors.description ? true : undefined}
              {...register("description", {
                required: "Este campo é obrigatório",
              })}
            />
            <FieldError message={errors.description?.message} />
          </div>

          {submitError ? (
            <p className="mt-4 text-sm text-redButton" role="alert">
              {submitError}
            </p>
          ) : null}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={!isValid || submitting}
              className={`h-12 w-full max-w-xs rounded-2xl font-barlow text-xl font-bold text-white shadow-custom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58CBFB] focus-visible:ring-offset-2 disabled:cursor-not-allowed ${
                isValid && !submitting
                  ? "bg-green hover:bg-greenHover"
                  : "bg-grayButton"
              }`}
            >
              {submitting ? "Criando..." : "Criar Partida"}
            </button>
          </div>
        </form>
      </main>
    </AppShell>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center font-barlow text-[#454545]">
          Carregando...
        </div>
      }
    >
      <CreateGamePage />
    </Suspense>
  );
}
