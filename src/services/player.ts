import service from "services/service";

import PlayerMapper from "mappers/players";

import { PlayerResponse, PlayerRoleResponse } from "services/models/Responses";
import { PlayerQueryParameters } from "services/models/QueryParams";
import { CreatePlayerNode, UpdatePlayerRoleNode } from "services/models/Nodes";
import { DynamicStringMap } from "models/Dynamics";

const environment: string = process.env.ENV;

export default class PlayerService {
  private playerUrlMap: DynamicStringMap = {
    local: "http://localhost:9001/local/players",
    dev: "https://dsbk2r8c22.execute-api.us-east-1.amazonaws.com/dev/players",
    qa: "https://zs66h3djm8.execute-api.us-east-1.amazonaws.com/qa/players",
  };

  private baseUrl: string = this.playerUrlMap[environment];

  private playerMapper = new PlayerMapper();

  private buildQueryString(queryParams: PlayerQueryParameters): string {
    const queryString = this.playerMapper.toSearchQueryString(queryParams);

    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }

  async create(body: CreatePlayerNode): Promise<PlayerResponse> {
    const response = await service.post(this.baseUrl, { body });

    return response.body as PlayerResponse;
  }

  async updateRole(id: string, body: UpdatePlayerRoleNode): Promise<PlayerRoleResponse> {
    const url = `${this.baseUrl}/${id}/roles`;

    const response = await service.put(url, { body });

    return response.body as PlayerRoleResponse;
  }

  async getRoles(): Promise<PlayerRoleResponse[]> {
    const response = await service.get(`${this.baseUrl}/roles`);

    return response.body as PlayerRoleResponse[];
  }

  async query(queryParams?: PlayerQueryParameters): Promise<PlayerResponse[]> {
    const url = this.buildQueryString(queryParams);

    const response = await service.get(url);

    return response.body as PlayerResponse[];
  }
}
