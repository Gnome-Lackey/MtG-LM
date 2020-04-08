import {
  EMIT_FULL_PAGE_REQUEST_LOADING,
  EMIT_TOGGLE_MASK,
  EMIT_TOGGLE_RECORD_MATCH_MODAL
} from "redux/application/actions";

import { ApplicationAction } from "redux/application/models/Action";
import { RootState } from "redux/models/RootState";

export default class ApplicationCreator {
  emitFullPageRequestLoading = (key: string, isRequestLoading: boolean, uid?: string): Function => {
    return (dispatch: Function, getState: Function) => {
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
  };

  emitRequestLoading = (type: string, isRequestLoading: boolean): ApplicationAction => {
    return {
      type,
      payload: { loading: isRequestLoading }
    };
  };

  emitToggleMask = (): ApplicationAction => {
    return {
      type: EMIT_TOGGLE_MASK
    };
  };

  emitToggleRecordMatchModal = (): ApplicationAction => {
    return {
      type: EMIT_TOGGLE_RECORD_MATCH_MODAL
    };
  };
}
