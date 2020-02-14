import { Season, SeasonMetadata } from "models/Season";

export interface SeasonAction {
  type: string;
  payload?: {
    loading?: boolean;
    seasons?: Season[];
    season?: Season;
    selectedSeason?: Season;
    metadata?: SeasonMetadata;
  };
}
