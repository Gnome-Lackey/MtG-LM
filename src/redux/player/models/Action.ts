import { Player, PlayerRole } from "models/Player";

export interface PlayerAction {
  type: string;
  payload?: {
    loading?: boolean;
    playerRoles?: PlayerRole[];
    players?: Player[];
    playerSearchId?: string;
    searching?: boolean;
  };
};
