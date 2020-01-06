import { Card, Set } from "models/Scryfall";

export interface ScryfallState {
  cards?: Card[];
  searching?: boolean;
  setSearchResults?: Set[];
};
