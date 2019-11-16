import * as React from "react";

import ErrorMessage from "components/Common/ErrorMessage";

interface FormInputHeaderProps {
  label: string;
  isRequired: boolean;
  error: string;
}

const FormInputHeader = ({
  label,
  isRequired,
  error
}: FormInputHeaderProps): React.FunctionComponentElement<FormInputHeaderProps> => (
  <div className="input-header">
    {label ? (
      <span className="title">
        {label}
        {isRequired ? <span className="required">*</span> : null}
      </span>
    ) : null}
    {error ? <ErrorMessage inline>{error}</ErrorMessage> : null}
  </div>
);

export default FormInputHeader;
