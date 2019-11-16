import { DynamicBooleanMap } from "models/Dynamics";

export interface ApplicationState {
  isRequestLoading?: boolean;
  requestsMap?: DynamicBooleanMap,
  showMask?: boolean;
};
