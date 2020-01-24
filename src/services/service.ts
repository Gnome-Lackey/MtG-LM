import { MtglmServiceResponse, ErrorResponse } from "services/models/Responses";

import { AXT, IDT } from "constants/session";

import {
  CODE_ERROR_UNAUTHORIZED,
  CODE_ERROR_NOT_FOUND,
  CODE_ERROR_INTERNAL_ERROR,
  TYPE_ERROR_UNAUTHORIZED,
  TYPE_ERROR_NOT_FOUND,
  TYPE_ERROR_INTERNAL_ERROR
} from "constants/errors";

async function fetchData(uri: string, options: RequestInit): Promise<MtglmServiceResponse> {
  try {
    const response = await fetch(uri, options);
    const body = await response.json();

    const { data } = body;

    return {
      headers: response.headers,
      status: response.status,
      body: data
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
}

const validateResponse = (response: MtglmServiceResponse): MtglmServiceResponse => {
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

const post = async (uri: string, body: object, headers?: Headers): Promise<MtglmServiceResponse> =>
  validateResponse(
    await fetchData(uri, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
      credentials: "include"
    })
  );

const put = async (uri: string, body: object, headers?: Headers): Promise<MtglmServiceResponse> =>
  validateResponse(
    await fetchData(uri, {
      method: "PUT",
      body: JSON.stringify(body),
      headers,
      credentials: "include"
    })
  );

const get = async (uri: string, headers?: Headers): Promise<MtglmServiceResponse> =>
  validateResponse(
    await fetchData(uri, {
      method: "GET",
      headers
    })
  );

const remove = async (uri: string, headers?: Headers): Promise<MtglmServiceResponse> =>
  validateResponse(
    await fetchData(uri, {
      method: "DELETE",
      headers
    })
  );

export default { post, put, get, remove };
