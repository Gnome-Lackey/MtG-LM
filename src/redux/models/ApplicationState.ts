import { DynamicBooleanMap } from "models/Dynamics";

export interface ApplicationState {
  isGettingStartedFinished?: boolean;
  isRequestLoading?: boolean;
  requestsMap?: DynamicBooleanMap,
  showMask?: boolean;
};
