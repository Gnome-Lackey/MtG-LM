import * as React from "react";

import FormInput from "components/Form/Input";

import "./styles.scss";

interface NameFieldsProps {
  firstName: string;
  lastName: string;
  onChange: Function;
}

const NameFields = ({
  firstName,
  lastName,
  onChange
}: NameFieldsProps): React.FunctionComponentElement<NameFieldsProps> => (
  <div className="name-fields">
    <FormInput id="firstName" label="First Name" onChange={onChange} value={firstName} />
    <FormInput id="lastName" label="Last Name" onChange={onChange} value={lastName} />
  </div>
);

export default NameFields;
