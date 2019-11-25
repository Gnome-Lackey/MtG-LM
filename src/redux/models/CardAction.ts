import { Card } from "models/Card";

export interface CardAction {
  type: string;
  payload?: {
    cards?: Card[]
  };
};
