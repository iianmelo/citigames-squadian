import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MatchProvider } from "@/components/MatchProvider";

import "styles/globals.css";

export const metadata: Metadata = {
  title: "CITi Games",
  description:
    "Protótipo web para organizar partidas, feito no processo seletivo do CITi.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-loginBg font-barlow text-[#111] antialiased">
        <MatchProvider>{children}</MatchProvider>
      </body>
    </html>
  );
}
