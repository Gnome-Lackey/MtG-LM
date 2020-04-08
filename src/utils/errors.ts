import {
  AuthResponse,
  LoginResponse,
  MatchResponse,
  MatchDetailsResponse,
  PlayerRoleResponse,
  PlayerResponse,
  ScryfallCardResponse,
  ScryfallSetResponse,
  SeasonResponse,
  SeasonDetailsResponse,
  SuccessResponse,
  UserResponse
} from "services/models/Responses";

export default class ErrorUtility {
  constructor() {
    Function.prototype.bind(this.hasError, this);
    Function.prototype.bind(this.getErrorMessage, this);
  }

  hasError(results: AuthResponse): boolean;
  hasError(results: AuthResponse[]): boolean;
  hasError(results: LoginResponse): boolean;
  hasError(results: LoginResponse[]): boolean;
  hasError(results: MatchResponse): boolean;
  hasError(results: MatchResponse[]): boolean;
  hasError(results: MatchDetailsResponse): boolean;
  hasError(results: MatchDetailsResponse[]): boolean;
  hasError(results: PlayerRoleResponse): boolean;
  hasError(results: PlayerRoleResponse[]): boolean;
  hasError(results: PlayerResponse): boolean;
  hasError(results: PlayerResponse[]): boolean;
  hasError(results: ScryfallCardResponse): boolean;
  hasError(results: ScryfallCardResponse[]): boolean;
  hasError(results: ScryfallSetResponse): boolean;
  hasError(results: ScryfallSetResponse[]): boolean;
  hasError(results: SeasonResponse): boolean;
  hasError(results: SeasonResponse[]): boolean;
  hasError(results: SeasonDetailsResponse): boolean;
  hasError(results: SeasonDetailsResponse[]): boolean;
  hasError(results: SuccessResponse): boolean;
  hasError(results: SuccessResponse[]): boolean;
  hasError(results: UserResponse): boolean;
  hasError(results: UserResponse[]): boolean;
  hasError(results: any): boolean {
    if (!results) {
      return false;
    } else if (results.length) {
      return results.some((result: any) => !!result.error);
    } else {
      return !!results.error;
    }
  }

  getErrorMessage(results: AuthResponse): string;
  getErrorMessage(results: AuthResponse[]): string;
  getErrorMessage(results: LoginResponse): string;
  getErrorMessage(results: LoginResponse[]): string;
  getErrorMessage(results: MatchResponse): string;
  getErrorMessage(results: MatchResponse[]): string;
  getErrorMessage(results: MatchDetailsResponse): string;
  getErrorMessage(results: MatchDetailsResponse[]): string;
  getErrorMessage(results: PlayerRoleResponse): string;
  getErrorMessage(results: PlayerRoleResponse[]): string;
  getErrorMessage(results: PlayerResponse): string;
  getErrorMessage(results: PlayerResponse[]): string;
  getErrorMessage(results: ScryfallCardResponse): string;
  getErrorMessage(results: ScryfallCardResponse[]): string;
  getErrorMessage(results: ScryfallSetResponse): string;
  getErrorMessage(results: ScryfallSetResponse[]): string;
  getErrorMessage(results: SeasonResponse): string;
  getErrorMessage(results: SeasonResponse[]): string;
  getErrorMessage(results: SeasonDetailsResponse): string;
  getErrorMessage(results: SeasonDetailsResponse[]): string;
  getErrorMessage(results: SuccessResponse): string;
  getErrorMessage(results: SuccessResponse[]): string;
  getErrorMessage(results: UserResponse): string;
  getErrorMessage(results: UserResponse[]): string;
  getErrorMessage(results: any | any[]): string {
    if (!this.hasError(results)) {
      return null;
    } else if (results.length) {
      return results.find(this.hasError).error.message;
    } else {
      return results.error.message;
    }
  }
}
