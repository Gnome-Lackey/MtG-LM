import { EMIT_USER_UPDATED } from "redux/user/actions";

import { UpdateUserAction } from "redux/user/models/Action";

import { User } from "models/User";

export default class UserCreator {
  emitUpdateUser(info: User): UpdateUserAction {
    return {
      type: EMIT_USER_UPDATED,
      payload: { user: info }
    };
  }
}
