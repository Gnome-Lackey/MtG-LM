import { DynamicBooleanMap } from "models/Dynamics";

export interface ApplicationAction {
  type: string;
  payload?: {
    isRequestLoading?: boolean;
    requestsMap?: DynamicBooleanMap;
    showMask?: boolean;
  };
}
