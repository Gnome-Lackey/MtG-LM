import * as React from "react";
import { RouteComponentProps } from "react-router";

import ErrorMessage from "components/Common/ErrorMessage";
import NavigationMessage from "components/Common/NavigationMessage";
import FormButton from "components/Form/Button";
import FormInput from "components/Form/Input";
import NameFields from "components/Views/SignUp/NameFields";
import PasswordFields from "components/Views/SignUp/PasswordFields";

import useNavigator from "components/Hooks/useNavigator";
import useFormData from "components/Hooks/useFormData";
import useErrorMessage from "components/Hooks/useErrorMessage";

import { User } from "models/User";
import { ErrorState } from "redux/error/models/State";

import { VALIDATION_REQUIRED } from "constants/validations";
import { ROUTES } from "constants/routes";
import { DOMAIN_ERROR_AUTH, VIEW_ERROR_FORM_SIGN_UP } from "constants/errors";

import "./styles.scss";

interface VerifyViewActions {
  emitResetError: Function;
  requestSignUp: Function;
}

interface SignUpViewProps extends RouteComponentProps {
  actions: VerifyViewActions;
  errors: ErrorState;
  isRequestLoading: boolean;
  user: User;
}

const SignUpView = ({
  actions: { emitResetError, requestSignUp },
  errors,
  history,
  isRequestLoading,
  user
}: SignUpViewProps): React.FunctionComponentElement<SignUpViewProps> => {
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  useNavigator(user, ROUTES.VERIFICATION_PAGE, history.push);

  const errorMessage = useErrorMessage(
    DOMAIN_ERROR_AUTH,
    VIEW_ERROR_FORM_SIGN_UP,
    errors,
    emitResetError
  );

  const { values, invalidations, updateValues, updateInvalidations } = useFormData({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const isFormInvalid = Object.values(values).some((value) => !value) || !isPasswordValid;

  const submitHandler = (ev: React.FormEvent): void => {
    ev.preventDefault();

    requestSignUp(values);
  };

  return (
    <div className="sign-up-view">
      <h1 className="title">Registration</h1>
      <form className="sign-up-form" onSubmit={submitHandler}>
        <FormInput
          errorMessage={invalidations.userName}
          id="userName"
          label="Username"
          onChange={updateValues}
          onInvalidation={updateInvalidations}
          validations={VALIDATION_REQUIRED}
          value={values.userName}
        />
        <FormInput
          errorMessage={invalidations.email}
          id="email"
          label="Email"
          onChange={updateValues}
          onInvalidation={updateInvalidations}
          validations={VALIDATION_REQUIRED}
          value={values.email}
        />
        <NameFields
          firstName={values.firstName}
          lastName={values.lastName}
          onChange={updateValues}
        />
        <PasswordFields
          confirmPassword={values.confirmPassword}
          confirmPasswordError={invalidations.confirmPassword}
          onChange={updateValues}
          onInvalidation={updateInvalidations}
          password={values.password}
          passwordError={invalidations.password}
          updatePasswordValidity={setIsPasswordValid}
        />
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        <FormButton disabled={isFormInvalid} loading={isRequestLoading}>
          Sign Up
        </FormButton>
      </form>
      <NavigationMessage linkText="Login" route={ROUTES.ROOT}>
        Already have an account?
      </NavigationMessage>
    </div>
  );
};

export default SignUpView;
