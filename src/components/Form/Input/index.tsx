import * as React from "react";
import classNames from "classnames";

import ShowHideButton from "components/Form/Input/ShowHideButton";
import FormInputHeader from "components/Form/Input/Header";
import ErrorMessage from "components/Common/ErrorMessage";

import { DynamicValidation } from "models/Dynamics";

import ValidationUtility from "utils/form";

import "./styles.scss";

const validationUtility = new ValidationUtility();

interface FormInputProps {
  autoComplete?: string;
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
  type?: string;
  validations?: DynamicValidation;
  value: string | number;
}

const parseType = (type: string, isProtected: boolean, isProtectedTextVisible: boolean): string => {
  if (isProtected) {
    return isProtectedTextVisible ? "text" : "password";
  } else {
    return type || "text";
  }
};

const handleOnBlur = (
  event: React.FormEvent<HTMLInputElement>,
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
  event: React.FormEvent<HTMLInputElement>,
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

const FormInput = ({
  autoComplete,
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
  type,
  validations,
  value
}: FormInputProps): React.FunctionComponentElement<FormInputProps> => {
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [isProtectedTextVisible, setIsProtectedTextVisible] = React.useState(false);

  const isProtected = type === "password";
  const useAutoComplete = autoComplete || "on";
  const inputType = parseType(type, isProtected, isProtectedTextVisible);
  const isRequired = !!(validations && validations.required && validations.required.restriction);
  const hasHeader = !!(label || errorMessage);

  const classes = classNames(
    "form-input",
    { [className]: !!className },
    { "is-invalid": isInvalid },
    { "has-validation": !!validations }
  );

  return (
    <label className={classes} id={`${id}-label`} htmlFor={id}>
      {hasHeader ? <FormInputHeader label={label} isRequired={isRequired} /> : null}
      <div className="input-wrapper">
        <input
          autoComplete={useAutoComplete}
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
          value={value}
          type={inputType}
          readOnly={readOnly}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        {isProtected ? (
          <ShowHideButton clickHandler={setIsProtectedTextVisible} show={isProtectedTextVisible} />
        ) : null}
      </div>
      {errorMessage ? <ErrorMessage inline>{errorMessage}</ErrorMessage> : null}
    </label>
  );
};

export default FormInput;
