import { User } from "models/User";

export interface AuthAction {
  type: string;
  payload?: {
    user?: User;
  };
};
