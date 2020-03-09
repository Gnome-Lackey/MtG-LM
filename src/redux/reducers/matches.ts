import { handleActions } from "redux-actions";

import {
  EMIT_UPDATE_LOADING_MATCHES,
  EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS
} from "redux/actions/match";

import { MatchState } from "redux/models/MatchState";
import { MatchAction } from "redux/models/MatchAction";

const INITIAL_STATE: MatchState = {
  loading: false,
  matchRecords: null
};

export default handleActions(
  {
    [EMIT_UPDATE_LOADING_MATCHES]: (state: MatchState, action: MatchAction): MatchState => ({
      ...state,
      loading: action.payload.loading
    }),
    [EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS]: (
      state: MatchState,
      action: MatchAction
    ): MatchState => ({
      ...state,
      matchRecords: action.payload.matchRecords
    })
  },
  INITIAL_STATE
);
