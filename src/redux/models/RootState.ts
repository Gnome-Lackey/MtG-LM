import { RouterState } from "connected-react-router";

import { ApplicationState } from "redux/models/ApplicationState";
import { AuthState } from "redux/models/AuthState";
import { ScryfallState } from "redux/models/ScryfallState";
import { SeasonState } from "redux/models/SeasonState";
import { ErrorState } from "redux/models/ErrorState";
import { PlayerState } from "redux/models/PlayerState";
import { UserState } from "redux/models/UserState";

export interface RootState {
  application: ApplicationState;
  auth: AuthState;
  scryfall: ScryfallState;
  seasons: SeasonState;
  errors: ErrorState;
  users: UserState;
  players: PlayerState;
  router: RouterState;
};
