import * as React from "react";
import classNames from "classnames";

import Spinner from "components/Common/Spinner";

import "./styles.scss";

interface FormButtonProps {
  children: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
}

const FormButton = ({
  children,
  type,
  loading,
  className,
  disabled,
  onClick
}: FormButtonProps): React.FunctionComponentElement<FormButtonProps> => (
  <button
    className={classNames("form-button", className)}
    type={type}
    disabled={disabled || loading}
    onClick={onClick}
  >
    {loading ? <Spinner inline /> : children}
  </button>
);

export default FormButton;
