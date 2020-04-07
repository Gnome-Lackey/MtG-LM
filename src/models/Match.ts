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
  id: string;
  wins: number;
  losses: number;
  playersPlayed: string[];
  opponentsDefeated: string[];
  rank: string;
}

export interface MatchRecordMap {
  [key: string]: MatchRecord;
}
