import * as React from "react";
import classNames from "classnames";

import "./styles.scss";

interface FormCheckboxProps {
  checked: boolean;
  className?: string;
  id: string;
  label?: string;
  name?: string;
  onChange: Function;
  value?: string;
}

const FormCheckbox = ({
  checked,
  className,
  id,
  label,
  name,
  onChange,
  value
}: FormCheckboxProps): React.FunctionComponentElement<FormCheckboxProps> => (
  <label
    htmlFor={id}
    className={classNames("form-checkbox", { checked }, { [className]: !!className })}
  >
    <input
      type="checkbox"
      name={name}
      id={id}
      value={value}
      onChange={(ev) => onChange(name, ev.target.checked ? value || checked : undefined)}
    />
    {label}
  </label>
);

export default FormCheckbox;
