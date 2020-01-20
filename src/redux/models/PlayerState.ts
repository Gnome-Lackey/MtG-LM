import { Player } from "models/Player";

export interface PlayerSearchResult {
  list: Player[];
  searching: boolean;
}

export interface PlayerSearchResultMap {
  [searchId: string]: PlayerSearchResult;
}

export interface PlayerState {
  list?: Player[];
  loading?: boolean;
  searchResultsMap?: PlayerSearchResultMap;
  searching?: boolean;
  searchResults?: Player[];
}
