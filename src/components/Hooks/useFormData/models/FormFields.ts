import { Card } from "models/Card";
import { TypeAheadOption } from "components/Form/TypeAhead/models/TypeAheadOption";

export interface ConfirmFields {
  code: string;
}

export interface GettingStartedFields {
  epithet: string;
  favoriteCard: Card;
}

export interface LoginFields {
  password: string;
  userName: string;
}

export interface RecordMatchFields {
  playerA: TypeAheadOption;
  playerAWins: number;
  playerALosses: number;
  playerB: TypeAheadOption;
  playerBWins: number;
  playerBLosses: number;
}

export interface SignUpFields {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
}
