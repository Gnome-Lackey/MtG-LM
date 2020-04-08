import { DynamicBooleanMap } from "models/Dynamics";

export interface ApplicationAction {
  type: string;
  payload?: {
    loading?: boolean;
    requestsMap?: DynamicBooleanMap;
    showMask?: boolean;
  };
}
