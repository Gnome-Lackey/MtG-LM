import { handleActions } from "redux-actions";

import { EMIT_CREATE_PLAYER_SUCCESS } from "redux/player/actions";
import { EMIT_CREATE_MATCH_SUCCESS } from "redux/match/actions";

import { ApplicationAction } from "redux/application/models/Action";
import { ApplicationState } from "redux/application/models/State";

import { EMIT_FULL_PAGE_REQUEST_LOADING, EMIT_TOGGLE_MASK, EMIT_TOGGLE_RECORD_MATCH_MODAL } from "redux/application/actions";

const INITIAL_STATE: ApplicationState = {
  isGettingStartedFinished: false,
  isRequestLoading: false,
  requestsMap: {},
  showMask: false,
  showRecordMatchModal: false
};

export default handleActions(
  {
    [EMIT_FULL_PAGE_REQUEST_LOADING]: (
      state: ApplicationState,
      action: ApplicationAction
    ): ApplicationState => ({
      ...state,
      requestsMap: action.payload.requestsMap,
      isRequestLoading: action.payload.loading
    }),
    [EMIT_TOGGLE_MASK]: (state: ApplicationState): ApplicationState => ({
      ...state,
      showMask: !state.showMask
    }),
    [EMIT_TOGGLE_RECORD_MATCH_MODAL]: (state: ApplicationState): ApplicationState => ({
      ...state,
      showRecordMatchModal: !state.showRecordMatchModal
    }),
    [EMIT_CREATE_PLAYER_SUCCESS]: (state: ApplicationState): ApplicationState => ({
      ...state,
      isGettingStartedFinished: true
    }),
    [EMIT_CREATE_MATCH_SUCCESS]: (state: ApplicationState): ApplicationState => ({
      ...state,
      showRecordMatchModal: false
    }),
  },
  INITIAL_STATE
);
