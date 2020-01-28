import * as queryString from "query-string";

import service from "services/service";

import { SeasonDetailsResponse } from "services/models/Responses";

import { SeasonFilters } from "services/models/Filters";
import { CreateSeasonNode, UpdateSeasonNode } from "./models/Nodes";

import { IDT } from "constants/session";
import {
  SEASON_BASE_URL,
  SEASON_GET_CURRENT_DETAILS,
  SEASON_GET_DETAILS
} from "constants/services";

export const create = async (body: CreateSeasonNode): Promise<SeasonDetailsResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.post(SEASON_BASE_URL, body, headers);

  const data = await response.body;

  return data as SeasonDetailsResponse;
};

export const update = async (
  id: string,
  body: UpdateSeasonNode
): Promise<SeasonDetailsResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const url = `${SEASON_BASE_URL}/${id}`;

  const response = await service.put(url, body, headers);

  const data = await response.body;

  return data as SeasonDetailsResponse;
};

export const get = async (id: string): Promise<SeasonDetailsResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const url = `${SEASON_GET_DETAILS}/${id}`;

  const response = await service.get(url, headers);

  const data = await response.body;

  return data as SeasonDetailsResponse;
};

export const getCurrent = async (): Promise<SeasonDetailsResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const response = await service.get(SEASON_GET_CURRENT_DETAILS, headers);

  const data = await response.body;

  return data as SeasonDetailsResponse;
};

export const getAllDetails = async (): Promise<SeasonDetailsResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const response = await service.get(SEASON_GET_DETAILS, headers);

  const data = await response.body;

  return data as SeasonDetailsResponse;
};

export const query = async (filters?: SeasonFilters): Promise<SeasonDetailsResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const url = filters
    ? `${SEASON_GET_DETAILS}?${queryString.stringify(filters)}`
    : SEASON_BASE_URL;

  const response = await service.get(url, headers);

  const data = await response.body;

  return data as SeasonDetailsResponse;
};
