export interface MtglmServiceResponseBody {
  status: number;
  data?: any;
}

export interface MtglmServiceResponse {
  headers?: Headers;
  body: MtglmServiceResponseBody;
}
