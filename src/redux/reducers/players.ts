import { handleActions } from "redux-actions";

import {
  EMIT_GET_PLAYERS_SUCCESS,
  EMIT_GET_DEFENDING_PLAYERS_B_SUCCESS,
  EMIT_GET_ACTIVE_PLAYERS_SUCCESS,
  EMIT_SEARCHING_FOR_ACTIVE_PLAYERS,
  EMIT_SEARCHING_FOR_DEFENDING_PLAYERS
} from "redux/actions/players";

import { PlayerState } from "redux/models/PlayerState";
import { PlayerAction } from "redux/models/PlayerAction";

const INITIAL_STATE: PlayerState = {
  list: [],
  activePlayerList: [],
  defendingPlayerList: [],
  searchingForActivePlayers: false,
  searchingForDefendingPlayers: false
};

export default handleActions(
  {
    [EMIT_GET_PLAYERS_SUCCESS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      list: action.payload.players
    }),
    [EMIT_GET_ACTIVE_PLAYERS_SUCCESS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      activePlayerList: action.payload.players
    }),
    [EMIT_GET_DEFENDING_PLAYERS_B_SUCCESS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      defendingPlayerList: action.payload.players
    }),
    [EMIT_SEARCHING_FOR_ACTIVE_PLAYERS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      searchingForActivePlayers: action.payload.searching
    }),
    [EMIT_SEARCHING_FOR_DEFENDING_PLAYERS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      searchingForDefendingPlayers: action.payload.searching
    })
  },
  INITIAL_STATE
);
