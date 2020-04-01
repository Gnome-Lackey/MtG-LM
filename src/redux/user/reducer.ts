import { handleActions } from "redux-actions";

import { EMIT_USER_UPDATED } from "redux/user/actions";
import {
  EMIT_LOGIN_SUCCESS,
  EMIT_SIGN_UP_SUCCESS,
  EMIT_VALIDATION_SUCCESS
} from "redux/auth/actions";
import { AuthAction } from "redux/auth/models/Action";
import { UpdateUserAction } from "redux/user/models/Action";
import { UserState } from "redux/user/models/State";

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
      current: action.payload.user
    })
  },
  INITIAL_STATE
);
