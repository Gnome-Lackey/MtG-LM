import * as React from "react";
import classNames from "classnames";

import "./styles.scss";

interface ErrorMessageProps {
  children: string;
  inline?: boolean;
}

const ErrorMessage = ({
  children,
  inline
}: ErrorMessageProps): React.FunctionComponentElement<ErrorMessageProps> => (
  <div className={classNames("error-message", { inline })}>
    <i className="fa fa-exclamation-circle" />
    <span className="message">{children}</span>
  </div>
);

export default ErrorMessage;
