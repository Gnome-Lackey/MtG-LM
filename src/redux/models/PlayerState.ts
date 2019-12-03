import { Player } from "models/Player";

export interface PlayerState {
  list?: Player[];
  activePlayerList?: Player[];
  defendingPlayerList?: Player[];
  searchingForActivePlayers?: boolean;
  searchingForDefendingPlayers?: boolean;
};
