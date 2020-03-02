import service from "services/service";

import * as matchMapper from "mappers/matches";

import { MatchResponse } from "services/models/Responses";
import { CreateMatchNode } from "services/models/Nodes";
import { MatchQueryParameters } from "services/models/QueryParams";

import { MATCH_BASE_URL } from "constants/services";

export const create = async (body: CreateMatchNode): Promise<MatchResponse> => {
  const response = await service.post(MATCH_BASE_URL, { body });

  return response.body as MatchResponse;
};

export const query = async (queryParams?: MatchQueryParameters): Promise<MatchResponse> => {
  const queryString = matchMapper.toSearchQueryString(queryParams);

  const url = queryString ? `${MATCH_BASE_URL}?${queryString}` : MATCH_BASE_URL;

  const response = await service.get(url);

  return response.body as MatchResponse;
};
