import { Card } from "models/Card";
import { Set } from "models/Set";

export interface ScryfallAction {
  type: string;
  payload?: {
    cards?: Card[];
    searching?: boolean;
    sets?: Set[];
  };
};
