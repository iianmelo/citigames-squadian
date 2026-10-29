import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-loginBg px-6 text-center font-barlow">
      <p className="text-sm font-medium text-[#6800E4]">CITi Games</p>
      <h1 className="mt-2 text-3xl font-medium">Página não encontrada</h1>
      <p className="mt-2 max-w-md text-[#454545]">
        Esse endereço não faz parte do protótipo.
      </p>
      <Link
        href="/games"
        className="mt-6 inline-flex h-11 items-center rounded-2xl bg-[#58CBFB] px-5 font-semibold text-white hover:bg-[#1AB7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b6f96]"
      >
        Ir para as partidas
      </Link>
    </main>
  );
}
