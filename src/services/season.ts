import * as queryString from "query-string";

import service from "services/service";

import { SeasonResponse, SeasonMetadataResponse } from "services/models/Responses";

import { SeasonFilters } from "services/models/Filters";
import { CreateSeasonNode, UpdateSeasonNode } from "./models/Nodes";

import {
  SEASON_BASE_URL,
  SEASON_GET_CURRENT_DETAILS,
  SEASON_GET_DETAILS
} from "constants/services";

export const create = async (body: CreateSeasonNode): Promise<SeasonResponse> => {
  const response = await service.post(SEASON_BASE_URL, { body });

  return response.body as SeasonResponse;
};

export const update = async (id: string, body: UpdateSeasonNode): Promise<SeasonResponse> => {
  const url = `${SEASON_BASE_URL}/${id}`;

  const response = await service.put(url, { body });

  return response.body as SeasonResponse;
};

export const get = async (id: string): Promise<SeasonResponse> => {
  const url = `${SEASON_GET_DETAILS}/${id}`;

  const response = await service.get(url);

  return response.body as SeasonResponse;
};

export const getCurrent = async (): Promise<SeasonResponse> => {
  const response = await service.get(SEASON_GET_CURRENT_DETAILS);

  return response.body as SeasonResponse;
};

export const getMetadata = async (id: string): Promise<SeasonMetadataResponse> => {
  const url = `${SEASON_BASE_URL}/${id}/metadata`;

  const response = await service.get(url);

  return response.body as SeasonMetadataResponse;
};

export const getAll = async (): Promise<SeasonResponse> => {
  const response = await service.get(SEASON_GET_DETAILS);

  return response.body as SeasonResponse;
};

export const query = async (filters?: SeasonFilters): Promise<SeasonResponse> => {
  const url = filters ? `${SEASON_GET_DETAILS}?${queryString.stringify(filters)}` : SEASON_BASE_URL;

  const response = await service.get(url);

  return response.body as SeasonResponse;
};
