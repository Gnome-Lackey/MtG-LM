import * as queryString from "query-string";

import service from "services/service";

import { PlayerResponse, PlayerDetailsResponse } from "services/models/Responses";
import { PlayerFilters } from "services/models/Filters";
import { CreatePlayerNode } from "services/models/Nodes";

import { PLAYER_BASE_URL, PLAYER_DETAILS_URL} from "constants/services";

export const create = async (body: CreatePlayerNode): Promise<PlayerResponse> => {
  const response = await service.post(PLAYER_BASE_URL, { body });

  return response.body as PlayerResponse;
};

export const update = async (id: string, body: any): Promise<PlayerDetailsResponse> => {
  const url = `${PLAYER_DETAILS_URL}/${id}`;

  const response = await service.post(url, { body });

  return response.body as PlayerDetailsResponse;
};

export const query = async (filters?: PlayerFilters): Promise<PlayerResponse> => {
  const url = filters ? `${PLAYER_BASE_URL}?${queryString.stringify(filters)}` : PLAYER_BASE_URL;

  const response = await service.get(url);

  return response.body as PlayerResponse;
};
