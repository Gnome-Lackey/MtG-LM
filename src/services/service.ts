import { MtglmServiceResponse } from "services/models/Service";

const fetchData = async (uri: string, options: RequestInit): Promise<MtglmServiceResponse> => {
  try {
    const response = await fetch(uri, options);
    const body = await response.json();

    return {
      headers: response.headers,
      body: {
        status: response.status,
        ...body
      }
    };
  } catch (err) {
    return {
      headers: new Headers({
        status: "500"
      }),
      body: {
        status: 500,
        data: {
          error: "An unexpected error occurred. Please try again later."
        }
      }
    };
  }
};

const post = async (uri: string, body: object, headers?: Headers): Promise<MtglmServiceResponse> =>
  await fetchData(uri, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
    credentials: "include"
  });

const put = async (uri: string, body: object, headers?: Headers): Promise<MtglmServiceResponse> =>
  await fetchData(uri, {
    method: "PUT",
    body: JSON.stringify(body),
    headers,
    credentials: "include"
  });

const get = async (uri: string, headers?: Headers): Promise<MtglmServiceResponse> =>
  await fetchData(uri, {
    method: "GET",
    headers
  });

const remove = async (uri: string, headers?: Headers): Promise<MtglmServiceResponse> =>
  await fetchData(uri, {
    method: "DELETE",
    headers
  });

export default { post, put, get, remove };
