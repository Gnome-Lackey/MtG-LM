import * as React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "./styles.scss";

interface NavigationMessageProps {
  children: React.FunctionComponentElement<any> | string;
  className?: string;
  linkText: string;
  route: string;
}

const NavigationMessage = ({
  children,
  className,
  linkText,
  route
}: NavigationMessageProps): React.FunctionComponentElement<NavigationMessageProps> => (
  <div className={classNames("navigation-message", { [className]: className })}>
    <div className="message">{children}</div>
    <Link to={route}>{linkText}</Link>
  </div>
);

export default NavigationMessage;
