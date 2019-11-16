import * as React from "react";

import FormButton from "components/Form/Button";
import ErrorMessage from "components/Common/ErrorMessage";

import "./styles.scss";

interface ResendCodeMessageProps {
  closeHandler: React.MouseEventHandler<HTMLButtonElement>;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
}

const ResendCodeMessage = ({
  closeHandler,
  clickHandler,
  isLoading
}: ResendCodeMessageProps): React.FunctionComponentElement<ResendCodeMessageProps> => (
  <div className="resend-code-message">
    <ErrorMessage>
      Planeswalker, the code you entered is either expired or incorrect! Click one of the options below to continue.
    </ErrorMessage>
    <div className="actions">
      <FormButton loading={isLoading} type="button" onClick={clickHandler}>
        Resend Code
      </FormButton>
      <FormButton className="alt-btn" disabled={isLoading} type="button" onClick={closeHandler}>
        Retry Code
      </FormButton>
    </div>
  </div>
);

export default ResendCodeMessage;
