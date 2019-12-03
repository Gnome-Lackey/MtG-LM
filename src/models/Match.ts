export interface MatchRecord {
  player: string;
  wins: number;
  losses: number;
}

export interface Match {
  PlayerARecord: MatchRecord;
  PlayerBRecord: MatchRecord;
}
