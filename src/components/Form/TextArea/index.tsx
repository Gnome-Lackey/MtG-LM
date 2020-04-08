import * as React from "react";
import classNames from "classnames";

import FormTextareaHeader from "components/Form/TextArea/Header";

import { DynamicValidation } from "models/Dynamics";

import ValidationUtility from "utils/form";

import "./styles.scss";

const validationUtility = new ValidationUtility();

interface FormTextAreaProps {
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  id: string;
  label?: string;
  maxLength?: number;
  onBlur?: Function;
  onFocus?: Function;
  onChange: Function;
  onInvalidation?: Function;
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  validations?: DynamicValidation;
  value: string;
}

const handleOnBlur = (
  event: React.FormEvent<HTMLTextAreaElement>,
  id: string,
  validations: DynamicValidation,
  onBlur: Function,
  onInvalidation: Function,
  setIsInvalid: Function
): void => {
  if (onBlur) {
    onBlur(event);
  }

  if (validations) {
    const { target } = event;
    const { value }: any = target;

    const error = validationUtility.handleValidation(value, validations);

    setIsInvalid(!!error);

    if (onInvalidation) {
      onInvalidation(id, error);
    }
  }
};

const handleOnChange = (
  event: React.FormEvent<HTMLTextAreaElement>,
  id: string,
  onChange: Function,
  onInvalidation: Function,
  setIsInvalid: Function
): void => {
  const { value }: any = event.target;

  setIsInvalid(false);

  onChange(id, value);

  if (onInvalidation) {
    onInvalidation(id, "");
  }
};

const FormTextArea = ({
  className,
  disabled,
  errorMessage,
  id,
  label,
  maxLength,
  onBlur,
  onChange,
  onFocus,
  onInvalidation,
  placeholder,
  readOnly,
  rows,
  validations,
  value
}: FormTextAreaProps): React.FunctionComponentElement<FormTextAreaProps> => {
  const [isInvalid, setIsInvalid] = React.useState(false);

  const numberOfRows = rows || 5;
  const isRequired = !!(validations && validations.required && validations.required.restriction);
  const hasHeader = !!(label || errorMessage);

  const classes = classNames(
    "form-text-area",
    { [className]: !!className },
    { readOnly },
    { disabled },
    { isInvalid }
  );

  return (
    <label className={classes} id={`${id}-label`} htmlFor={id}>
      {hasHeader ? (
        <FormTextareaHeader label={label} error={errorMessage} isRequired={isRequired} />
      ) : null}
      <div className="text-area-wrapper">
        <textarea
          autoComplete="off"
          id={id}
          onChange={(event) => handleOnChange(event, id, onChange, onInvalidation, setIsInvalid)}
          onBlur={(event) =>
            handleOnBlur(event, id, validations, onBlur, onInvalidation, setIsInvalid)
          }
          onFocus={(event) => {
            if (onFocus) {
              onFocus(event);
            }
          }}
          rows={numberOfRows}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        {maxLength ? (
          <p className={classNames("length-counter", { danger: value.length >= maxLength * 0.8 })}>
            {value.length}
          </p>
        ) : null}
      </div>
    </label>
  );
};

export default FormTextArea;
