import { ScryfallCard } from "models/Scryfall";
import { Card } from "models/Card";

export const toCard = (data: ScryfallCard): Card => ({
  id: data.id,
  name: data.name,
  image: data.images.normal,
  type: data.type,
  colors: data.colors
});
