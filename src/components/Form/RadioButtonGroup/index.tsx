import * as React from "react";
import classNames from "classnames";

import FormRadioButton from "components/Form/RadioButtonGroup/RadioButton";

import "./styles.scss";

interface FormRadioButtonGroupProps {
  inline?: boolean;
  name: string;
  onChange: Function;
  options: { key: string; label: string }[];
  value: string;
}

const FormRadioButtonGroup = ({
  inline,
  name,
  onChange,
  options,
  value
}: FormRadioButtonGroupProps): React.FunctionComponentElement<FormRadioButtonGroupProps> => (
  <ul className={classNames("form-radio-btn-group", { inline })}>
    {options.map((option) => (
      <li key={option.key}>
        <FormRadioButton
          checked={value === option.key}
          id={option.key}
          name={name}
          onChange={(updatedValue: string | boolean) => onChange(name, updatedValue)}
          label={option.label}
          value={option.key}
        />
      </li>
    ))}
  </ul>
);

export default FormRadioButtonGroup;
