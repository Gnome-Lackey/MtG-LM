import { EMIT_RESET_ERROR, EMIT_REQUEST_ERROR } from "redux/actions/errors";

import { ErrorAction } from "redux/models/ErrorAction";

export const emitResetError = (domain: string, view: string): ErrorAction => ({
  type: EMIT_RESET_ERROR,
  payload: { view, domain }
});

export const emitRequestError = (domain: string, view: string, value: any): ErrorAction => ({
  type: EMIT_REQUEST_ERROR,
  payload: { view, domain, value }
});
