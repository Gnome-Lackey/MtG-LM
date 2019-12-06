import { Card } from "models/Card";
import { Set } from "models/Set";

export interface ScryfallState {
  cards?: Card[];
  searching?: boolean;
  set?: Set;
};
