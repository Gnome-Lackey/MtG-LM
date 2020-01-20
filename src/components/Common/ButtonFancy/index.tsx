import * as React from "react";
import classNames from "classnames";

import { MouseButtonEventFunction } from "models/Event";

import "./styles.scss";

interface ButtonFancyProps {
  children: string;
  className?: string;
  clickHandler?: MouseButtonEventFunction;
  disabled?: boolean;
  type?: "button" | "submit";
  style?: "highlight" | "underline";
}

const ButtonFancy = ({
  children,
  className,
  clickHandler,
  disabled,
  type,
  style
}: ButtonFancyProps): React.FunctionComponentElement<ButtonFancyProps> => (
  <button
    className={classNames(
      "btn-fancy",
      style || "underline",
      { [className]: className },
      { disabled }
    )}
    type={type || "button"}
    disabled={disabled}
    onClick={clickHandler}
  >
    {children}
  </button>
);

export default ButtonFancy;
