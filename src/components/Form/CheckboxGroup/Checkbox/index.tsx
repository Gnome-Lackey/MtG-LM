import * as React from "react";
import classNames from "classnames";

import "./styles.scss";

interface FormCheckboxProps {
  checked: boolean;
  id: string;
  label?: string;
  name: string;
  onChange: Function;
  value: string;
}

const FormCheckbox = ({
  checked,
  id,
  label,
  name,
  onChange,
  value
}: FormCheckboxProps): React.FunctionComponentElement<FormCheckboxProps> => (
  <label htmlFor={id} className={classNames("form-checkbox", { checked })}>
    <input
      type="checkbox"
      name={name}
      id={id}
      value={value}
      onChange={(ev) => onChange(name, ev.target.checked ? value : undefined)}
    />
    {label}
  </label>
);

export default FormCheckbox;
