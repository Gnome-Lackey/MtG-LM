import {
  EMIT_REQUEST_LOADING,
  EMIT_TOGGLE_MASK,
  EMIT_TOGGLE_RECORD_MATCH_MODAL
} from "redux/actions/application";

import { ApplicationAction } from "redux/models/ApplicationAction";
import { RootState } from "redux/models/RootState";

export const emitRequestLoading = (
  key: string,
  isRequestLoading: boolean,
  uid?: string
): Function => (dispatch: Function, getState: Function) => {
  const {
    application: { requestsMap }
  } = getState() as RootState;

  const primaryKey = uid ? `${key}-${uid}` : key;
  const updatedMap = { ...requestsMap, [primaryKey]: isRequestLoading };
  const updatedIsRequestLoading = Object.keys(updatedMap).some((mapKey) => updatedMap[mapKey]);

  dispatch({
    type: EMIT_REQUEST_LOADING,
    payload: {
      requestsMap: updatedMap,
      isRequestLoading: updatedIsRequestLoading
    }
  });
};

export const emitToggleMask = (): ApplicationAction => ({
  type: EMIT_TOGGLE_MASK
});

export const emitToggleRecordMatchModal = (): ApplicationAction => ({
  type: EMIT_TOGGLE_RECORD_MATCH_MODAL
});
