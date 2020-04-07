import { handleActions } from "redux-actions";

import {
  EMIT_GET_PLAYER_SEARCH_RESULTS_BY_RECORD_SUCCESS,
  EMIT_SEARCHING_FOR_PLAYERS_BY_RECORD,
  EMIT_CLEAR_PLAYER_LIST_BY_RECORD,
  EMIT_CLEAR_PLAYER_LIST,
  EMIT_SEARCHING_FOR_PLAYERS,
  EMIT_GET_PLAYER_SEARCH_RESULTS_SUCCESS,
  EMIT_GET_PLAYER_ROLES_SUCCESS,
  EMIT_UPDATE_PLAYER_ROLE_SUCCESS,
  REQUEST_UPDATE_PLAYER_ROLE,
  EMIT_UPDATE_PLAYERS
} from "redux/player/actions";

import { PlayerState } from "redux/player/models/State";
import { PlayerAction } from "redux/player/models/Action";

const INITIAL_STATE: PlayerState = {
  list: [],
  roles: [],
  searching: false,
  searchResults: [],
  searchResultsMap: {},
  selected: [],
  updatingRole: false
};

export default handleActions(
  {
    [REQUEST_UPDATE_PLAYER_ROLE]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      updatingRole: action.payload.loading
    }),
    [EMIT_UPDATE_PLAYER_ROLE_SUCCESS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      roles: action.payload.playerRoles
    }),
    [EMIT_GET_PLAYER_ROLES_SUCCESS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      roles: action.payload.playerRoles
    }),
    [EMIT_GET_PLAYER_SEARCH_RESULTS_BY_RECORD_SUCCESS]: (
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
    [EMIT_SEARCHING_FOR_PLAYERS_BY_RECORD]: (
      state: PlayerState,
      action: PlayerAction
    ): PlayerState => ({
      ...state,
      searchResultsMap: {
        ...state.searchResultsMap,
        [action.payload.playerSearchId]: {
          ...state.searchResultsMap[action.payload.playerSearchId],
          searching: action.payload.searching
        }
      }
    }),
    [EMIT_CLEAR_PLAYER_LIST_BY_RECORD]: (
      state: PlayerState,
      action: PlayerAction
    ): PlayerState => ({
      ...state,
      searchResultsMap: {
        ...state.searchResultsMap,
        [action.payload.playerSearchId]: {
          ...state.searchResultsMap[action.payload.playerSearchId],
          list: []
        }
      }
    }),
    [EMIT_GET_PLAYER_SEARCH_RESULTS_SUCCESS]: (
      state: PlayerState,
      action: PlayerAction
    ): PlayerState => ({
      ...state,
      searchResults: action.payload.players
    }),
    [EMIT_SEARCHING_FOR_PLAYERS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      searching: action.payload.searching
    }),
    [EMIT_CLEAR_PLAYER_LIST]: (state: PlayerState): PlayerState => ({
      ...state,
      searchResults: []
    }),
    [EMIT_UPDATE_PLAYERS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      selected: action.payload.players
    })
  },
  INITIAL_STATE
);
