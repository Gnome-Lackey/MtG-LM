import * as React from "react";

import { ErrorState } from "redux/error/models/State";

const useErrorMessage = (
  domain: string,
  view: string,
  errors: ErrorState,
  resetHandler: Function
): string => {
  React.useEffect(() => {
    return () => {
      resetHandler(domain, view);
    };
  }, []);

  return errors[domain][view];
};

export default useErrorMessage;
