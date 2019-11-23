import * as React from "react";

import { GettingStartedFields } from "components/Hooks/useFormData/models/FormFields";

import { Card } from "models/Card";

import "./styles.scss";

interface MetaStepProps {
  cards: Card[];
  updateValues: Function;
  values: GettingStartedFields;
}

const MetaStep = ({
  cards,
  updateValues,
  values
}: MetaStepProps): React.FunctionComponentElement<MetaStepProps> => {
  return (
    <div className="meta-step">

    </div>
  );
};

export default MetaStep;
