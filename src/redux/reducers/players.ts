import { handleActions } from "redux-actions";

import { EMIT_GET_PLAYERS_SUCCESS } from "redux/actions/player";

import { PlayerState } from "redux/models/PlayerState";
import { PlayerAction } from "redux/models/PlayerAction";

const INITIAL_STATE: PlayerState = {
  list: []
};

export default handleActions(
  {
    [EMIT_GET_PLAYERS_SUCCESS]: (state: PlayerState, action: PlayerAction): PlayerState => ({
      ...state,
      list: action.payload.players
    })
  },
  INITIAL_STATE
);
