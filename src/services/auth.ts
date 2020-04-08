import MTGLMService from "services/service";

import { SignUpFields } from "components/Hooks/useFormData/models/FormFields";
import { AuthResponse, LoginResponse } from "services/models/Responses";
import { DynamicStringMap } from "models/Dynamics";

import { AMAZON_AXT_HEADER, IDT, AMAZON_ID_HEADER, AXT } from "constants/session";

const environment: string = process.env.ENV;

export default class AuthService extends MTGLMService {
  private authUrlMap: DynamicStringMap = {
    local: "http://localhost:9001/local/auth",
    dev: "https://7isu1ozial.execute-api.us-east-1.amazonaws.com/dev/auth",
    qa: "https://xmtndwqidj.execute-api.us-east-1.amazonaws.com/qa/auth"
  };

  private baseUrl: string = this.authUrlMap[environment];

  private loginUrl = `${this.baseUrl}/login`;
  private logoutUrl = `${this.baseUrl}/logout`;
  private confirmUrl = `${this.baseUrl}/confirm`;
  private resendCodeUrl = `${this.baseUrl}/resend_code`;
  private signUpUrl = `${this.baseUrl}/signup`;
  private validateUrl = `${this.baseUrl}/validate`;

  signup = async (details: SignUpFields): Promise<AuthResponse> => {
    const response = await this.request.post(this.signUpUrl, {
      body: details,
      noAuthorizationHeader: true
    });

    return response.body as AuthResponse;
  };

  login = async (userName: string, password: string): Promise<LoginResponse> => {
    const body = { userName, password };

    const response = await this.request.post(this.loginUrl, { body, noAuthorizationHeader: true });

    const accessToken = response.headers.get(AMAZON_AXT_HEADER);
    const idToken = response.headers.get(AMAZON_ID_HEADER);

    sessionStorage.setItem(AXT, accessToken);
    sessionStorage.setItem(IDT, idToken);

    const data = response.body;

    return data as LoginResponse;
  };

  logout = async (): Promise<AuthResponse> => {
    const response = await this.request.post(this.logoutUrl, {
      useAccessToken: true
    });

    sessionStorage.removeItem(AXT);
    sessionStorage.removeItem(IDT);

    return response.body as AuthResponse;
  };

  confirm = async (userName: string, verificationCode: string): Promise<AuthResponse> => {
    const body = {
      userName,
      verificationCode
    };

    const response = await this.request.post(this.confirmUrl, {
      body,
      noAuthorizationHeader: true
    });

    return response.body as AuthResponse;
  };

  resendCode = async (userName: string): Promise<AuthResponse> => {
    const body = {
      userName
    };

    const response = await this.request.post(this.resendCodeUrl, {
      body,
      noAuthorizationHeader: true
    });

    return response.body as AuthResponse;
  };

  validate = async (): Promise<AuthResponse> => {
    const response = await this.request.post(this.validateUrl, {
      useAccessToken: true
    });

    return response.body as AuthResponse;
  };
}
