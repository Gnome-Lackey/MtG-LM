export interface MatchRecord {
  player: string;
  wins: number;
  losses: number;
}

export interface Match {
  activePlayerRecord: MatchRecord;
  defendingPlayerRecord: MatchRecord;
}
