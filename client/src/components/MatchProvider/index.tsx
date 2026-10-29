"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  createMatch as createMatchRequest,
  loadMatches,
  nextPlayerId,
  persistRoster,
  registerJoin,
  setSession,
  type DataSource,
  type Match,
  type MatchDraft,
  type Player,
  type PlayerInput,
} from "@/lib/matches";

type MatchContextValue = {
  matches: Match[];
  loading: boolean;
  source: DataSource | null;
  createMatch: (draft: MatchDraft, organizer: PlayerInput) => Promise<Match>;
  joinMatch: (matchId: number, player: PlayerInput) => void;
  leaveMatch: (matchId: number, username: string) => void;
};

const MatchContext = createContext<MatchContextValue | null>(null);

export function MatchProvider({ children }: { children: ReactNode }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<DataSource | null>(null);
  const matchesRef = useRef(matches);
  const sourceRef = useRef(source);
  matchesRef.current = matches;
  sourceRef.current = source;

  useEffect(() => {
    let active = true;

    loadMatches()
      .then((result) => {
        if (!active) return;
        setMatches(result.matches);
        setSource(result.source);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const createMatch = useCallback(
    async (draft: MatchDraft, organizer: PlayerInput) => {
      const match = await createMatchRequest(draft, organizer, source ?? "demo");
      setMatches((current) => [...current, match]);
      setSource((current) => current ?? "demo");
      return match;
    },
    [source]
  );

  const joinMatch = useCallback((matchId: number, input: PlayerInput) => {
    const username = input.username.trim();
    const email = input.email.trim();
    if (!username || !email) return;

    const match = matchesRef.current.find((item) => item.id === matchId);
    if (!match) return;

    const alreadyIn = match.players.some(
      (item) => item.username.toLowerCase() === username.toLowerCase()
    );
    if (alreadyIn || match.players.length >= match.matches_qtd) return;

    const player: Player = {
      id: nextPlayerId(match.players),
      username,
      email,
    };
    const players = [...match.players, player];
    if (sourceRef.current === "api") {
      void registerJoin(matchId, { username, email }).then((saved) => {
        if (!saved) persistRoster(matchId, players);
      });
    } else {
      persistRoster(matchId, players);
    }
    setSession({ username, email });
    setMatches((current) =>
      current.map((item) => (item.id === matchId ? { ...item, players } : item))
    );
  }, []);

  const leaveMatch = useCallback((matchId: number, username: string) => {
    const match = matchesRef.current.find((item) => item.id === matchId);
    if (!match) return;

    const players = match.players.filter(
      (item) => item.username.toLowerCase() !== username.toLowerCase()
    );
    if (players.length === match.players.length) return;
    if (sourceRef.current !== "api") persistRoster(matchId, players);
    setMatches((current) =>
      current.map((item) => (item.id === matchId ? { ...item, players } : item))
    );
  }, []);

  const value = useMemo(
    () => ({
      matches,
      loading,
      source,
      createMatch,
      joinMatch,
      leaveMatch,
    }),
    [matches, loading, source, createMatch, joinMatch, leaveMatch]
  );

  return (
    <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
  );
}

export function useMatches() {
  const value = useContext(MatchContext);
  if (!value) {
    throw new Error("useMatches deve ser usado dentro de MatchProvider");
  }
  return value;
}
