import { Player, PlayerDetails } from "models/Player";

export interface PlayerAction {
  type: string;
  payload?: {
    loading?: boolean;
    players?: Player[];
    player?: PlayerDetails;
    playerSearchId?: string;
    searching?: boolean;
  };
};
