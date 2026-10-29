import axios from "axios";

export type Player = {
  id: number;
  username: string;
  email: string;
};

export type Match = {
  id: number;
  name: string;
  platform: string;
  date: string;
  time: string;
  description: string;
  link: string;
  matches_qtd: number;
  players: Player[];
};

export type MatchDraft = {
  name: string;
  platform: string;
  date: string;
  time: string;
  description: string;
  link: string;
  matches_qtd: number;
};

export type PlayerInput = {
  username: string;
  email: string;
};

export type DataSource = "api" | "demo";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const STORAGE_KEY = "citigames.demo.v1";
const SESSION_KEY = "citigames.session";

type DemoState = {
  extras: Match[];
  rosters: Record<string, Player[]>;
};

export type Session = PlayerInput;

function atHour(offsetDays: number, hour: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

function player(id: number, username: string): Player {
  return {
    id,
    username,
    email: `${username.toLowerCase().replace(/\s+/g, ".")}@citigames.local`,
  };
}

export function seedMatches(): Match[] {
  const valorant = atHour(2, 19);
  const minecraft = atHour(1, 16);
  const league = atHour(4, 21);
  const ranked = atHour(3, 20);
  const rocket = atHour(6, 18);
  const stardew = atHour(9, 15);
  const amongUs = atHour(-1, 20);
  const eaFc = atHour(-12, 19);

  return [
    {
      id: 1,
      name: "Valorant",
      platform: "Discord",
      date: valorant,
      time: valorant,
      description:
        "Partida casual para quem quiser jogar junto. Entra no canal de voz alguns minutos antes e leva o fone — a sala abre com dez vagas.",
      link: "https://discord.gg/citigames",
      matches_qtd: 10,
      players: [player(1, "Ian"), player(2, "Felipe"), player(3, "Ramon")],
    },
    {
      id: 2,
      name: "Minecraft",
      platform: "Discord",
      date: minecraft,
      time: minecraft,
      description:
        "Sessão de construção no servidor da galera. Pode entrar para minerar, farmar ou só acompanhar a obra.",
      link: "https://discord.gg/citigames",
      matches_qtd: 20,
      players: [
        player(1, "Ian"),
        player(4, "Jogador 4"),
        player(5, "Jogador 5"),
        player(6, "Jogador 6"),
      ],
    },
    {
      id: 3,
      name: "League of Legends",
      platform: "Discord",
      date: league,
      time: league,
      description:
        "Flex 5v5 já preenchida. A lista fica fechada até alguém sair da partida.",
      link: "https://discord.gg/citigames",
      matches_qtd: 5,
      players: [
        player(1, "Ian"),
        player(2, "Felipe"),
        player(7, "Jogador 7"),
        player(8, "Jogador 8"),
        player(9, "Jogador 9"),
      ],
    },
    {
      id: 4,
      name: "Valorant Ranked",
      platform: "Discord",
      date: ranked,
      time: ranked,
      description:
        "Fila ranqueada com o time completo. Novas entradas só aparecem se abrir uma vaga.",
      link: "https://discord.gg/citigames",
      matches_qtd: 10,
      players: Array.from({ length: 10 }, (_, index) =>
        player(index + 1, index === 0 ? "Ramon" : `Jogador ${index + 1}`)
      ),
    },
    {
      id: 5,
      name: "Rocket League",
      platform: "Discord",
      date: rocket,
      time: rocket,
      description:
        "Duelos e um 3v3 descontraído. Chega com a conta logada para a partida começar no horário.",
      link: "https://discord.gg/citigames",
      matches_qtd: 6,
      players: [player(2, "Felipe"), player(3, "Ramon")],
    },
    {
      id: 6,
      name: "Stardew Valley",
      platform: "Google Meet",
      date: stardew,
      time: stardew,
      description:
        "Cooperativo curto no fim da tarde. Quatro vagas, no ritmo de quem puder aparecer.",
      link: "https://meet.google.com/cit-igam-es",
      matches_qtd: 4,
      players: [player(1, "Ian")],
    },
    {
      id: 7,
      name: "Among Us",
      platform: "Google Meet",
      date: amongUs,
      time: amongUs,
      description:
        "Partida de ontem à noite. O histórico guarda quem entrou para consultar depois.",
      link: "https://meet.google.com/cit-igam-es",
      matches_qtd: 10,
      players: [
        player(1, "Ian"),
        player(2, "Felipe"),
        player(3, "Ramon"),
        player(4, "Jogador 4"),
        player(5, "Jogador 5"),
        player(6, "Jogador 6"),
        player(7, "Jogador 7"),
        player(8, "Jogador 8"),
      ],
    },
    {
      id: 8,
      name: "EA FC",
      platform: "Discord",
      date: eaFc,
      time: eaFc,
      description:
        "Pelada encerrada. A sala ficou registrada com o time que jogou naquela data.",
      link: "https://discord.gg/citigames",
      matches_qtd: 4,
      players: [
        player(2, "Felipe"),
        player(3, "Ramon"),
        player(9, "Jogador 9"),
        player(10, "Jogador 10"),
      ],
    },
  ];
}

function emptyDemoState(): DemoState {
  return { extras: [], rosters: {} };
}

function loadDemoState(): DemoState {
  if (typeof window === "undefined") return emptyDemoState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyDemoState();
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    return {
      extras: Array.isArray(parsed.extras) ? parsed.extras : [],
      rosters: parsed.rosters ?? {},
    };
  } catch {
    return emptyDemoState();
  }
}

