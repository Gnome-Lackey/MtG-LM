import { Set } from "./Set";
import { Player } from "./Player";

export interface Season {
  [k: string]: any;
  id: string;
  startedOn: string;
  endedOn?: string;
  isActive: boolean;
  set: Set;
  players: Player[];
}
