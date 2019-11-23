import { ScryfallCard } from "models/Scryfall";
import { Card } from "models/Card";

export const toCard = (data: ScryfallCard): Card => ({
  id: data.id,
  name: data.name,
  image: data.image_uris.normal,
  colors: data.colors
});
