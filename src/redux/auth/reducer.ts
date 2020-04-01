import {
  EMIT_LOGIN_SUCCESS,
  EMIT_UPDATE_NEEDS_CONFIRMATION,
  EMIT_LOGOUT_SUCCESS,
  EMIT_VERIFY_SUCCESS,
  EMIT_VERIFY_FAILURE,
  EMIT_CLEAR_CODE_RESENT,
  EMIT_CLEAR_CODE_NEEDED,
  EMIT_SIGN_UP_SUCCESS,
  EMIT_RESEND_CODE_SUCCESS,
  EMIT_VALIDATION_FAILURE,
  EMIT_LOGGING_OUT,
  EMIT_CONFIRMATION_CODE_EXPIRED,
  EMIT_VALIDATION_SUCCESS
} from "redux/auth/actions";

import { emitFullPageRequestLoading } from "redux/application/creators";
import { emitRequestError, emitResetError } from "redux/error/creators";
import { emitUpdateUser } from "redux/user/creators";
import { AuthAction } from "redux/auth/models/Action";
import { RootState } from "redux/models/RootState";

import * as authService from "services/auth";

import {
  SignUpFields,
  LoginFields,
  ConfirmFields
} from "components/Hooks/useFormData/models/FormFields";

import { REQUEST_AUTH } from "constants/request";
import {
  DOMAIN_ERROR_AUTH,
  VIEW_ERROR_FORM_LOGIN,
  VIEW_ERROR_FORM_LOGOUT,
  VIEW_ERROR_FORM_SIGN_UP,
  VIEW_ERROR_FORM_VERIFY,
  TYPE_ERROR_USER_NOT_CONFIRMED,
  TYPE_ERROR_EXPIRED_CONFIRMATION_CODE
} from "constants/errors";

export const emitClearCodeResent = (): AuthAction => ({
  type: EMIT_CLEAR_CODE_RESENT
});

export const emitClearCodeNeeded = (): AuthAction => ({
  type: EMIT_CLEAR_CODE_NEEDED
});

export const requestLogin = (details: LoginFields) => async (dispatch: Function) => {
  const { userName, password } = details;

  dispatch(emitResetError(DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_LOGIN));

  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, true));

  const data = await authService.login(userName, password);

  if (!data.error) {
    dispatch({
      type: EMIT_LOGIN_SUCCESS,
      payload: { user: data.user }
    });
  } else if (data.error.name === TYPE_ERROR_USER_NOT_CONFIRMED) {
    dispatch(emitUpdateUser({ id: data.error.name, userName }));

    dispatch({
      type: EMIT_UPDATE_NEEDS_CONFIRMATION,
      payload: true
    });
  } else {
    dispatch(emitRequestError(DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_LOGIN, data.error.message));
  }

  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, false));
};

export const requestLogout = () => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_LOGOUT));

  dispatch({ type: EMIT_LOGGING_OUT });

  const data = await authService.logout();

  if (data && data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_LOGOUT, data.error.message));
  } else {
    dispatch({ type: EMIT_LOGOUT_SUCCESS });
  }
};

export const requestSignUp = (details: SignUpFields) => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_SIGN_UP));

  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, true));

  const data = await authService.signup(details);

  if (data && data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_SIGN_UP, data.error.message));
  } else {
    dispatch({
      type: EMIT_SIGN_UP_SUCCESS,
      payload: { user: data.user }
    });
  }

  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, false));
};

export const requestConfirm = (details: ConfirmFields) => async (
  dispatch: Function,
  getState: Function
) => {
  const {
    users: {
      current: { userName }
    }
  } = getState() as RootState;

  const { code } = details;

  dispatch(emitResetError(DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_VERIFY));

  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, true));

  const data = await authService.confirm(userName, code);

  if (!data.error) {
    dispatch({ type: EMIT_VERIFY_SUCCESS });
  } else if (data.error.name === TYPE_ERROR_EXPIRED_CONFIRMATION_CODE) {
    dispatch({ type: EMIT_CONFIRMATION_CODE_EXPIRED });
  } else {
    dispatch(emitRequestError(DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_VERIFY, data.error.message));

    dispatch({ type: EMIT_VERIFY_FAILURE });
  }

  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, false));
};

export const requestResendCode = () => async (dispatch: Function, getState: Function) => {
  const {
    users: {
      current: { userName }
    }
  } = getState() as RootState;

  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, true));

  const data = await authService.resendCode(userName);

  if (data && data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_VERIFY, data.error.message));
  } else {
    dispatch({ type: EMIT_RESEND_CODE_SUCCESS });
  }

  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, false));
};

export const requestValidation = () => async (dispatch: Function) => {
  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, true));

  const data = await authService.validate();

  if (data && data.error) {
    dispatch({ type: EMIT_VALIDATION_FAILURE });
  } else {
    dispatch({
      type: EMIT_VALIDATION_SUCCESS,
      payload: { user: data.user }
    });
  }

  dispatch(emitFullPageRequestLoading(REQUEST_AUTH, false));
};
