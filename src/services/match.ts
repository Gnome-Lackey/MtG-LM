import MTGLMService from "services/service";

import MatchMapper from "mappers/matches";

import { MatchResponse } from "services/models/Responses";
import { CreateMatchNode } from "services/models/Nodes";
import { MatchQueryParameters } from "services/models/QueryParams";

import { DynamicStringMap } from "models/Dynamics";

const environment: string = process.env.ENV;

export default class MatchService extends MTGLMService {
  private mapper = new MatchMapper();

  private matchUrlMap: DynamicStringMap = {
    local: "http://localhost:9001/local/matches",
    dev: "https://sqjqupsqdh.execute-api.us-east-1.amazonaws.com/dev/matches",
    qa: "https://tfflsi784b.execute-api.us-east-1.amazonaws.com/qa/matches"
  };

  private baseUrl: string = this.matchUrlMap[environment];

  private buildQueryString = (queryParams: MatchQueryParameters): string => {
    const queryString = this.mapper.toSearchQueryString(queryParams);

    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  };

  create = async (body: CreateMatchNode): Promise<MatchResponse> => {
    const response = await this.request.post(this.baseUrl, { body });

    return response.body as MatchResponse;
  };

  query = async (queryParams?: MatchQueryParameters): Promise<MatchResponse[]> => {
    const url = this.buildQueryString(queryParams);

    const response = await this.request.get(url);

    return response.body as MatchResponse[];
  };
}
