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

export interface CreateMatchRecordBody {
  player: string;
  wins: number;
}

export interface CreateMatchBody {
  records: CreateMatchRecordBody[];
  season: string;
}
