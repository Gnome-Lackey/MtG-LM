export interface ScryfallCardImages {
  [key: string]: string;
  normal: string;
};

export interface ScryfallCard {
  id: string;
  name: string;
  colors: string[];
  type: string;
  images: ScryfallCardImages;
}
