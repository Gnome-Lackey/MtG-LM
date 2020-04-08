import * as queryString from "query-string";

import MTGLMService from "services/service";

import { SeasonDetailsResponse } from "services/models/Responses";
import { SeasonQueryParameters } from "services/models/QueryParams";
import { CreateSeasonNode, UpdateSeasonNode } from "services/models/Nodes";
import { DynamicStringMap } from "models/Dynamics";

const environment: string = process.env.ENV;

export default class SeasonService extends MTGLMService {
  private seasonUrlMap: DynamicStringMap = {
    local: "http://localhost:9001/local/seasons",
    dev: "https://qmhjqb5njl.execute-api.us-east-1.amazonaws.com/dev/seasons",
    qa: "https://mvd9vvkebg.execute-api.us-east-1.amazonaws.com/qa/seasons"
  };

  private baseUrl: string = this.seasonUrlMap[environment];

  private fetchDetails = `${this.baseUrl}/details`;
  private fetchCurrentDetails = `${this.baseUrl}/details/current`;

  create = async (body: CreateSeasonNode): Promise<SeasonDetailsResponse> => {
    const response = await this.request.post(this.baseUrl, { body });

    return response.body as SeasonDetailsResponse;
  };

  update = async (id: string, body: UpdateSeasonNode): Promise<SeasonDetailsResponse> => {
    const url = `${this.baseUrl}/${id}`;

    const response = await this.request.put(url, { body });

    return response.body as SeasonDetailsResponse;
  };

  get = async (id: string): Promise<SeasonDetailsResponse> => {
    const url = `${this.fetchDetails}/${id}`;

    const response = await this.request.get(url);

    return response.body as SeasonDetailsResponse;
  };

  getCurrent = async (): Promise<SeasonDetailsResponse> => {
    const response = await this.request.get(this.fetchCurrentDetails);

    return response.body as SeasonDetailsResponse;
  };

  getAll = async (): Promise<SeasonDetailsResponse[]> => {
    const response = await this.request.get(this.fetchDetails);

    return response.body as SeasonDetailsResponse[];
  };

  query = async (filters?: SeasonQueryParameters): Promise<SeasonDetailsResponse[]> => {
    const url = filters ? `${this.fetchDetails}?${queryString.stringify(filters)}` : this.baseUrl;

    const response = await this.request.get(url);

    return response.body as SeasonDetailsResponse[];
  };
}
