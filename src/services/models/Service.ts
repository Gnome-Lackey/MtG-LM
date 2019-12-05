export interface MtglmServiceResponseBody {
  [key: string]: any;
  status: number;
}

export interface MtglmServiceResponse {
  headers?: Headers;
  body: MtglmServiceResponseBody;
}
