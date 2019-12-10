import { handleActions } from "redux-actions";

import {
  EMIT_GET_PLAYERS_SUCCESS,
  EMIT_GET_PLAYER_SEARCH_RESULTS_SUCCESS,
  EMIT_SEARCHING_FOR_PLAYERS,
  EMIT_CLEAR_PLAYER_LIST
} from "redux/actions/players";

import { PlayerState } from "redux/models/PlayerState";
import { PlayerAction } from "redux/models/PlayerAction";

const INITIAL_STATE: PlayerState = {
  list: [],
  searchResultsMap: {}
};

export default handleActions(
  {
    [EMIT_GET_PLAYERS_SUCCESS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      list: action.payload.players
    }),
    [EMIT_GET_PLAYER_SEARCH_RESULTS_SUCCESS]: (
      state: PlayerState,
      action: PlayerAction
    ): PlayerState => ({
      ...state,
      searchResultsMap: {
        ...state.searchResultsMap,
        [action.payload.playerSearchId]: {
          ...state.searchResultsMap[action.payload.playerSearchId],
          list: action.payload.players
        }
      }
    }),
    [EMIT_SEARCHING_FOR_PLAYERS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      searchResultsMap: {
        ...state.searchResultsMap,
        [action.payload.playerSearchId]: {
          ...state.searchResultsMap[action.payload.playerSearchId],
          isSearching: action.payload.searching
        }
      }
    }),
    [EMIT_CLEAR_PLAYER_LIST]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      searchResultsMap: {
        ...state.searchResultsMap,
        [action.payload.playerSearchId]: {
          ...state.searchResultsMap[action.payload.playerSearchId],
          list: []
        }
      }
    })
  },
  INITIAL_STATE
);
