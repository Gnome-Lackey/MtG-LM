import * as React from "react";

import FormInput from "components/Form/Input";
import Restriction from "components/Views/SignUp/PasswordFields/Restriction";

import usePasswordValidation from "components/Hooks/usePasswordValidation";

import { VALIDATION_REQUIRED } from "constants/validations";

import "./styles.scss";

interface PasswordFieldsProps {
  confirmPassword: string;
  confirmPasswordError: string;
  onChange: Function;
  onInvalidation: Function;
  password: string;
  passwordError: string;
  updatePasswordValidity: Function;
}

const PasswordFields = ({
  confirmPassword,
  confirmPasswordError,
  onChange,
  onInvalidation,
  password,
  passwordError,
  updatePasswordValidity
}: PasswordFieldsProps): React.FunctionComponentElement<PasswordFieldsProps> => {
  const {
    hasCapitalized,
    hasLowercase,
    hasNumber,
    hasSymbol,
    hasMinLength,
    passwordsMatch,
    isInvalid
  } = usePasswordValidation(password, confirmPassword);

  React.useEffect(() => {
    updatePasswordValidity(!isInvalid);
  }, [isInvalid]);

  return (
    <div className="password-fields">
      <div className="field-container">
        <FormInput
          errorMessage={passwordError}
          id="password"
          label="Password"
          onChange={onChange}
          onInvalidation={onInvalidation}
          type="password"
          validations={VALIDATION_REQUIRED}
          value={password}
        />
        <FormInput
          errorMessage={confirmPasswordError}
          id="confirmPassword"
          label="Confirm Password"
          onChange={onChange}
          onInvalidation={onInvalidation}
          type="password"
          validations={VALIDATION_REQUIRED}
          value={confirmPassword}
        />
      </div>
      <div className="restrictions">
        <ul className="restriction-set">
          <Restriction isValid={hasCapitalized}>Has a capitalized character?</Restriction>
          <Restriction isValid={hasLowercase}>Has a lowercase character?</Restriction>
        </ul>
        <ul className="restriction-set">
          <Restriction isValid={hasSymbol}>Has a special character?</Restriction>
          <Restriction isValid={hasNumber}>Has a number?</Restriction>
        </ul>
        <ul className="restriction-set">
          <Restriction isValid={hasMinLength}>Is at least 8 characters long?</Restriction>
          <Restriction isValid={passwordsMatch}>Do passwords match?</Restriction>
        </ul>
      </div>
    </div>
  );
};

export default PasswordFields;
