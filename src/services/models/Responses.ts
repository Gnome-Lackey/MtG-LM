import {
  PlayerView,
  MatchView,
  SeasonView,
  ScryfallSetView
} from "services/models/Views";

export interface AuthHeaderResponse {
  "X-ID-Token": string;
  "X-Access-Token": string;
  "set-cookie": string;
  "Access-Control-Expose-Headers": string;
}

export interface AuthResponse extends ErrorResponse {
  user: UserResponse;
}

export interface ErrorResponse {
  error?: {
    name: string;
    message: string;
  };
}

export interface LoginResponse extends ErrorResponse {
  headers: AuthHeaderResponse;
  user: AuthResponse;
}

export interface MatchResponse extends MatchView, ErrorResponse {
  losers: string[];
  season: string;
  winner: string;
}

export interface MatchDetailsResponse extends MatchView, ErrorResponse {
  losers: PlayerView[];
  season: SeasonView;
  winner: PlayerView;
}

export interface MtglmServiceResponse {
  headers: Headers;
  status: number;
  body: MtglmServiceResponseBody;
}

export interface PlayerRoleResponse extends ErrorResponse {
  id: string;
  displayName: string;
  userName: string;
  email: string;
  role: string;
}

export interface PlayerResponse extends PlayerView, ErrorResponse {
  isAdmin: boolean;
}

export interface ScryfallCardResponse extends ScryfallSetView, ErrorResponse {
  [key: string]: string | string[] | number | boolean | object;
}

export interface ScryfallSetResponse extends ScryfallSetView, ErrorResponse {
  [key: string]: string | number | boolean | object;
}

export interface SeasonResponse extends SeasonView, ErrorResponse {
  set: string;
  players: string[];
}

export interface SeasonDetailsResponse extends SeasonView, ErrorResponse {
  set: ScryfallSetView;
  players: PlayerView[];
}

export interface SuccessResponse extends ErrorResponse {
  message: string;
}

export interface UserResponse extends ErrorResponse {
  id: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  displayName: string;
  isFirstTimeLogin?: boolean;
  accountType: string;
}

type MtglmServiceResponseBody =
  | AuthResponse
  | ErrorResponse
  | LoginResponse
  | MatchResponse
  | MatchResponse[]
  | PlayerResponse
  | PlayerResponse[]
  | ScryfallCardResponse
  | ScryfallCardResponse[]
  | ScryfallSetResponse
  | SeasonResponse
  | SeasonResponse[]
  | SeasonDetailsResponse
  | SeasonDetailsResponse[]
  | SuccessResponse
  | UserResponse;
