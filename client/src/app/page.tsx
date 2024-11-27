'use client';

import MatchesButton from '../components/Button';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
      
      <MatchesButton roomStatus="available" />

      <MatchesButton roomStatus="full" />

      <MatchesButton roomStatus="inside" />

      <MatchesButton />
    </div>
  );
}
