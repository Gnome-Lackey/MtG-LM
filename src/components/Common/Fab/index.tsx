import * as React from "react";
import classNames from "classnames";

import "./styles.scss";

interface FabProps {
  children?: React.ReactElement;
  className?: string;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Fab = ({
  children,
  className,
  clickHandler,
  disabled
}: FabProps): React.FunctionComponentElement<FabProps> => (
  <button
    className={classNames("fab", { [className]: className }, { disabled })}
    type="button"
    onClick={clickHandler}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Fab;
