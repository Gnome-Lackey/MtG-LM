import service from "services/service";

import { SignUpFields } from "components/Hooks/useFormData/models/FormFields";
import { AuthResponse, LoginResponse } from "services/models/Responses";

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
  const response = await service.post(AUTH_SIGN_UP, { body: details });

  const data = await response.body;

  return data as AuthResponse;
};

export const login = async (userName: string, password: string): Promise<LoginResponse> => {
  const body = { userName, password };

  const response = await service.post(AUTH_LOGIN, { body });

  const accessToken = response.headers.get(AMAZON_AXT_HEADER);
  const idToken = response.headers.get(AMAZON_ID_HEADER);

  sessionStorage.setItem(AXT, accessToken);
  sessionStorage.setItem(IDT, idToken);

  const data = response.body;

  return data as LoginResponse;
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await service.post(AUTH_LOGOUT, {
    useAccessToken: true
  });

  sessionStorage.removeItem(AXT);
  sessionStorage.removeItem(IDT);

  const data = response.body;

  return data as AuthResponse;
};

export const confirm = async (
  userName: string,
  verificationCode: string
): Promise<AuthResponse> => {
  const body = {
    userName,
    verificationCode
  };

  const response = await service.post(AUTH_CONFIRM, { body });

  const data = response.body;

  return data as AuthResponse;
};

export const resendCode = async (userName: string): Promise<AuthResponse> => {
  const body = {
    userName
  };

  const response = await service.post(AUTH_RESEND_CODE, { body });

  const data = response.body;

  return data as AuthResponse;
};

export const validate = async (): Promise<AuthResponse> => {
  const response = await service.post(AUTH_VALIDATE, {
    useAccessToken: true
  });

  const data = response.body;

  return data as AuthResponse;
};
