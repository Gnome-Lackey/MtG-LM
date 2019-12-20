import service from "services/service";

import { SignUpFields } from "components/Hooks/useFormData/models/FormFields";
import { AuthResponse, ErrorResponse, LoginResponse } from "services/models/Responses";

import { AMAZON_AXT_HEADER, IDT, AMAZON_ID_HEADER, AXT } from "constants/session";
import {
  AUTH_CONFIRM,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_RESEND_CODE,
  AUTH_SIGN_UP,
  AUTH_VALIDATE
} from "constants/services";

export const signup = async (details: SignUpFields): Promise<AuthResponse> => {
  const response = await service.post(AUTH_SIGN_UP, details);

  const data = await response.body;

  return data as AuthResponse;
};

export const login = async (userName: string, password: string): Promise<LoginResponse> => {
  const headers = new Headers();

  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const body = { userName, password };

  const response = await service.post(AUTH_LOGIN, body, headers);

  const accessToken = response.headers.get(AMAZON_AXT_HEADER);
  const idToken = response.headers.get(AMAZON_ID_HEADER);

  if (accessToken && idToken) {
    sessionStorage.setItem(AXT, accessToken);
    sessionStorage.setItem(IDT, idToken);

    const data = response.body;

    return data as LoginResponse;
  }

  return {
    body: null,
    headers: null,
    error: { name: "unauthorized", message: "You are not authorized to access this endpoint." }
  };
};

export const logout = async (): Promise<AuthResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(AXT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.post(AUTH_LOGOUT, undefined, headers);

  sessionStorage.removeItem(AXT);
  sessionStorage.removeItem(IDT);

  const data = response.body;

  return data as AuthResponse;
};

export const confirm = async (
  userName: string,
  verificationCode: string
): Promise<AuthResponse> => {
  const response = await service.post(AUTH_CONFIRM, {
    userName,
    verificationCode
  });

  const data = response.body;

  return data as AuthResponse;
};

export const resendCode = async (userName: string): Promise<AuthResponse> => {
  const response = await service.post(AUTH_RESEND_CODE, {
    userName
  });

  const data = response.body;

  return data as AuthResponse;
};

export const validate = async (): Promise<AuthResponse> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(AXT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.post(AUTH_VALIDATE, undefined, headers);

  const data = response.body;

  return data as AuthResponse;
};
