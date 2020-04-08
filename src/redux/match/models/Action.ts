import { MatchRecordMap } from "models/Match";

export interface MatchAction {
  type: string;
  payload?: {
    loading?: boolean;
    matchRecords?: MatchRecordMap;
  };
}
