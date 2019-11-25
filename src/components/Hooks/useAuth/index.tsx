import * as React from "react";

import { ROUTES } from "constants/routes";

const useAuth = (
  validated: boolean,
  validationHandler: Function,
  redirectHandler: Function
): boolean => {
  React.useEffect(() => {
    if (validated === null) {
      validationHandler();
    } else if (validated === false) {
      // redirectHandler(ROUTES.ROOT);
    }
  }, [validated]);

  return validated;
};

export default useAuth;
