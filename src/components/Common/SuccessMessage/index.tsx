import * as React from "react";
import classNames from "classnames";

import "./styles.scss";

interface SuccessMessageProps {
  children: string;
  inline?: boolean;
}

const SuccessMessage = ({
  children,
  inline
}: SuccessMessageProps): React.FunctionComponentElement<SuccessMessageProps> => (
  <div className={classNames("success-message", { inline })}>
    <i className="far fa-paper-plane" />
    <span className="message">{children}</span>
  </div>
);

export default SuccessMessage;
