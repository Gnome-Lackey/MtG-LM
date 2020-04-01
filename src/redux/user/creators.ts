import { EMIT_USER_UPDATED } from "redux/user/actions";
import { UpdateUserAction } from "redux/user/models/Action";

import { User } from "models/User";

export const emitUpdateUser = (info: User): UpdateUserAction => ({
  type: EMIT_USER_UPDATED,
  payload: { user: info }
});

