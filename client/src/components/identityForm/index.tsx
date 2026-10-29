"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import rocketCitiLogo from "@/assets/rocketCitiLogo.png";

type IdentityFormProps = {
  submitLabel?: string;
  onSubmit: (data: { username: string; email: string }) => void | Promise<void>;
};

export default function IdentityForm({
  submitLabel = "Entrar",
  onSubmit,
}: IdentityFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      await onSubmit({ username: username.trim(), email: email.trim() });
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center px-6 py-8 sm:px-8"
    >
      <Image
        src={rocketCitiLogo}
        alt="CITi"
        width={280}
        height={110}
        className="h-auto w-full max-w-[240px]"
        priority
      />
      <div className="mt-8 flex w-full flex-col gap-4">
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="h-12 w-full rounded border border-loginInputBorder bg-white px-4 font-barlow text-base text-[#111] placeholder:text-loginPlaceholder focus:border-inputBgBorder focus:bg-inputBg focus:outline-none focus:ring-2 focus:ring-inputBgBorder"
            placeholder="Username"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded border border-loginInputBorder bg-white px-4 font-barlow text-base text-[#111] placeholder:text-loginPlaceholder focus:border-inputBgBorder focus:bg-inputBg focus:outline-none focus:ring-2 focus:ring-inputBgBorder"
            placeholder="Email"
            autoComplete="email"
            required
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="mt-2 h-12 w-full rounded-2xl bg-green font-barlow text-xl font-bold text-white shadow-custom transition hover:bg-greenHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#166534] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Entrando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
