import { Season, SeasonMetadata } from "models/Season";

export interface SeasonState {
  editing?: Season;
  getSeasonLoading?: boolean;
  getCurrentSeasonLoading?: boolean;
  getActiveSeasonsLoading?: boolean;
  list?: Season[];
  selected?: Season;
  metadata?: SeasonMetadata;
}
