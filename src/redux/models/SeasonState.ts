import { Season } from "models/Season";

export interface SeasonState {
  loading?: boolean;
  list?: Season[];
  selected?: Season;
}
