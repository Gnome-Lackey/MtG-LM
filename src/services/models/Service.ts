export interface ServiceConfig {
  body?: object;
  useAccessToken?: boolean;
}

export interface ServiceRequestConfig {
  method: string;
  body?: string;
  useCredentials?: boolean;
  useAccessToken?: boolean;
}
