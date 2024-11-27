"use client";

import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function CreateButton() {
  const router = useRouter();

  return (
    <Button
      className="bg-green [&_svg]:size-10 rounded-2xl h-15 px-2 py-2 hover:bg-green/85"
      onClick={() => router.push('/dashboard')}
    >
      <Plus strokeWidth={1.5} />
    </Button>
  );
}
