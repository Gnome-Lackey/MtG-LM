import service from "services/service";

import { ScryfallCardResponse, ScryfallSetResponse } from "services/models/Responses";

import { SCRYFALL_RANDOM_CARD, SCRYFALL_SETS } from "constants/services";
import { IDT } from "constants/session";

export const getCard = async (query: string): Promise<ScryfallCardResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const url = query ? `${SCRYFALL_RANDOM_CARD}?${query}` : SCRYFALL_RANDOM_CARD;

  const response = await service.get(url, headers);

  const data = await response.body;

  return data as ScryfallCardResponse;
};

export const getSet = async (code: string): Promise<ScryfallSetResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.get(`${SCRYFALL_SETS}/${code}`, headers);

  const data = await response.body;

  return data as ScryfallSetResponse;
};
