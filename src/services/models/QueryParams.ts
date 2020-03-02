export interface MatchQueryParameters {
  winners?: string | string[];
  losers?: string | string[];
  season?: string;
  seasonPoint?: boolean;
}

export interface PlayerQueryParameters {
  name?: string;
  userName?: string;
  season?: string;
}

export interface SeasonQueryParameters {
  active?: boolean;
  recent?: boolean;
  startDate?: string;
}
