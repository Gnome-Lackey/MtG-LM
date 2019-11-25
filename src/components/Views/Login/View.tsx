import * as React from "react";
import { RouteComponentProps } from "react-router";

import NavigationMessage from "components/Common/NavigationMessage";
import ErrorMessage from "components/Common/ErrorMessage";
import FormButton from "components/Form/Button";
import FormInput from "components/Form/Input";

import useNavigator from "components/Hooks/useNavigator";
import useFormData from "components/Hooks/useFormData";
import useErrorMessage from "components/Hooks/useErrorMessage";

import { ErrorState } from "redux/models/ErrorState";

import { DOMAIN_ERROR_AUTH, VIEW_ERROR_LOGIN } from "constants/errors";
import { VALIDATION_REQUIRED } from "constants/validations";
import { ROUTES } from "constants/routes";

import "./styles.scss";

interface LoginViewActions {
  emitResetError: Function;
  requestLogin: Function;
}

interface LoginViewProps extends RouteComponentProps {
  actions: LoginViewActions;
  confirmationNeeded: boolean;
  errors: ErrorState;
  isFirstTimeLogin: boolean;
  isRequestLoading: boolean;
  userName: string;
  validated: boolean;
}

const LoginView = ({
  actions: { emitResetError, requestLogin },
  confirmationNeeded,
  errors,
  history,
  isFirstTimeLogin,
  isRequestLoading,
  userName,
  validated
}: LoginViewProps): React.FunctionComponentElement<LoginViewProps> => {
  useNavigator(confirmationNeeded, ROUTES.VERIFICATION_PAGE, history.push);
  useNavigator(
    validated,
    isFirstTimeLogin ? ROUTES.GETTING_STARTED : ROUTES.HOME_PAGE,
    history.push
  );

  const errorMessage = useErrorMessage(DOMAIN_ERROR_AUTH, VIEW_ERROR_LOGIN, errors, emitResetError);

  const { values, invalidations, updateValues, updateInvalidations } = useFormData({
    userName,
    password: ""
  });

  const isFormInvalid = !values.userName || !values.password;

  const submitHandler = (ev: React.FormEvent): void => {
    ev.preventDefault();

    requestLogin(values);
  };

  return (
    <div className="login-view">
      <h1 className="title">Mtg: League Manager</h1>
      <form className="login-form" onSubmit={submitHandler}>
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
          errorMessage={invalidations.password}
          id="password"
          label="Password"
          onChange={updateValues}
          onInvalidation={updateInvalidations}
          type="password"
          validations={VALIDATION_REQUIRED}
          value={values.password}
        />
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        <FormButton disabled={isFormInvalid} loading={isRequestLoading}>
          Login
        </FormButton>
      </form>
      <NavigationMessage linkText="Sign up" route={ROUTES.SIGN_UP_PAGE}>
        Don&apos;t have an account?
      </NavigationMessage>
    </div>
  );
};

export default LoginView;
