import { RouterState } from "connected-react-router";

import { ApplicationState } from "redux/models/ApplicationState";
import { AuthState } from "redux/models/AuthState";
import { ErrorState } from "redux/models/ErrorState";
import { UserState } from "redux/models/UserState";

export interface RootState {
  application: ApplicationState;
  auth: AuthState;
  errors: ErrorState;
  users: UserState;
  router: RouterState;
};
