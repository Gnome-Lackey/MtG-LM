import { ScryfallCard, ScryfallSet } from "models/Scryfall";
import { Card } from "models/Card";
import { Set } from "models/Set";
import { MtglmServiceResponseBody } from "services/models/Service";

export const toCard = (data: ScryfallCard): Card => ({
  id: data.id,
  name: data.name,
  image: data.imageUris.normal,
  type: data.type,
  colors: data.colors
});

export const toSet = (data: ScryfallSet): Set => ({
  id: data.id,
  name: data.name,
  releasedOn: data.releasedOn,
  cardCount: data.cardCount,
  code: data.code
});

export const toScryfallCard = (result: MtglmServiceResponseBody): ScryfallCard => ({
  id: result.data.id,
  name: result.data.name,
  colors: result.data.colors,
  type: result.data.type_line,
  imageUris: result.data.image_uris
});

export const toScryfallSet = (result: MtglmServiceResponseBody): ScryfallSet => ({
  id: result.data.id,
  name: result.data.name,
  releasedOn: result.data.released_at,
  cardCount: result.data.card_count,
  code: result.data.code
});

export const toCardQueryString = (color: string, type: string): string =>
  `c=${color}+lang=en+t=${type}+border=black+-t=legendary+f=modern`;
