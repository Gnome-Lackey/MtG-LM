import service from "services/service";

import { MatchResponse } from "services/models/Responses";

import { CreateMatchBody } from "models/Match";

import { MATCH_BASE_URL } from "constants/services";
import { IDT } from "constants/session";

export const create = async (body: CreateMatchBody): Promise<MatchResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.post(MATCH_BASE_URL, body, headers);

  const data = await response.body;

  return data as MatchResponse;
};
