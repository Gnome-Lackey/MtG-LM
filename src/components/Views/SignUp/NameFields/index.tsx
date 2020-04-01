import * as React from "react";

import FormInput from "components/Form/Input";

import "./styles.scss";
import { VALIDATION_REQUIRED } from "constants/validations";
import { SignUpFields } from "components/Hooks/useResetForm/models/FormFields";

interface NameFieldsProps {
  firstName: string;
  invalidations: SignUpFields;
  lastName: string;
  onChange: Function;
  onInvalidation: Function;
}

const NameFields = ({
  firstName,
  invalidations,
  lastName,
  onChange,
  onInvalidation
}: NameFieldsProps): React.FunctionComponentElement<NameFieldsProps> => (
  <div className="name-fields">
    <FormInput
      errorMessage={invalidations.firstName}
      id="firstName"
      label="First Name"
      onChange={onChange}
      onInvalidation={onInvalidation}
      validations={VALIDATION_REQUIRED}
      value={firstName}
    />
    <FormInput
      errorMessage={invalidations.lastName}
      id="lastName"
      label="Last Name"
      onChange={onChange}
      onInvalidation={onInvalidation}
      validations={VALIDATION_REQUIRED}
      value={lastName}
    />
  </div>
);

export default NameFields;
