import { RouterState } from "connected-react-router";

import { ApplicationState } from "redux/application/models/State";
import { AuthState } from "redux/auth/models/State";
import { ErrorState } from "redux/error/models/State";
import { MatchState } from "../match/models/State";
import { PlayerState } from "redux/player/models/State";
import { ScryfallState } from "redux/scryfall/models/State";
import { SeasonState } from "redux/season/models/State";
import { UserState } from "redux/user/models/State";

export interface RootState {
  application: ApplicationState;
  auth: AuthState;
  errors: ErrorState;
  matches: MatchState;
  players: PlayerState;
  router: RouterState;
  scryfall: ScryfallState;
  seasons: SeasonState;
  users: UserState;
};
