export interface Card {
  id: string;
  name: string;
  language: string;
  releasedOn: string;
  image: string;
  costs: {
    mana: string;
    converted: number;
  };
  type: string;
  subtype: string;
  colors: string[];
  identity: string[];
  set: {
    code: string;
    name: string;
  };
  rarity: string;
}

export interface Set {
  id: string;
  code: string;
  name: string;
  releasedOn: string;
  cardCount: number;
}
