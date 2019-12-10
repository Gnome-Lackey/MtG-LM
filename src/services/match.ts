import service from "services/service";

import { MtglmServiceResponseBody } from "services/models/Service";

import { CreateMatchBody } from "models/Match";

import { MATCH_BASE_URL } from "constants/services";
import { IDT } from "constants/session";

export const create = async (body: CreateMatchBody): Promise<MtglmServiceResponseBody> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(IDT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.post(MATCH_BASE_URL, body, headers);

  return await response.body;
};
