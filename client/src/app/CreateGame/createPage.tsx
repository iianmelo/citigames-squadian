'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft } from 'lucide-react';

import { useRouter } from "next/navigation";

interface MatchData {
  title: string;
  platform: string;
  date: string;
  time: string;
  maxplayers: number;
  discription: string;
  gamelink: string;
}

const CreatePage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<MatchData>({ mode: "onChange" });
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
    setMatchData(data);
    console.log("Dados da partida:", data);
  };

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  return (
    <div>
      <main className="min-h-screen bg-TextWhite flex flex-col pt-24 pl-[344px] w-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[64rem] font-barlow"
        >
            <h2 className="text-4xl font-semibold mb-12 flex">

              <button onClick={handleReturn} className="flex items-center">
              <ChevronLeft size={30} strokeWidth={2} className="inline-block mr-1 cursor-pointer" />
              </button>
              Criar Partida
            </h2>

          <fieldset className="flex flex-row gap-[4rem] mb-4">
            <div>
              <label htmlFor="title" className="block font-medium mb-2">Nome do jogo</label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Este campo é obrigatório" })}
                className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 w-[30rem] h-12 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder"
                placeholder="Jogo"
              />
              {errors.title && <span className="text-redButton text-sm font-normal">{errors.title.message}</span>}
            </div>

            <div>
              <label htmlFor="platform" className="block font-medium  mb-2">Plataforma de reunião</label>
              <input
                id="platform"
                type="text"
                {...register("platform", { required: "Este campo é obrigatório" })}
                className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 w-[30rem] h-12 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder"
                placeholder="Plataforma"
              />
              {errors.platform && <span className="text-red-500 text-sm">{errors.platform.message}</span>}
            </div>
          </fieldset>

          <fieldset className="flex flex-row gap-14">
            <div className="mb-4">
              <label htmlFor="date" className="block font-medium mb-2">Data da Partida</label>
              <input
                id="date"
                type="date"
                {...register("date", { required: "Selecione uma data" })}
                className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-[19rem] h-12"
                placeholder="00/00/0000"
              />
              {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="time" className="block font-medium mb-2">Hora da Partida</label>
              <input
                id="time"
                type="time"
                {...register("time", { required: "Selecione um horário" })}
                className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-[19rem] h-12"
              />
              {errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="maxplayers" className="block font-medium mb-2">Quantidade máxima de pessoas</label>
              <input
                id="maxplayers"
                type="maxplayers"
                {...register("maxplayers", { required: "Selecione uma quantidade" })}
                className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-[19rem] h-12"
                placeholder="0"
              />
              {errors.maxplayers && <span className="text-red-500 text-sm">{errors.maxplayers.message}</span>}
            </div>
          </fieldset>

          <div className="mb-4">
            <label htmlFor="gamelink" className="block font-medium mb-2">Link da partida</label>
            <input
              id="gamelink"
              type="text"
              {...register("gamelink", { required: "Este campo é obrigatório" })}
              className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-full h-12"
              placeholder="Link da partida"
            />
            {errors.gamelink && <span className="text-red-500 text-sm">{errors.gamelink.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="discription" className="block font-medium mb-2">Descrição</label>
            <textarea
              id="discription"
              {...register("discription", { required: "Este campo é obrigatório" })}
              className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-full h-36 resize-none"
              placeholder="Descrição da partida"
            />
            {errors.discription && <span className="text-red-500 text-sm">{errors.discription.message}</span>}
        </div>


            <div className="flex justify-end mt-[10rem]">
              <button
                type="submit"
                className={`w-80 h-12 bg-cardGray text-xl text-white leading-6 rounded-2xl shadow-custom font-bold font-barlow ${isValid ? "bg-green hover:bg-greenHover" : "bg-cardGray"}`}
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

export default CreatePage;
