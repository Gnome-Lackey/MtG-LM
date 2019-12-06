import service from "services/service";

import { MtglmServiceResponseBody } from "services/models/Service";

import { SCRYFALL_RANDOM_CARD, SCRYFALL_SETS } from "constants/services";

export const getCard = async (query: string): Promise<MtglmServiceResponseBody> => {
  const headers = new Headers();

  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const url = query ? `${SCRYFALL_RANDOM_CARD}?q=${query}` : SCRYFALL_RANDOM_CARD;

  const response = await service.get(url, headers);

  return await response.body;
};

export const getSets = async (): Promise<MtglmServiceResponseBody> => {
  const headers = new Headers();

  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const response = await service.get(SCRYFALL_SETS, headers);

  return await response.body;
};
