import { handleActions } from "redux-actions";

import {
  EMIT_GET_PLAYERS_SUCCESS,
  EMIT_GET_POTENTIAL_PLAYER_B_SUCCESS,
  EMIT_GET_POTENTIAL_PLAYER_A_SUCCESS,
  EMIT_SEARCHING_FOR_ACTIVE_PLAYERS,
  EMIT_SEARCHING_FOR_DEFENDING_PLAYERS,
  EMIT_CLEAR_PLAYER_B_LIST,
  EMIT_CLEAR_PLAYER_A_LIST
} from "redux/actions/players";

import { PlayerState } from "redux/models/PlayerState";
import { PlayerAction } from "redux/models/PlayerAction";

const INITIAL_STATE: PlayerState = {
  list: [],
  playerAList: [],
  playerBList: [],
  searchingForAPlayers: false,
  searchingForBPlayers: false
};

export default handleActions(
  {
    [EMIT_GET_PLAYERS_SUCCESS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      list: action.payload.players
    }),
    [EMIT_GET_POTENTIAL_PLAYER_A_SUCCESS]: (
      state: PlayerState,
      action: PlayerAction
    ): PlayerState => ({
      ...state,
      playerAList: action.payload.players
    }),
    [EMIT_GET_POTENTIAL_PLAYER_B_SUCCESS]: (
      state: PlayerState,
      action: PlayerAction
    ): PlayerState => ({
      ...state,
      playerBList: action.payload.players
    }),
    [EMIT_SEARCHING_FOR_ACTIVE_PLAYERS]: (
      state: PlayerState,
      action: PlayerAction
    ): PlayerState => ({
      ...state,
      searchingForAPlayers: action.payload.searching
    }),
    [EMIT_SEARCHING_FOR_DEFENDING_PLAYERS]: (
      state: PlayerState,
      action: PlayerAction
    ): PlayerState => ({
      ...state,
      searchingForBPlayers: action.payload.searching
    }),
    [EMIT_CLEAR_PLAYER_A_LIST]: (state: PlayerState): PlayerState => ({
      ...state,
      playerAList: []
    }),
    [EMIT_CLEAR_PLAYER_B_LIST]: (state: PlayerState): PlayerState => ({
      ...state,
      playerBList: []
    })
  },
  INITIAL_STATE
);
