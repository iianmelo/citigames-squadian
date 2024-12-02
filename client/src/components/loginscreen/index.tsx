"use client";

import React, { useState } from "react";
import Image from "next/image";
import rocketCitiLogo from "@/assets/rocketCitiLogo.png";
import { useRouter } from "next/navigation";

interface LoginData {
  username: string;
  email: string;
}

const LoginScreen = () => {
  const [formData, setFormData] = useState<LoginData>({ username: "", email: "" });
  const router = useRouter();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
      <div className="w-[28rem] h-[31rem] py-16 bg-loginBg rounded-2xl shadow-md flex flex-col items-center bg-gray-100">
        <Image src={rocketCitiLogo} alt="Logo da RocketCiti" width={316} height={125} quality={100}/>

        <form onSubmit={handleSubmit} className="flex flex-col mt-8 w-80 gap-8">
          <div>
            <input
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-80 h-12 px-4 py-2 border border-loginInputBorder rounded focus:outline-none focus:ring-1 focus:ring-inputBgBorder focus:bg-inputBg font-barlow font-normal text-loginInputText text-base placeholder-loginPlaceholder"
              placeholder="Username"
              required              
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-80 h-12 px-4 py-2 bg-white border border-loginInputBorder rounded focus:outline-none focus:ring-1 focus:ring-inputBgBorder focus:bg-inputBg font-barlow font-normal text-loginInputText text-base placeholder-loginPlaceholder"
              placeholder="Email"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green text-white w-80 h-12 text-xl leading-6 rounded-2xl shadow-custom font-bold font-barlow transition duration-900 focus:outline-none"
          >
            Entrar
          </button>
        </form>
      </div>
  );
};

export default LoginScreen;
