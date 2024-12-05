"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopBarProps {
  isReturnEnabled: boolean; //required for the return feature
}

const TopBar: React.FC<TopBarProps> = ({ isReturnEnabled }) => {
  const router = useRouter();

  const handleReturn = () => {
    router.back();
  };

  return (
    <div className="w-full flex bg-white min-h-8 items-center border-b border-b-gray84">
      {isReturnEnabled && (
        <button onClick={handleReturn}>
          <ChevronLeft size={20} className="ml-4" />
        </button>
      )}
    </div>
  );
};

export default TopBar;
