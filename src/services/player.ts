import * as queryString from "query-string";

import service from "services/service";

import { PlayerResponse } from "services/models/Responses";
import { PlayerFilters } from "services/models/Filters";
import { CreatePlayerNode } from "services/models/Nodes";

import { PLAYER_BASE_URL } from "constants/services";
import { IDT } from "constants/session";

export const create = async (body: CreatePlayerNode): Promise<PlayerResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.post(PLAYER_BASE_URL, body, headers);

  const data = await response.body;

  return data as PlayerResponse;
};

export const query = async (filters?: PlayerFilters): Promise<PlayerResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const url = filters ? `${PLAYER_BASE_URL}?${queryString.stringify(filters)}` : PLAYER_BASE_URL;

  const response = await service.get(url, headers);

  const data = await response.body;

  return data as PlayerResponse;
};
