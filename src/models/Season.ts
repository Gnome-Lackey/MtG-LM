import { Set } from "./Scryfall";
import { Player } from "./Player";
import { Match } from "./Match";

export interface Season {
  id: string;
  startedOn: string;
  endedOn?: string;
  isActive: boolean;
  set: Set;
  players: Player[];
}
