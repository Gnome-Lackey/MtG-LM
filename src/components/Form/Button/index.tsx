import * as React from "react";
import classNames from "classnames";

import Spinner from "components/Common/Spinner";

import "./styles.scss";

interface FormButtonProps {
  id?: string;
  children: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
}

const FormButton = ({
  id,
  children,
  type,
  loading,
  className,
  disabled,
  onClick
}: FormButtonProps): React.FunctionComponentElement<FormButtonProps> => (
  <button
  id={id}
    className={classNames("btn-form", className)}
    type={type}
    disabled={disabled || loading}
    onClick={onClick}
  >
    {loading ? <Spinner inline /> : children}
  </button>
);

export default FormButton;
