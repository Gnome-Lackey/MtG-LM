import { Player } from "models/Player";

export interface PlayerState {
  list?: Player[];
  playerAList?: Player[];
  playerBList?: Player[];
  searchingForAPlayers?: boolean;
  searchingForBPlayers?: boolean;
};
