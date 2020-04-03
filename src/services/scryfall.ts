import service from "services/service";

import { ScryfallCardResponse, ScryfallSetResponse } from "services/models/Responses";

import { DynamicStringMap } from "models/Dynamics";

const environment: string = process.env.ENV;

export default class ScryfallService {
  private scryfallUrlMap: DynamicStringMap = {
    local: "http://localhost:9001/local",
    dev: "https://bt45yjuqmh.execute-api.us-east-1.amazonaws.com/dev",
    qa: "https://fvgfu582w6.execute-api.us-east-1.amazonaws.com/qa"
  };

  private baseUrl: string = this.scryfallUrlMap[environment];

  private fetchCardsUrl = `${this.baseUrl}/cards`;
  private fetchRandomCardUrl = `${this.baseUrl}/cards/random`;
  private fetchSetsUrl = `${this.baseUrl}/sets`;

  async getCard(id: string): Promise<ScryfallCardResponse> {
    const url = `${this.fetchCardsUrl}/${id}`;

    const response = await service.get(url);

    return response.body as ScryfallCardResponse;
  }

  async queryCard(query: string): Promise<ScryfallCardResponse[]> {
    const url = query ? `${this.fetchCardsUrl}?${query}` : this.fetchCardsUrl;

    const response = await service.get(url);

    return response.body as ScryfallCardResponse[];
  }

  async getRandomCard(query: string): Promise<ScryfallCardResponse> {
    const url = query ? `${this.fetchRandomCardUrl}?${query}` : this.fetchRandomCardUrl;

    const response = await service.get(url);

    return response.body as ScryfallCardResponse;
  }

  async getSet(code: string): Promise<ScryfallSetResponse> {
    const url = `${this.fetchSetsUrl}/${code}`;

    const response = await service.get(url);

    return response.body as ScryfallSetResponse;
  }
}
