import { Player } from "models/Player";

export interface PlayerAction {
  type: string;
  payload?: {
    players?: Player[];
    playerSearchId: string;
    searching?: boolean;
  };
};
