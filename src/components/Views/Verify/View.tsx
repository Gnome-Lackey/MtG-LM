import * as React from "react";
import { RouteComponentProps } from "react-router";

import FormButton from "components/Form/Button";
import FormInput from "components/Form/Input";
import ResendCodeMessage from "components/Views/Verify/ResendCodeMessage";
import SuccessMessage from "components/Common/SuccessMessage";
import NavigationMessage from "components/Common/NavigationMessage";

import useNavigator from "components/Hooks/useNavigator";
import useFormData from "components/Hooks/useFormData";

import { VALIDATION_REQUIRED } from "constants/validations";
import { ROUTES } from "constants/routes";

import "./styles.scss";

interface VerifyViewActions {
  emitClearCodeNeeded: Function;
  emitClearCodeResent: Function;
  requestConfirm: Function;
  requestResendCode: Function;
}

interface VerifyViewProps extends RouteComponentProps {
  actions: VerifyViewActions;
  codeResent: boolean;
  confirmationCodeNeeded: boolean;
  confirmed: boolean;
  isRequestLoading: boolean;
  userName: string;
}

const VerifyView = ({
  actions: { emitClearCodeNeeded, emitClearCodeResent, requestConfirm, requestResendCode },
  codeResent,
  confirmationCodeNeeded,
  confirmed,
  history,
  isRequestLoading,
  userName
}: VerifyViewProps): React.FunctionComponentElement<VerifyViewProps> => {
  React.useEffect(() => {
    if (!userName) {
      history.push(ROUTES.ROOT);
    }
  }, [userName]);

  React.useEffect(() => () => emitClearCodeResent(), []);

  useNavigator(confirmed, ROUTES.ROOT, history.push);

  const { values, resetValues, invalidations, updateValues, updateInvalidations } = useFormData({
    code: ""
  });

  const isFormInvalid = !values.code;

  const submitHandler = (ev: React.FormEvent): void => {
    ev.preventDefault();

    requestConfirm(values);
  };

  const resendCodeHandler = (ev: React.FormEvent): void => {
    ev.preventDefault();

    resetValues({ code: "" });

    emitClearCodeNeeded();

    document.getElementById("code").focus();

    requestResendCode(values);
  };

  return (
    <div className="verify-view">
      <h1 className="title">Verify Account</h1>
      <form className="verify-form" onSubmit={submitHandler}>
        <FormInput
          errorMessage={invalidations.code}
          id="code"
          label="Verification Code"
          onChange={updateValues}
          onInvalidation={updateInvalidations}
          validations={VALIDATION_REQUIRED}
          value={values.code}
        />
        {confirmationCodeNeeded ? (
          <ResendCodeMessage
            clickHandler={resendCodeHandler}
            isLoading={isRequestLoading}
          />
        ) : null}
        {codeResent ? <SuccessMessage>Code successfully sent!</SuccessMessage> : null}
        {confirmationCodeNeeded ? null : (
          <FormButton disabled={isFormInvalid} loading={isRequestLoading}>
            Verify
          </FormButton>
        )}
      </form>
      <NavigationMessage linkText="Login" route={ROUTES.ROOT}>
        Already verified your account?
      </NavigationMessage>
    </div>
  );
};

export default VerifyView;
