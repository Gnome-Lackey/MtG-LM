import { EMIT_RESET_ERROR, EMIT_REQUEST_ERROR } from "redux/error/actions";

import { ErrorAction } from "redux/error/models/Action";

export default class ErrorCreator {
  emitResetError(domain: string, view: string): ErrorAction {
    return {
      type: EMIT_RESET_ERROR,
      payload: { view, domain }
    };
  }

  emitRequestError(domain: string, view: string, value: any): ErrorAction {
    return {
      type: EMIT_REQUEST_ERROR,
      payload: { view, domain, value }
    };
  }
}
