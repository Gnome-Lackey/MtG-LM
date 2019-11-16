import { User } from "models/User";

export interface UpdateUserAction {
  type: string;
  payload?: {
    user?: User;
  };
}
