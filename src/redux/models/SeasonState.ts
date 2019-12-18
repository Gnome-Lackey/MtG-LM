import { Season } from "models/Season";

export interface SeasonState {
  list?: Season[];
  selected?: Season;
}
