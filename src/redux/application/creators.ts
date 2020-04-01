import {
  EMIT_FULL_PAGE_REQUEST_LOADING,
  EMIT_TOGGLE_MASK,
  EMIT_TOGGLE_RECORD_MATCH_MODAL
} from "redux/application/actions";

import { ApplicationAction } from "redux/application/models/Action";
import { RootState } from "redux/models/RootState";

export const emitFullPageRequestLoading = (
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
    type: EMIT_FULL_PAGE_REQUEST_LOADING,
    payload: {
      requestsMap: updatedMap,
      loading: updatedIsRequestLoading
    }
  });
};

export const emitRequestLoading = (type: string, isRequestLoading: boolean): ApplicationAction => ({
  type,
  payload: { loading: isRequestLoading }
});

export const emitToggleMask = (): ApplicationAction => ({
  type: EMIT_TOGGLE_MASK
});

export const emitToggleRecordMatchModal = (): ApplicationAction => ({
  type: EMIT_TOGGLE_RECORD_MATCH_MODAL
});
