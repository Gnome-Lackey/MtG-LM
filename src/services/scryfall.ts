import service from "services/service";

import { ScryfallCardResponse, ScryfallSetResponse } from "services/models/Responses";

import { SCRYFALL_RANDOM_CARD, SCRYFALL_SETS, SCRYFALL_CARDS } from "constants/services";

export const fetchCard = async (url: string): Promise<ScryfallCardResponse> => {
  const response = await service.get(url);

  return response.body as ScryfallCardResponse;
};

export const getCard = async (id: string): Promise<ScryfallCardResponse> => {
  const url = `${SCRYFALL_CARDS}/${id}`;

  return fetchCard(url);
};

export const queryCard = async (query: string): Promise<ScryfallCardResponse> => {
  const url = query ? `${SCRYFALL_CARDS}?${query}` : SCRYFALL_CARDS;

  return fetchCard(url);
};

export const getRandomCard = async (query: string): Promise<ScryfallCardResponse> => {
  const url = query ? `${SCRYFALL_RANDOM_CARD}?${query}` : SCRYFALL_RANDOM_CARD;

  return fetchCard(url);
};

export const getSet = async (code: string): Promise<ScryfallSetResponse> => {
  const response = await service.get(`${SCRYFALL_SETS}/${code}`);

  return response.body as ScryfallSetResponse;
};
