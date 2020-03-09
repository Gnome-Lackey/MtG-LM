export interface MatchQueryParameters {
  winners?: string | string[];
  "winners|"?: string | string[];
  losers?: string | string[];
  "losers|"?: string | string[];
  season?: string;
  "season|"?: string;
  seasonPoint?: boolean;
  "seasonPoint|"?: boolean;
}

export interface PlayerQueryParameters {
  name?: string;
  "name|"?: string;
  season?: string;
  "season|"?: string;
  userName?: string;
  "userName|"?: string;
}

export interface SeasonQueryParameters {
  season?: string;
  "season|"?: string;
  active?: boolean;
  "active|"?: boolean;
}
