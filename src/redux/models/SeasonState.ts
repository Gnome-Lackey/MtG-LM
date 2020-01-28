import { Season } from "models/Season";

export interface SeasonState {
  getSeasonLoading?: boolean;
  getCurrentSeasonLoading?: boolean;
  getActiveSeasonsLoading?: boolean;
  list?: Season[];
  selected?: Season;
}
