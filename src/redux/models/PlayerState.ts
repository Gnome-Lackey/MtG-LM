import { Player } from "models/Player";

export interface PlayerSearchResult {
  list: Player[];
  isSearching: boolean;
}

export interface PlayerSearchResultMap {
  [searchId: string]: PlayerSearchResult;
}

export interface PlayerState {
  list?: Player[];
  searchResultsMap?: PlayerSearchResultMap;
}
