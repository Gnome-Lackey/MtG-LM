import * as React from "react";
import * as classNames from "classnames";

import "./styles.scss";

interface EpithetProps {
  children?: (Element | JSX.Element | string)[]
  className?: string;
  handleHover: Function;
  handleUpdate: Function;
  epithet: string;
}

const Epithet = ({
  children,
  className,
  handleHover,
  handleUpdate,
  epithet
}: EpithetProps): React.FunctionComponentElement<EpithetProps> => (
  <button
    className={classNames("epithet", className)}
    type="button"
    onClick={() => handleUpdate(epithet)}
    onMouseEnter={() => handleHover(epithet)}
    onMouseLeave={() => handleHover("")}
  >
    {children}
  </button>
);

export default Epithet;
