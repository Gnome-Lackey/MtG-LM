import * as React from "react";

import "./styles.scss";

interface FormInputHeaderProps {
  label: string;
  isRequired: boolean;
}

const FormInputHeader = ({
  label,
  isRequired
}: FormInputHeaderProps): React.FunctionComponentElement<FormInputHeaderProps> => (
  <div className="input-header">
    {label ? (
      <span className="title">
        {label}
        {isRequired ? <span className="required">*</span> : null}
      </span>
    ) : null}
  </div>
);

export default FormInputHeader;
