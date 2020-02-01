import { Player, PlayerRole } from "models/Player";

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
  roles?: PlayerRole[];
  searching?: boolean;
  searchResults?: Player[];
  searchResultsMap?: PlayerSearchResultMap;
}
