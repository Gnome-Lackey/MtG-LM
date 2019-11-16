import * as React from "react";

import FormCheckbox from "components/Form/CheckboxGroup/Checkbox";

import "./styles.scss";

interface FormCheckboxGroupProps {
  changeHandler: Function;
  options: { key: string; label: string }[];
  title: string;
  values: string[];
}

const FormCheckboxGroup = ({
  changeHandler,
  options,
  title,
  values
}: FormCheckboxGroupProps): React.FunctionComponentElement<FormCheckboxGroupProps> => (
  <div className="form-checkbox-group">
    {title && <h3 className="title">{title}</h3>}
    <ul className="form-checkbox-group-list">
      {options.map((option) => (
        <li key={option.key}>
          <FormCheckbox
            label={option.label}
            id={option.key}
            name={option.key}
            onChange={changeHandler}
            checked={values.includes(option.key)}
            value={option.key}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default FormCheckboxGroup;
