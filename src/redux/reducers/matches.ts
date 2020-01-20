import { handleActions } from "redux-actions";

import { EMIT_UPDATE_LOADING_MATCHES } from "redux/actions/match";

import { MatchState } from "redux/models/MatchState";
import { MatchAction } from "redux/models/MatchAction";

const INITIAL_STATE: MatchState = {
  loading: false
};

export default handleActions(
  {
    [EMIT_UPDATE_LOADING_MATCHES]: (state: MatchState, action: MatchAction): MatchState => ({
      ...state,
      loading: action.payload.loading
    })
  },
  INITIAL_STATE
);
