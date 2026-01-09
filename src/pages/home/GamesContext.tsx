import { createContext } from "react";

// Types
import type { Platform } from "@/common/supported-platforms/supported-platforms.types";
import type { RawgGame } from "@/types";
import type { GameCardVariant } from "@/components/GameCard";

export const GamesContext = createContext<{
  games: RawgGame[];
  loading: boolean;
  error: string | null;
  title: string;
  selectedPlatform?: Platform;
  moreLinkTo?: string;
  cardVariant?: GameCardVariant;
}>({
  games: [],
  loading: true,
  error: null,
  title: "",
  moreLinkTo: "",
  cardVariant: "default",
});
