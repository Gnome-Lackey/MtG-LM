export interface MatchRecord {
  player: string;
  wins: number;
  losses: number;
}

export interface Match {
  playerA: MatchRecord;
  playerB: MatchRecord;
  season: string;
}
