import { Season } from "models/Season";

export interface SeasonAction {
  type: string;
  payload?: {
    seasons?: Season[];
    season?: Season;
    selectedSeason?: Season;
  };
}
