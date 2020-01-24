import { handleActions } from "redux-actions";

import { EMIT_RESET_ERROR, EMIT_REQUEST_ERROR } from "redux/actions/errors";
import { ErrorAction } from "redux/models/ErrorAction";
import { ErrorState } from "redux/models/ErrorState";

import {
  DOMAIN_ERROR_AUTH,
  DOMAIN_ERROR_FORM_GETTING_STARTED,
  DOMAIN_ERROR_FORM_RECORD_MATCH,
  DOMAIN_ERROR_FORM_SEASON,
  DOMAIN_ERROR_GENERAL
} from "constants/errors";

const INITIAL_STATE: ErrorState = {
  [DOMAIN_ERROR_AUTH]: {},
  [DOMAIN_ERROR_FORM_GETTING_STARTED]: {},
  [DOMAIN_ERROR_FORM_RECORD_MATCH]: {},
  [DOMAIN_ERROR_FORM_SEASON]: {},
  [DOMAIN_ERROR_GENERAL]: {}
};

export default handleActions(
  {
    [EMIT_RESET_ERROR]: (state: ErrorState, action: ErrorAction): ErrorState => ({
      ...state,
      [action.payload.domain]: {
        ...[action.payload.domain],
        [action.payload.view]: null
      }
    }),
    [EMIT_REQUEST_ERROR]: (state: ErrorState, action: ErrorAction): ErrorState => ({
      ...state,
      [action.payload.domain]: {
        ...[action.payload.domain],
        [action.payload.view]: action.payload.value
      }
    })
  },
  INITIAL_STATE
);
