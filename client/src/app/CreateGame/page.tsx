"use client";

import React, { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/sidebar";

interface MatchData {
  title: string;
  platform: string;
  date: string;
  time: string;
  maxplayers: number;
  discription: string;
  gamelink: string;
}

const CreateGamePage = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MatchData>({ mode: "onChange" });
  const [matchData, setMatchData] = useState<MatchData>({
    title: "",
    date: "",
    time: "",
    platform: "",
    maxplayers: 0,
    discription: "",
    gamelink: "",
  });

  const onSubmit = (data: MatchData) => {
    const formattedDate = data.date.split("-").reverse().join("/");
    const updatedData = { ...data, date: formattedDate };

    setMatchData(updatedData);
    console.log("Dados da partida formatados:", updatedData);
  };

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const returnHome = () => {
    router.push("/games");
  };
  return (
    <div className="flex flex-row h-screen overflow-y-auto">
      <Sidebar></Sidebar>
      <main className="flex min-h-screen items-center flex-col flex-grow justify-center overflow-y-auto h-full bg-[#F5F5F5] p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full  flex-col max-w-[64rem] font-barlow mt-20 cgcustom:mt-0"
        >
          <h2 className="text-[25px] cgcustom:text-4xl w-full font-semibold mb-2 cgcustom:mb-12 flex">
            <button onClick={handleReturn} className="flex items-center">
              <ChevronLeft
                size={30}
                strokeWidth={2}
                className="inline-block mr-1 cursor-pointer"
              />
            </button>
            Criar Partida
          </h2>
          <div className="w-full">
            <fieldset className="w-full justify-between flex mb-4 flex-col cgcustom:flex-row gap-4 cgcustom:gap-14">
              <div className="flex-auto">
                <label htmlFor="title" className="block font-medium mb-2">
                  Nome do jogo
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", {
                    required: "Este campo é obrigatório",
                  })}
                  className="bg-white border border-inputBorder rounded-xl bg-inputBg px-3 py-2 w-full h-12 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder"
                  placeholder="Jogo"
                />
                {errors.title && (
                  <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                    {errors.title.message}
                    <CircleAlert
                      size={14}
                      strokeWidth={1.7}
                      className="inline-block mr-1"
                    />
                  </span>
                )}
              </div>

              <div className="flex-auto">
                <label htmlFor="platform" className="block font-medium  mb-2">
                  Plataforma de reunião
                </label>
                <input
                  id="platform"
                  type="text"
                  {...register("platform", {
                    required: "Este campo é obrigatório",
                  })}
                  className="bg-white border border-inputBorder rounded-xl bg-inputBg px-3 py-2 h-12 w-full focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder"
                  placeholder="Plataforma"
                />
                {errors.platform && (
                  <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                    {errors.platform.message}
                    <CircleAlert
                      size={14}
                      strokeWidth={1.7}
                      className="inline-block mr-1"
                    />
                  </span>
                )}
              </div>
            </fieldset>
          </div>

          <fieldset className="w-full flex  flex-col cgcustom:flex-row cgcustom:gap-14">
            <div className="mb-4 flex-auto">
              <label htmlFor="date" className="block font-medium mb-2">
                Data da Partida
              </label>
              <input
                id="date"
                type="date"
                {...register("date", {
                  required: "Este campo é obrigatório",
                })}
                className="bg-white border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-full h-12"
                placeholder="00/00/0000"
              />
              {errors.date && (
                <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                  {errors.date.message}
                  <CircleAlert
                    size={14}
                    strokeWidth={1.7}
                    className="inline-block mr-1"
                  />
                </span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="time" className="block font-medium mb-2">
                Hora da Partida
              </label>
              <input
                id="time"
                type="time"
                {...register("time", {
                  required: "Este campo é obrigatório",
                })}
                className="bg-white border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-full h-12"
              />
              {errors.time && (
                <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                  {errors.time.message}
                  <CircleAlert
                    size={14}
                    strokeWidth={1.7}
                    className="inline-block mr-1"
                  />
                </span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="maxplayers" className="block font-medium mb-2">
                Quantidade máxima de pessoas
              </label>
              <input
                id="maxplayers"
                type="maxplayers"
                {...register("maxplayers", {
                  required: "Este campo é obrigatório",
                })}
                className="bg-white border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-full h-12"
                placeholder="0"
              />
              {errors.maxplayers && (
                <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                  {errors.maxplayers.message}
                  <CircleAlert
                    size={14}
                    strokeWidth={1.7}
                    className="inline-block mr-1"
                  />
                </span>
              )}
            </div>
          </fieldset>

          <div className="mb-4 w-full">
            <label htmlFor="gamelink" className="block font-medium mb-2">
              Link da partida
            </label>
            <input
              id="gamelink"
              type="text"
              {...register("gamelink", {
                required: "Este campo é obrigatório",
              })}
              className="bg-white border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-full h-12"
              placeholder="Link da partida"
            />
            {errors.gamelink && (
              <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                {errors.gamelink.message}
                <CircleAlert
                  size={14}
                  strokeWidth={1.7}
                  className="inline-block mr-1"
                />
              </span>
            )}
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="discription" className="block font-medium mb-2">
              Descrição
            </label>
            <textarea
              id="discription"
              {...register("discription", {
                required: "Este campo é obrigatório",
              })}
              className="bg-white border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-full h-36 resize-none"
              placeholder="Descrição da partida"
            />
            {errors.discription && (
              <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                {errors.discription.message}
                <CircleAlert
                  size={14}
                  strokeWidth={1.7}
                  className="inline-block mr-1"
                />
              </span>
            )}
          </div>

          <div className="w-full flex justify-end mt-[2rem] mb-[2.5rem]">
            <button
              onClick={returnHome}
              type="submit"
              className={`w-80 h-12 bg-cardGray text-xl text-white leading-6 rounded-2xl shadow-custom font-bold font-barlow ${
                isValid ? "bg-green hover:bg-greenHover" : "bg-cardGray"
              }`}
              disabled={!isValid}
            >
              Criar Partida
            </button>
          </div>
        </form>
        <div className="mb-4"></div>
      </main>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <CreateGamePage />
  </Suspense>
);

export default Page;