import service from "services/service";

import { MatchResponse } from "services/models/Responses";
import { CreateMatchNode } from "services/models/Nodes";

import { MATCH_BASE_URL } from "constants/services";

export const create = async (body: CreateMatchNode): Promise<MatchResponse> => {
  const response = await service.post(MATCH_BASE_URL, { body });

  return response.body as MatchResponse;
};
