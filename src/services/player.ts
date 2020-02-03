import * as queryString from "query-string";

import service from "services/service";

import { PlayerResponse, PlayerRoleResponse } from "services/models/Responses";
import { PlayerFilters } from "services/models/Filters";
import { CreatePlayerNode, UpdatePlayerRoleNode } from "services/models/Nodes";

import { PLAYER_BASE_URL } from "constants/services";

export const create = async (body: CreatePlayerNode): Promise<PlayerResponse> => {
  const response = await service.post(PLAYER_BASE_URL, { body });

  return response.body as PlayerResponse;
};

export const updateRole = async (id: string, body: UpdatePlayerRoleNode): Promise<PlayerRoleResponse> => {
  const url = `${PLAYER_BASE_URL}/${id}/roles`;

  const response = await service.put(url, { body });

  return response.body as PlayerRoleResponse;
};

export const getRoles = async (): Promise<PlayerRoleResponse> => {
  const response = await service.get(`${PLAYER_BASE_URL}/roles`);
  
  return response.body as PlayerRoleResponse;
};

export const query = async (filters?: PlayerFilters): Promise<PlayerResponse> => {
  const url = filters ? `${PLAYER_BASE_URL}?${queryString.stringify(filters)}` : PLAYER_BASE_URL;

  const response = await service.get(url);

  return response.body as PlayerResponse;
};
