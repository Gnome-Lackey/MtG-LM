import * as queryString from "query-string";

import service from "services/service";

import { PlayerResponse } from "services/models/Responses";
import { PlayerFilters } from "services/models/Filters";
import { CreatePlayerNode } from "services/models/Nodes";

import { PLAYER_BASE_URL } from "constants/services";

export const create = async (body: CreatePlayerNode): Promise<PlayerResponse> => {
  const response = await service.post(PLAYER_BASE_URL, { body });

  return response.body as PlayerResponse;
};

export const query = async (filters?: PlayerFilters): Promise<PlayerResponse> => {
  const url = filters ? `${PLAYER_BASE_URL}?${queryString.stringify(filters)}` : PLAYER_BASE_URL;

  const response = await service.get(url);

  return response.body as PlayerResponse;
};
