import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import { Card } from "models/Card";

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
  playerB: TypeAheadOption;
  playerAWins: number;
  playerBWins: number;
}

export interface SignUpFields {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
}
