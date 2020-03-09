export interface Match {
  id: string;
  isSeasonPoint: boolean;
  wins: number;
  games: number;
  losers: string[];
  season: string;
  winner: string;
}

export interface MatchRecord {
  wins: number;
  losses: number;
  opponentsPlayed: string[];
}

export interface MatchRecordMap {
  [key: string]: MatchRecord;
}
