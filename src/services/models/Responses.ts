import {
  PlayerView,
  RecordView,
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
  players: RecordResponse[];
}

export interface MatchDetailsResponse extends MatchView, ErrorResponse {
  players: RecordDetailsResponse[];
}

type MtglmServiceResponseBody =
  | AuthResponse
  | ErrorResponse
  | LoginResponse
  | MatchDetailsResponse
  | MatchDetailsResponse[]
  | MatchResponse
  | PlayerDetailsResponse
  | PlayerDetailsResponse[]
  | PlayerResponse
  | PlayerResponse[]
  | RecordDetailsResponse
  | RecordDetailsResponse[]
  | RecordResponse
  | RecordResponse[]
  | ScryfallCardResponse
  | ScryfallCardResponse[]
  | ScryfallSetResponse
  | SeasonResponse
  | SeasonDetailsResponse
  | SuccessResponse
  | UserResponse;

export interface MtglmServiceResponse {
  headers: Headers;
  status: number;
  body: MtglmServiceResponseBody;
}

export interface PlayerResponse extends PlayerView, ErrorResponse {
  matches: string[];
}

export interface PlayerDetailsResponse extends PlayerView, ErrorResponse {
  matches: MatchView[];
  isAdmin: boolean;
}

export interface RecordResponse extends RecordView, ErrorResponse {
  losses: number;
  player: string;
  match: string;
}

export interface RecordDetailsResponse extends RecordView, ErrorResponse {
  losses: number;
  player: PlayerView;
  match: MatchView;
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
