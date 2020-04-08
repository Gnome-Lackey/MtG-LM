import { Card, Set } from "models/Scryfall";

export interface ScryfallAction {
  type: string;
  payload?: {
    cards?: Card[];
    searching?: boolean;
    sets?: Set[];
  };
}
