"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";

type AppShellProps = {
  children: ReactNode;
  showBack?: boolean;
};

export default function AppShell({ children, showBack = false }: AppShellProps) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-loginBg">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Pular para o conteúdo
      </a>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar isReturnEnabled={showBack} />
        <div
          id="conteudo"
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto pb-24 md:pb-10"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
