import { MatchRecordMap } from "models/Match";

export interface MatchState {
  loadingMatchCreation?: boolean;
  loadingAllMatches?: boolean;
  matchRecords?: MatchRecordMap
}
