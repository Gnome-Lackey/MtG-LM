import { handleActions } from "redux-actions";

import { EMIT_USER_UPDATED } from "redux/actions/user";
import {
  EMIT_LOGIN_SUCCESS,
  EMIT_SIGN_UP_SUCCESS,
  EMIT_VALIDATION_SUCCESS
} from "redux/actions/auth";
import { AuthAction } from "redux/models/AuthAction";
import { UpdateUserAction } from "redux/models/UserAction";
import { UserState } from "redux/models/UserState";

const INITIAL_STATE: UserState = {
  current: null
};

export default handleActions(
  {
    [EMIT_SIGN_UP_SUCCESS]: (state: UserState, action: AuthAction): UserState => ({
      ...state,
      current: action.payload.user
    }),
    [EMIT_LOGIN_SUCCESS]: (state: UserState, action: AuthAction): UserState => ({
      ...state,
      current: action.payload.user
    }),
    [EMIT_USER_UPDATED]: (state: UserState, action: UpdateUserAction): UserState => ({
      ...state,
      current: {
        ...state.current,
        ...action.payload.user
      }
    }),
    [EMIT_VALIDATION_SUCCESS]: (state: UserState, action: AuthAction): UserState => ({
      ...state,
      current: {
        ...state.current,
        ...action.payload.user
      }
    })
  },
  INITIAL_STATE
);
