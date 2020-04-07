import service from "services/service";

import MatchMapper from "mappers/matches";

import { MatchResponse } from "services/models/Responses";
import { CreateMatchNode } from "services/models/Nodes";
import { MatchQueryParameters } from "services/models/QueryParams";

import { DynamicStringMap } from "models/Dynamics";

const environment: string = process.env.ENV;

const matchMapper = new MatchMapper();

export default class MatchService {
  private matchUrlMap: DynamicStringMap = {
    local: "http://localhost:9001/local/matches",
    dev: "https://sqjqupsqdh.execute-api.us-east-1.amazonaws.com/dev/matches",
    qa: "https://vu62zw4lj6.execute-api.us-east-1.amazonaws.com/qa/matches",
  };

  private baseUrl: string = this.matchUrlMap[environment];

  private buildQueryString(queryParams: MatchQueryParameters): string {
    const queryString = matchMapper.toSearchQueryString(queryParams);

    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }

  async create(body: CreateMatchNode): Promise<MatchResponse> {
    const response = await service.post(this.baseUrl, { body });

    return response.body as MatchResponse;
  }

  async query(queryParams?: MatchQueryParameters): Promise<MatchResponse[]> {
    const url = this.buildQueryString(queryParams);

    const response = await service.get(url);

    return response.body as MatchResponse[];
  }
}
