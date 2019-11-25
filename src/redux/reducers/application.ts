import { handleActions } from "redux-actions";

import { EMIT_REQUEST_LOADING, EMIT_TOGGLE_MASK } from "redux/actions/application";
import { ApplicationState } from "redux/models/ApplicationState";
import { ApplicationAction } from "redux/models/ApplicationAction";
import { EMIT_CREATE_PLAYER_SUCCESS } from "redux/actions/players";

const INITIAL_STATE: ApplicationState = {
  isGettingStartedFinished: false,
  isRequestLoading: false,
  requestsMap: {},
  showMask: false
};

export default handleActions(
  {
    [EMIT_REQUEST_LOADING]: (
      state: ApplicationState,
      action: ApplicationAction
    ): ApplicationState => ({
      ...state,
      requestsMap: action.payload.requestsMap,
      isRequestLoading: action.payload.isRequestLoading
    }),
    [EMIT_TOGGLE_MASK]: (state: ApplicationState): ApplicationState => ({
      ...state,
      showMask: !state.showMask
    }),
    [EMIT_CREATE_PLAYER_SUCCESS]: (state: ApplicationState): ApplicationState => ({
      ...state,
      isGettingStartedFinished: true
    })
  },
  INITIAL_STATE
);
