'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft } from 'lucide-react';
import { CircleAlert } from 'lucide-react';
import { useRouter } from "next/navigation";
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
    const formattedDate = data.date.split('-').reverse().join('/');
    const updatedData = { ...data, date: formattedDate };

    setMatchData(updatedData);
    console.log("Dados da partida formatados:", updatedData);
  };

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  return (
    <div className="flex flex-row">
      <Sidebar></Sidebar>
      <main className="ml-24 min-h-screen flex justify-center pt-8 border-none">
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
                {...register("title", { required: "Este campo é obrigatório"  })}
                className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 w-[30rem] h-12 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder"
                placeholder="Jogo"
              />
              {errors.title && <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                {errors.title.message}
                <CircleAlert size={14} strokeWidth={1.7} className="inline-block mr-1" />
                </span>}
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
              {errors.platform && <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                {errors.platform.message}
                <CircleAlert size={14} strokeWidth={1.7} className="inline-block mr-1" />
                </span>}
                
            </div>
          </fieldset>

          <fieldset className="flex flex-row gap-14">
            <div className="mb-4">
              <label htmlFor="date" className="block font-medium mb-2">Data da Partida</label>
              <input
                id="date"
                type="date"
                {...register("date", { required: "Este campo é obrigatório" })}
                className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-[19rem] h-12"
                placeholder="00/00/0000"
              />
              {errors.date && <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                {errors.date.message}
                <CircleAlert size={14} strokeWidth={1.7} className="inline-block mr-1" />
                </span>}
            </div>

            <div className="mb-4">
              <label htmlFor="time" className="block font-medium mb-2">Hora da Partida</label>
              <input
                id="time"
                type="time"
                {...register("time", { required: "Este campo é obrigatório" })}
                className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-[19rem] h-12"
              />
              {errors.time && <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                {errors.time.message}
                <CircleAlert size={14} strokeWidth={1.7} className="inline-block mr-1" />
                </span>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="maxplayers" className="block font-medium mb-2">Quantidade máxima de pessoas</label>
              <input
                id="maxplayers"
                type="maxplayers"
                {...register("maxplayers", { required: "Este campo é obrigatório" })}
                className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-[19rem] h-12"
                placeholder="0"
              />
              {errors.maxplayers && <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
                {errors.maxplayers.message}
                <CircleAlert size={14} strokeWidth={1.7} className="inline-block mr-1" />
                </span>}
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
            {errors.gamelink && <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
              {errors.gamelink.message}
              <CircleAlert size={14} strokeWidth={1.7} className="inline-block mr-1" />
              </span>}
          </div>

          <div className="mb-4">
            <label htmlFor="discription" className="block font-medium mb-2">Descrição</label>
            <textarea
              id="discription"
              {...register("discription", { required: "Este campo é obrigatório" })}
              className="border border-inputBorder rounded-xl bg-inputBg px-3 py-2 focus:outline-none focus:bg-inputFocusBg focus:border-inputFocusBorder w-full h-36 resize-none"
              placeholder="Descrição da partida"
            />
            {errors.discription && <span className="flex text-redButton text-sm font-normal items-center gap-1.5">
              {errors.discription.message}
              <CircleAlert size={14} strokeWidth={1.7} className="inline-block mr-1" />
              </span>}
        </div>


            <div className="flex justify-end mt-[2rem] mb-[2.5rem]">
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
