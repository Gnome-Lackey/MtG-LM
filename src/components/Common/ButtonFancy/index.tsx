import * as React from "react";
import classNames from "classnames";

import { MouseEventFunction } from "models/Event";

import "./styles.scss";

interface ButtonFancyProps {
  children: string;
  className?: string;
  clickHandler?: MouseEventFunction;
  disabled?: boolean;
  type?: "button" | "submit";
}

const ButtonFancy = ({
  children,
  className,
  clickHandler,
  disabled,
  type
}: ButtonFancyProps): React.FunctionComponentElement<ButtonFancyProps> => (
  <button
    className={classNames("btn-fancy", { [className]: className }, { disabled })}
    type={type || "button"}
    disabled={disabled}
    onClick={clickHandler}
  >
    {children}
  </button>
);

export default ButtonFancy;
