import service from "services/service";

import { ScryfallCardResponse, ScryfallSetResponse } from "services/models/Responses";

import { SCRYFALL_RANDOM_CARD, SCRYFALL_SETS, SCRYFALL_CARDS } from "constants/services";

export const getCard = async (id: string): Promise<ScryfallCardResponse> => {
  const url = `${SCRYFALL_CARDS}/${id}`;

  const response = await service.get(url);

  return response.body as ScryfallCardResponse;
};

export const queryCard = async (query: string): Promise<ScryfallCardResponse[]> => {
  const url = query ? `${SCRYFALL_CARDS}?${query}` : SCRYFALL_CARDS;

  const response = await service.get(url);

  return response.body as ScryfallCardResponse[];
};

export const getRandomCard = async (query: string): Promise<ScryfallCardResponse> => {
  const url = query ? `${SCRYFALL_RANDOM_CARD}?${query}` : SCRYFALL_RANDOM_CARD;

  const response = await service.get(url);

  return response.body as ScryfallCardResponse;
};

export const getSet = async (code: string): Promise<ScryfallSetResponse> => {
  const url = `${SCRYFALL_SETS}/${code}`;

  const response = await service.get(url);

  return response.body as ScryfallSetResponse;
};
