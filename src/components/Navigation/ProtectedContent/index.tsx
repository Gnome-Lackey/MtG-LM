import * as React from "react";

import Spinner from "components/Common/Spinner";
import useAuth from "components/Hooks/useAuth";

import "./styles.scss";

interface ProtectedContentProps {
  children: React.FunctionComponent<any>;
  redirectHandler: Function;
  validated: boolean;
  validationHandler: Function;
}

const ProtectedContent = ({
  children,
  redirectHandler,
  validated,
  validationHandler
}: ProtectedContentProps): React.FunctionComponentElement<ProtectedContentProps> => {
  const isValidated = useAuth(validated, validationHandler, redirectHandler);

  return <div className="protected-content">{isValidated ? children : <Spinner />}</div>;
};

export default ProtectedContent;
