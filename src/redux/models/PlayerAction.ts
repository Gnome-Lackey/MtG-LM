import { Player } from "models/Player";

export interface PlayerAction {
  type: string;
  payload?: {
    loading?: boolean;
    players?: Player[];
    playerSearchId: string;
    searching?: boolean;
  };
};
