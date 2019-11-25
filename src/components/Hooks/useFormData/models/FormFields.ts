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

export interface SignUpFields {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
}
