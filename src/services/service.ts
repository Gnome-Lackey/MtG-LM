import { MtglmServiceResponse, ErrorResponse } from "services/models/Responses";
import { ServiceConfig, ServiceRequestConfig } from "./models/Service";

import { AXT, IDT } from "constants/session";
import {
  CODE_ERROR_UNAUTHORIZED,
  CODE_ERROR_NOT_FOUND,
  CODE_ERROR_INTERNAL_ERROR,
  TYPE_ERROR_UNAUTHORIZED,
  TYPE_ERROR_NOT_FOUND,
  TYPE_ERROR_INTERNAL_ERROR
} from "constants/errors";

export default class MTGLMService {
  private fetchData = async (
    uri: string,
    headers: Headers,
    options: ServiceRequestConfig
  ): Promise<MtglmServiceResponse> => {
    try {
      if (options.useToken) {
        const token = sessionStorage.getItem(options.useAccessToken ? AXT : IDT);

        headers.append("Authorization", token);
      }

      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      const config: RequestInit = { method: options.method, headers };

      if (options.body) config.body = options.body;
      if (options.useCredentials) config.credentials = "include";

      const response = await fetch(uri, config);
      const responseBody = await response.json();

      return {
        headers: response.headers,
        status: response.status,
        body: responseBody.data
      };
    } catch (err) {
      return {
        headers: new Headers({
          status: CODE_ERROR_INTERNAL_ERROR.toString()
        }),
        status: CODE_ERROR_INTERNAL_ERROR,
        body: {
          error: {
            message: "An unexpected error occurred. Please try again later."
          }
        } as ErrorResponse
      };
    }
  };

  validateResponse = (response: MtglmServiceResponse): MtglmServiceResponse => {
    const result = { ...response };

    if (response.status === CODE_ERROR_UNAUTHORIZED) {
      sessionStorage.removeItem(AXT);
      sessionStorage.removeItem(IDT);

      result.body = {
        error: {
          name: TYPE_ERROR_UNAUTHORIZED,
          message: "You are not authorized to access this resource."
        }
      };
    } else if (response.status === CODE_ERROR_NOT_FOUND) {
      result.body = {
        error: {
          name: TYPE_ERROR_NOT_FOUND,
          message: "The resource you are looking for does not exist."
        }
      };
    } else if (response.status === CODE_ERROR_INTERNAL_ERROR) {
      result.body = {
        error: {
          name: TYPE_ERROR_INTERNAL_ERROR,
          message: "An unexpected error occurred. Please try again later."
        }
      };
    }

    return result;
  };

  request = {
    post: async (uri: string, options: ServiceConfig): Promise<MtglmServiceResponse> => {
      const headers = new Headers();

      headers.append("Access-Control-Allow-Credentials", "true");

      return this.validateResponse(
        await this.fetchData(uri, headers, {
          method: "POST",
          body: JSON.stringify(options.body),
          useCredentials: true,
          useAccessToken: options.useAccessToken,
          useToken: !options.noAuthorizationHeader
        })
      );
    },
    put: async (uri: string, options: ServiceConfig): Promise<MtglmServiceResponse> => {
      const headers = new Headers();

      headers.append("Access-Control-Allow-Credentials", "true");

      return this.validateResponse(
        await this.fetchData(uri, headers, {
          method: "PUT",
          body: JSON.stringify(options.body),
          useCredentials: true,
          useAccessToken: options.useAccessToken,
          useToken: !options.noAuthorizationHeader
        })
      );
    },
    get: async (uri: string, options?: ServiceConfig): Promise<MtglmServiceResponse> => {
      const headers = new Headers();

      return this.validateResponse(
        await this.fetchData(uri, headers, {
          method: "GET",
          useToken: !options || !options.noAuthorizationHeader
        })
      );
    },
    remove: async (uri: string, options?: ServiceConfig): Promise<MtglmServiceResponse> => {
      const headers = new Headers();

      return this.validateResponse(
        await this.fetchData(uri, headers, {
          method: "DELETE",
          useToken: !options || !options.noAuthorizationHeader
        })
      );
    }
  };
}
