import * as React from "react";
import classNames from "classnames";

import "./styles.scss";

interface SpinnerProps {
  className?: string;
  inline?: boolean;
}

const Spinner = ({
  className,
  inline
}: SpinnerProps): React.FunctionComponentElement<SpinnerProps> => (
  <span className={classNames("spinner", { [className]: className }, { inline })}>
    <i className="fa fa-spinner fa-spin fa-2x" />
  </span>
);

export default Spinner;
