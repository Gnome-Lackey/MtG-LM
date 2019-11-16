import * as React from "react";
import classNames from "classnames";

import "./styles.scss";

interface FabProps {
  children: React.ReactElement;
  className?: string;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const Fab = ({
  children,
  className,
  clickHandler
}: FabProps): React.FunctionComponentElement<FabProps> => (
  <button
    className={classNames("fab", { [className]: className })}
    type="button"
    onClick={clickHandler}
  >
    {children}
  </button>
);

export default Fab;
