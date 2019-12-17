import * as React from "react";
import classNames from "classnames";

import "./styles.scss";

interface FormRadioButtonProps {
  checked: boolean;
  id: string;
  label: string;
  onChange: Function;
  name?: string;
  value?: string;
}

const FormRadioButton = ({
  checked,
  id,
  label,
  onChange,
  name,
  value
}: FormRadioButtonProps): React.FunctionComponentElement<FormRadioButtonProps> => (
  <label htmlFor={id} className={classNames("form-radio-btn", { checked })}>
    <input
      checked={checked}
      id={id}
      name={name}
      onChange={() => onChange(value || checked)}
      type="radio"
      value={value}
    />
    {label}
  </label>
);

export default FormRadioButton;
