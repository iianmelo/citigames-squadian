import Image from "next/image";
import CreatePage from "./CreateGame/createPage";
import Sidebar from "@/components/sidebar";

import { LogoCITi } from "../assets";
import CardTeste from "@/components/Card/indext";

export default function HomePage() {
  return (

    // <div className="flex flex-1 flex-col h-full justify-around items-center bg-black">
    //   <div>
    //     <Image src={LogoCITi} alt="Logo citi" />
    //   </div>
    //   <div className="flex flex-col justify-center items-center">
    //     <h1 className="text-white text-4xl font-bold">NextJS Boilerplate</h1>
    //     <p className="text-white text-xl">
    //       Made with <strong>&lt; &#x0002F; &gt;</strong> and{" "}
    //       <strong>&hearts;</strong> by CITi
    //     </p>
    //   </div>
    // </div>

    // <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
    //   <MatchesButton roomStatus="available" />

    //   <MatchesButton roomStatus="full" />

    //   <MatchesButton roomStatus="inside" />

    //   <MatchesButton />
    // </div>

    // <div className="p-80 bg-red-100 h-full">
    //   <CardTeste 
    //   title="minecraft"
    //   platform="discord"
    //   date="12/12/2024"
    //   time="12:00"
    //   currentPlayers={3}
    //   maxPlayers={5}
    //   />
    // </div>

    <CreatePage />
  );
}
