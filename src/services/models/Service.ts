export interface ServiceConfig {
  body?: object;
  useAccessToken?: boolean;
  noAuthorizationHeader?: boolean;
}

export interface ServiceRequestConfig {
  method: string;
  body?: string;
  useCredentials?: boolean;
  useAccessToken?: boolean;
  useToken?: boolean;
}
