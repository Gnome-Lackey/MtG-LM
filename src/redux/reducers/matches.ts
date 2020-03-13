import { handleActions } from "redux-actions";

import {
  EMIT_UPDATE_LOADING_MATCHES,
  EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS,
  EMIT_UPDATE_LOADING_MATCH_CREATION
} from "redux/actions/match";

import { MatchState } from "redux/models/MatchState";
import { MatchAction } from "redux/models/MatchAction";

const INITIAL_STATE: MatchState = {
  loadingMatchCreation: false,
  loadingAllMatches: false,
  matchRecords: null
};

export default handleActions(
  {
    [EMIT_UPDATE_LOADING_MATCHES]: (state: MatchState, action: MatchAction): MatchState => ({
      ...state,
      loadingAllMatches: action.payload.loading
    }),
    [EMIT_UPDATE_LOADING_MATCH_CREATION]: (state: MatchState, action: MatchAction): MatchState => ({
      ...state,
      loadingMatchCreation: action.payload.loading
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
