import { Match } from "./Match";

export interface Player {
  id: string;
  displayName: string;
  userName: string;
  email: string;
  totalWins?: number;
  totalLosses?: number;
  matches?: string[];
  epithet: string;
  favoriteColors: string[];
}

export interface PlayerDetails {
  id: string;
  displayName: string;
  userName: string;
  email: string;
  totalWins?: number;
  totalLosses?: number;
  matches?: Match[];
  epithet: string;
  favoriteColors: string[];
  isAdmin: string;
}
