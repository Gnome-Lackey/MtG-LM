import { EMIT_USER_UPDATED } from "redux/actions/user";
import { UpdateUserAction } from "redux/models/UserAction";

import { User } from "models/User";

export const emitUpdateUser = (info: User): UpdateUserAction => ({
  type: EMIT_USER_UPDATED,
  payload: { user: info }
});

