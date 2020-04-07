import { Set } from "./Scryfall";

export interface Season {
  id: string;
  startedOn: string;
  endedOn?: string;
  isActive: boolean;
  set: Set;
}
