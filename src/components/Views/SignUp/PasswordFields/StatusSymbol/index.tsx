import * as React from "react";

import "./styles.scss";

interface StatusSymbolProps {
  isValid: boolean;
}

const StatusSymbol = ({
  isValid
}: StatusSymbolProps): React.FunctionComponentElement<StatusSymbolProps> => (
  <span className="status-symbol">
    {isValid ? <i className="far fa-check-circle" /> : <i className="far fa-times-circle" />}
  </span>
);

export default StatusSymbol;
