import { handleActions } from "redux-actions";

import { EMIT_RESET_ERROR, EMIT_REQUEST_ERROR } from "redux/error/actions";
import { ErrorAction } from "redux/error/models/Action";
import { ErrorState } from "redux/error/models/State";

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
