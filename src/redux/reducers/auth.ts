import { handleActions } from "redux-actions";

import {
  EMIT_CONFIRMATION_CODE_EXPIRED,
  EMIT_CLEAR_CODE_NEEDED,
  EMIT_CLEAR_CODE_RESENT,
  EMIT_LOGGING_OUT,
  EMIT_LOGIN_SUCCESS,
  EMIT_LOGOUT_SUCCESS,
  EMIT_RESEND_CODE_SUCCESS,
  EMIT_SIGN_UP_SUCCESS,
  EMIT_UPDATE_NEEDS_CONFIRMATION,
  EMIT_VALIDATION_FAILURE,
  EMIT_VALIDATION_SUCCESS,
  EMIT_VERIFY_SUCCESS,
  EMIT_VERIFY_FAILURE
} from "redux/actions/auth";
import { AuthState } from "redux/models/AuthState";

const INITIAL_STATE: AuthState = {
  codeResent: false,
  confirmed: null,
  confirmationCodeNeeded: false,
  confirmationNeeded: false,
  loggingOut: false,
  validated: null
};

export default handleActions(
  {
    [EMIT_CONFIRMATION_CODE_EXPIRED]: (state: AuthState): AuthState => ({
      ...state,
      confirmationCodeNeeded: true
    }),
    [EMIT_CLEAR_CODE_NEEDED]: (state: AuthState): AuthState => ({
      ...state,
      confirmationCodeNeeded: false
    }),
    [EMIT_CLEAR_CODE_RESENT]: (state: AuthState): AuthState => ({
      ...state,
      codeResent: false
    }),
    [EMIT_LOGGING_OUT]: (state: AuthState): AuthState => ({
      ...state,
      loggingOut: true
    }),
    [EMIT_LOGIN_SUCCESS]: (state: AuthState): AuthState => ({
      ...state,
      validated: true
    }),
    [EMIT_LOGOUT_SUCCESS]: (state: AuthState): AuthState => ({
      ...state,
      loggingOut: false,
      validated: false
    }),
    [EMIT_RESEND_CODE_SUCCESS]: (state: AuthState): AuthState => ({
      ...state,
      codeResent: true,
      confirmationCodeNeeded: false
    }),
    [EMIT_SIGN_UP_SUCCESS]: (state: AuthState): AuthState => ({
      ...state,
      confirmed: false
    }),
    [EMIT_UPDATE_NEEDS_CONFIRMATION]: (state: AuthState): AuthState => ({
      ...state,
      confirmationNeeded: true
    }),
    [EMIT_VALIDATION_FAILURE]: (state: AuthState): AuthState => ({
      ...state,
      validated: false
    }),
    [EMIT_VALIDATION_SUCCESS]: (state: AuthState): AuthState => ({
      ...state,
      validated: true
    }),
    [EMIT_VERIFY_SUCCESS]: (state: AuthState): AuthState => ({
      ...state,
      confirmed: true,
      confirmationNeeded: false,
      confirmationCodeNeeded: false
    }),
    [EMIT_VERIFY_FAILURE]: (state: AuthState): AuthState => ({
      ...state,
      confirmationCodeNeeded: true
    })
  },
  INITIAL_STATE
);
