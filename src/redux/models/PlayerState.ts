import { Player, PlayerDetails } from "models/Player";

export interface PlayerSearchResult {
  list: Player[];
  searching: boolean;
}

export interface PlayerSearchResultMap {
  [searchId: string]: PlayerSearchResult;
}

export interface PlayerState {
  list?: Player[];
  detailList?: PlayerDetails[];
  loading?: boolean;
  searchResultsMap?: PlayerSearchResultMap;
  searching?: boolean;
  searchResults?: Player[];
  editing?: PlayerDetails;
}
