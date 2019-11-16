import * as React from "react";
import classNames from "classnames";

import StatusSymbol from "components/Views/SignUp/PasswordFields/StatusSymbol";

import "./styles.scss";

interface RestrictionProps {
  children: string;
  isValid: boolean;
}

const Restriction = ({
  children,
  isValid
}: RestrictionProps): React.FunctionComponentElement<RestrictionProps> => (
  <li>
    <p className={classNames("restriction", { isValid })}>
      <StatusSymbol isValid={isValid} />
      {children}
    </p>
  </li>
);

export default Restriction;
