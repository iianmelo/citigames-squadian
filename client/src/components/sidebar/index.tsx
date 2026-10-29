"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  GameControllerOn,
  GameControllerOff,
  UserOff,
  UserOn,
  WhiteLogoCITi,
} from "@/assets";

const items = [
  {
    href: "/games",
    label: "Explorar Partidas",
    shortLabel: "Partidas",
    iconOn: GameControllerOn,
    iconOff: GameControllerOff,
  },
  {
    href: "/profile",
    label: "Perfil",
    shortLabel: "Perfil",
    iconOn: UserOn,
    iconOff: UserOff,
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden h-dvh w-[280px] shrink-0 flex-col bg-[#58CBFB] px-5 py-8 md:flex">
        <div className="flex justify-center">
          <Image
            src={WhiteLogoCITi}
            alt="CITi"
            width={140}
            height={64}
            className="h-14 w-auto"
            priority
          />
        </div>

        <nav className="mt-10 flex flex-col gap-3" aria-label="Principal">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => router.push(item.href)}
                aria-current={active ? "page" : undefined}
                className="custom-button h-11 w-full px-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Image
                  src={active ? item.iconOn : item.iconOff}
                  alt=""
                  width={28}
                  height={28}
                />
                <span className="font-barlow text-base font-bold text-white">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <p className="mt-auto px-2 text-center font-barlow text-sm leading-6 text-white">
          Made with <strong>&lt;/&gt;</strong> and <strong>♥</strong> by CITi
        </p>
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-stretch border-t border-white/30 bg-[#58CBFB] pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Principal"
      >
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <button
              key={item.href}
              type="button"
              onClick={() => router.push(item.href)}
              aria-current={active ? "page" : undefined}
              className={`flex flex-1 flex-col items-center justify-center gap-1 font-barlow text-xs text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white ${
                active
                  ? "bg-white/25 font-bold shadow-[inset_0_-3px_0_#fff]"
                  : "font-medium opacity-80"
              }`}
            >
              <Image
                src={active ? item.iconOn : item.iconOff}
                alt=""
                width={22}
                height={22}
              />
              {item.shortLabel}
            </button>
          );
        })}
      </nav>
    </>
  );
}
