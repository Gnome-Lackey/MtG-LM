import service from "services/service";

import { SignUpFields } from "components/Hooks/useFormData/models/FormFields";
import { AuthResponse, LoginResponse } from "services/models/Responses";
import { DynamicStringMap } from "models/Dynamics";

import { AMAZON_AXT_HEADER, IDT, AMAZON_ID_HEADER, AXT } from "constants/session";

const environment: string = process.env.ENV;

export default class AuthService {
  private authUrlMap: DynamicStringMap = {
    local: "http://localhost:9001/local/auth",
    dev: "https://7isu1ozial.execute-api.us-east-1.amazonaws.com/dev/auth",
    qa: "https://wm2farj3t2.execute-api.us-east-1.amazonaws.com/qa/auth"
  };

  private baseUrl: string = this.authUrlMap[environment];

  private loginUrl = `${this.baseUrl}/login`;
  private logoutUrl = `${this.baseUrl}/logout`;
  private confirmUrl = `${this.baseUrl}/confirm`;
  private resendCodeUrl = `${this.baseUrl}/resend_code`;
  private signUpUrl = `${this.baseUrl}/signup`;
  private validateUrl = `${this.baseUrl}/validate`;

  async signup(details: SignUpFields): Promise<AuthResponse> {
    const response = await service.post(this.signUpUrl, {
      body: details,
      noAuthorizationHeader: true
    });

    return response.body as AuthResponse;
  }

  async login(userName: string, password: string): Promise<LoginResponse> {
    const body = { userName, password };

    const response = await service.post(this.loginUrl, { body, noAuthorizationHeader: true });

    const accessToken = response.headers.get(AMAZON_AXT_HEADER);
    const idToken = response.headers.get(AMAZON_ID_HEADER);

    sessionStorage.setItem(AXT, accessToken);
    sessionStorage.setItem(IDT, idToken);

    const data = response.body;

    return data as LoginResponse;
  }

  async logout(): Promise<AuthResponse> {
    const response = await service.post(this.logoutUrl, {
      useAccessToken: true
    });

    sessionStorage.removeItem(AXT);
    sessionStorage.removeItem(IDT);

    return response.body as AuthResponse;
  }

  async confirm(userName: string, verificationCode: string): Promise<AuthResponse> {
    const body = {
      userName,
      verificationCode
    };

    const response = await service.post(this.confirmUrl, { body, noAuthorizationHeader: true });

    return response.body as AuthResponse;
  }

  async resendCode(userName: string): Promise<AuthResponse> {
    const body = {
      userName
    };

    const response = await service.post(this.resendCodeUrl, { body, noAuthorizationHeader: true });

    return response.body as AuthResponse;
  }

  async validate(): Promise<AuthResponse> {
    const response = await service.post(this.validateUrl, {
      useAccessToken: true
    });

    return response.body as AuthResponse;
  }
}
