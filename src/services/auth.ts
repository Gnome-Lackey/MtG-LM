import service from "services/service";

import { SignUpFields } from "components/Hooks/useFormData/models/FormFields";
import { MtglmServiceResponseBody } from "services/models/Service";

import { AMAZON_AXT_HEADER, IDT, AMAZON_ID_HEADER, AXT } from "constants/session";
import {
  AUTH_CONFIRM,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_RESEND_CODE,
  AUTH_SIGN_UP,
  AUTH_VALIDATE
} from "constants/services";
import { ROUTES } from "constants/routes";

export const signup = async (details: SignUpFields): Promise<MtglmServiceResponseBody> => {
  const response = await service.post(AUTH_SIGN_UP, details);

  return response.body;
};

export const login = async (
  userName: string,
  password: string
): Promise<MtglmServiceResponseBody> => {
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
  } else {
    window.location.href = ROUTES.ROOT;
  }

  return response.body;
};

export const logout = async (): Promise<MtglmServiceResponseBody> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(AXT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.post(AUTH_LOGOUT, undefined, headers);

  sessionStorage.removeItem(AXT);
  sessionStorage.removeItem(IDT);

  return response.body;
};

export const confirm = async (
  userName: string,
  verificationCode: string
): Promise<MtglmServiceResponseBody> => {
  const response = await service.post(AUTH_CONFIRM, {
    userName,
    verificationCode
  });

  return await response.body;
};

export const resendCode = async (userName: string): Promise<MtglmServiceResponseBody> => {
  const response = await service.post(AUTH_RESEND_CODE, {
    userName
  });

  return await response.body;
};

export const validate = async (): Promise<MtglmServiceResponseBody> => {
  const headers = new Headers();

  const token = sessionStorage.getItem(AXT);

  headers.append("Authorization", token);
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Credentials", "true");

  const response = await service.post(AUTH_VALIDATE, undefined, headers);

  return await response.body;
};
