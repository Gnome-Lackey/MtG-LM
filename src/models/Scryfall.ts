export interface ScryfallCard {
  id: string;
  name: string;
  colors: string[];
  type: string;
  imageUris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
}

export interface ScryfallSet {
  id: string;
  code: string;
  name: string;
  releasedOn: string;
  cardCount: number;
}
