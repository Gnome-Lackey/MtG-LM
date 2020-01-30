import service from "services/service";

import { MatchResponse } from "services/models/Responses";

import { CreateMatchBody } from "models/Match";

import { MATCH_BASE_URL } from "constants/services";

export const create = async (body: CreateMatchBody): Promise<MatchResponse> => {
  const response = await service.post(MATCH_BASE_URL, { body });

  return response.body as MatchResponse;
};
