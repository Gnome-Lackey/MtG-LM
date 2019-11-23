import * as React from "react";

import ColorStep from "components/Views/GettingStarted/Steps/ColorStep";
import IntroStep from "components/Views/GettingStarted/Steps/IntroStep";
import OutroStep from "components/Views/GettingStarted/Steps/OutroStep";

import { GettingStartedFields } from "components/Hooks/useFormData/models/FormFields";

import { Card } from "models/Card";

import "./styles.scss";

interface GettingStartedContentProps {
  cards: Card[];
  isValidated: boolean;
  step: number;
  updateStep: Function;
  updateValues: Function;
  userName: string;
  values: GettingStartedFields;
}

const GettingStartedContent = ({
  cards,
  isValidated,
  step,
  updateStep,
  updateValues,
  userName,
  values
}: GettingStartedContentProps): React.FunctionComponentElement<GettingStartedContentProps> => {
  React.useEffect(() => {
    if (isValidated) {
      const element = document.querySelector(`.getting-started-content`);

      element.setAttribute("class", `getting-started-content visible`);
    }
  }, [isValidated]);
  
  return (
    <div className="getting-started-content">
      {
        [
          <IntroStep key="step-intro" name={userName} />,
          <ColorStep key="step-color" cards={cards} updateValues={updateValues} values={values} />,
          <OutroStep key="step-outro" updateStep={updateStep} values={values} />
        ][step]
      }
    </div>
  );
};

export default GettingStartedContent;
