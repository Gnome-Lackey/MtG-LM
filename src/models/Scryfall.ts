export interface ScryfallCard {
  id: string;
  name: string;
  colors: string[];
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  }
}
