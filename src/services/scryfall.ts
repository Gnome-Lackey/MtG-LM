import MTGLMService from "services/service";

import { ScryfallCardResponse, ScryfallSetResponse } from "services/models/Responses";

import { DynamicStringMap } from "models/Dynamics";

const environment: string = process.env.ENV;

export default class ScryfallService extends MTGLMService {
  private scryfallUrlMap: DynamicStringMap = {
    local: "http://localhost:9001/local",
    dev: "https://bt45yjuqmh.execute-api.us-east-1.amazonaws.com/dev",
    qa: "https://fvgfu582w6.execute-api.us-east-1.amazonaws.com/qa"
  };

  private baseUrl: string = this.scryfallUrlMap[environment];

  private fetchCardsUrl = `${this.baseUrl}/cards`;
  private fetchRandomCardUrl = `${this.baseUrl}/cards/random`;
  private fetchSetsUrl = `${this.baseUrl}/sets`;

  getCard = async (id: string): Promise<ScryfallCardResponse> => {
    const url = `${this.fetchCardsUrl}/${id}`;

    const response = await this.request.get(url);

    return response.body as ScryfallCardResponse;
  };

  queryCard = async (query: string): Promise<ScryfallCardResponse[]> => {
    const url = query ? `${this.fetchCardsUrl}?${query}` : this.fetchCardsUrl;

    const response = await this.request.get(url);

    return response.body as ScryfallCardResponse[];
  };

  getRandomCard = async (query: string): Promise<ScryfallCardResponse> => {
    const url = query ? `${this.fetchRandomCardUrl}?${query}` : this.fetchRandomCardUrl;

    const response = await this.request.get(url);

    return response.body as ScryfallCardResponse;
  };

  getSet = async (code: string): Promise<ScryfallSetResponse> => {
    const url = `${this.fetchSetsUrl}/${code}`;

    const response = await this.request.get(url);

    return response.body as ScryfallSetResponse;
  };
}