function saveDemoState(state: DemoState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function readDemoMatches(): Match[] {
  const state = loadDemoState();
  const applyRoster = (match: Match) => {
    const roster = state.rosters[String(match.id)];
    return roster ? { ...match, players: roster } : match;
  };

  return [...seedMatches().map(applyRoster), ...state.extras.map(applyRoster)];
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (!parsed.username || !parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function nextPlayerId(players: Player[]): number {
  return players.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function normalizePlayer(raw: unknown, index: number): Player | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const username = typeof value.username === "string" ? value.username : "";
  if (!username) return null;

  return {
    id: typeof value.id === "number" ? value.id : index + 1,
    username,
    email: typeof value.email === "string" ? value.email : "",
  };
}

export function normalizeMatch(raw: unknown): Match | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  if (value.id == null || typeof value.name !== "string") return null;

  const rosterSource = Array.isArray(value.users)
    ? value.users
    : Array.isArray(value.players)
      ? value.players
      : [];

  const date = typeof value.date === "string" ? value.date : "";
  const time = typeof value.time === "string" ? value.time : date;

  return {
    id: Number(value.id),
    name: value.name,
    platform: typeof value.platform === "string" ? value.platform : "",
    date,
    time,
    description: typeof value.description === "string" ? value.description : "",
    link: typeof value.link === "string" ? value.link : "",
    matches_qtd: Number(value.matches_qtd ?? 0),
    players: rosterSource
      .map((item, index) => normalizePlayer(item, index))
      .filter((item): item is Player => item !== null),
  };
}

export async function loadMatches(): Promise<{
  matches: Match[];
  source: DataSource;
}> {
  try {
    const response = await axios.get<unknown>(`${API_URL}/match`, {
      timeout: 2500,
    });
    const matches = Array.isArray(response.data)
      ? response.data
          .map((item) => normalizeMatch(item))
          .filter((item): item is Match => item !== null)
      : [];

    if (matches.length > 0) {
      return { matches, source: "api" };
    }
  } catch {
    // The public deploy has no API. Demo data keeps the prototype usable.
  }

  return { matches: readDemoMatches(), source: "demo" };
}

export async function createMatch(
  draft: MatchDraft,
  organizer: PlayerInput,
  source: DataSource
): Promise<Match> {
  const username = organizer.username.trim() || "Convidado";
  const email = organizer.email.trim() || "convidado@citigames.local";

  if (source === "api") {
    try {
      const playerResponse = await axios.post<{ id: number }>(
        `${API_URL}/player`,
        { username, email },
        { timeout: 4000 }
      );
      const matchResponse = await axios.post(
        `${API_URL}/match`,
        {
          ...draft,
          matches_qtd: Number(draft.matches_qtd),
        },
        { timeout: 4000 }
      );
      const created = normalizeMatch(matchResponse.data);
      if (!created) throw new Error("Resposta inválida ao criar partida");

      await axios.post(
        `${API_URL}/match/addPlayer`,
        {
          matchId: created.id,
          playerId: playerResponse.data.id,
        },
        { timeout: 4000 }
      );

      if (created.players.length === 0) {
        created.players = [
          { id: playerResponse.data.id, username, email },
        ];
      }

      setSession({ username, email });
      return created;
    } catch {
      // Fall through to the local prototype store.
    }
  }

  const match: Match = {
    ...draft,
    id: Date.now(),
    matches_qtd: Number(draft.matches_qtd),
    players: [{ id: 1, username, email }],
  };
  const state = loadDemoState();
  state.extras.push(match);
  saveDemoState(state);
  setSession({ username, email });
  return match;
}

export function persistRoster(matchId: number, players: Player[]) {
  const state = loadDemoState();
  state.rosters[String(matchId)] = players;
  saveDemoState(state);
}

export async function registerJoin(matchId: number, input: PlayerInput) {
  try {
    const response = await axios.post<{ id: number }>(
      `${API_URL}/player`,
      {
        username: input.username.trim(),
        email: input.email.trim(),
      },
      { timeout: 4000 }
    );
    await axios.post(
      `${API_URL}/match/addPlayer`,
      { matchId, playerId: response.data.id },
      { timeout: 4000 }
    );
    return true;
  } catch {
    return false;
  }
}
