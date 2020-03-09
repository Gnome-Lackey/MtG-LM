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
