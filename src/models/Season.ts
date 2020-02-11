import { Set } from "./Scryfall";
import { Player } from "./Player";

export interface Season {
  id: string;
  startedOn: string;
  endedOn?: string;
  isActive: boolean;
  set: Set;
  players: Player[];
}

export interface SeasonMetadata {
  seasonWins: number;
  seasonLosses: number;
  totalWins: number;
  totalLosses: number;
  player: string;
  season: string;
  playedOpponents: string[];
  matches: string[];
}
