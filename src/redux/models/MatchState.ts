import { MatchRecordMap } from "models/Match";

export interface MatchState {
  loading?: boolean;
  matchRecords?: MatchRecordMap
}
