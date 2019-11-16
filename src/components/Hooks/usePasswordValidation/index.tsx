import * as React from "react";

const capitalizedRegex = /[A-Z]+/;
const lowercaseRegex = /[a-z]+/;
const numberRegex = /[0-9]+/;
const symbolRegex = /\W+/;
const minLength = 8;

interface PasswordValidation {
  hasCapitalized: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasMinLength: boolean;
  passwordsMatch: boolean;
  isInvalid: boolean;
}

const usePasswordValidation = (password: string, confirmPassword: string): PasswordValidation => {
  const [hasCapitalized, setHasCapitalized] = React.useState(capitalizedRegex.test(password));
  const [hasLowercase, setHasLowercase] = React.useState(lowercaseRegex.test(password));
  const [hasNumber, setHasNumber] = React.useState(numberRegex.test(password));
  const [hasSymbol, setHasSymbol] = React.useState(symbolRegex.test(password));
  const [hasMinLength, setHasMinLength] = React.useState(password.length >= minLength);
  const [passwordsMatch, setHasMatchingPasswords] = React.useState(
    !!password && password === confirmPassword
  );
  
  const isInvalid =
    !hasCapitalized ||
    !hasLowercase ||
    !hasNumber ||
    !hasSymbol ||
    !hasMinLength ||
    !passwordsMatch;

  React.useEffect(() => {
    setHasCapitalized(capitalizedRegex.test(password));
    setHasLowercase(lowercaseRegex.test(password));
    setHasNumber(numberRegex.test(password));
    setHasSymbol(symbolRegex.test(password));
    setHasMinLength(password.length >= minLength);
  }, [password]);

  React.useEffect(() => {
    setHasMatchingPasswords(!!password && password === confirmPassword);
  }, [password, confirmPassword]);

  return {
    hasCapitalized,
    hasLowercase,
    hasNumber,
    hasSymbol,
    hasMinLength,
    passwordsMatch,
    isInvalid
  };
};

export default usePasswordValidation;
