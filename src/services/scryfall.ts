import service from "services/service";

import { MtglmServiceResponseBody } from "services/models/Service";

import { SCRYFALL_RANDOM_CARD, SCRYFALL_SETS } from "constants/services";
import { IDT } from "constants/session";

export const getCard = async (query: string): Promise<MtglmServiceResponseBody> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const url = query ? `${SCRYFALL_RANDOM_CARD}?${query}` : SCRYFALL_RANDOM_CARD;

  const response = await service.get(url, headers);

  return await response.body;
};

export const getSet = async (code: string): Promise<MtglmServiceResponseBody> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.get(`${SCRYFALL_SETS}/${code}`, headers);

  return await response.body;
};
