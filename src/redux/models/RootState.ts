import { RouterState } from "connected-react-router";

import { ApplicationState } from "redux/models/ApplicationState";
import { AuthState } from "redux/models/AuthState";
import { ErrorState } from "redux/models/ErrorState";
import { MatchState } from "./MatchState";
import { PlayerState } from "redux/models/PlayerState";
import { ScryfallState } from "redux/models/ScryfallState";
import { SeasonState } from "redux/models/SeasonState";
import { UserState } from "redux/models/UserState";

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
