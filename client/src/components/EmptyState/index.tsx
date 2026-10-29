import { Gamepad2 } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description?: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-[#D1CFCF] bg-white/70 px-6 py-10 text-center">
      <Gamepad2 className="mb-3 h-8 w-8 text-[#6800E4]" aria-hidden />
      <p className="font-barlow text-lg text-[#292929]">{title}</p>
      {description ? (
        <p className="mt-1 max-w-md text-sm leading-6 text-[#454545]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
