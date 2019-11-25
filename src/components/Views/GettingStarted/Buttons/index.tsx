import * as React from "react";

import ButtonFancy from "components/Common/ButtonFancy";

import { MouseButtonEventFunction } from "models/Event";
import { GettingStartedFields } from "components/Hooks/useFormData/models/FormFields";

import "./styles.scss";

interface GettingStartedButtonsProps {
  decrementHandler: MouseButtonEventFunction;
  incrementHandler: MouseButtonEventFunction;
  max: number;
  skipHandler: MouseButtonEventFunction;
  step: number;
  values: GettingStartedFields;
}

const buildButtonDisabledStates = (
  step: number,
  values: GettingStartedFields
): { continue: boolean; skip: boolean } => {
  switch (step) {
    case 1:
      return { continue: !values.favoriteCard, skip: true };
    case 2:
        return { continue: !values.epithet, skip: false };
    default:
      return { continue: false, skip: false };
  }
};

const renderSkipButton = (
  firstStep: boolean,
  lastStep: boolean,
  disableSkip: boolean,
  incrementHandler: MouseButtonEventFunction,
  skipHandler: MouseButtonEventFunction
): React.FunctionComponentElement<any> => {
  if (firstStep) {
    return <ButtonFancy clickHandler={skipHandler}>Home</ButtonFancy>;
  } else if (lastStep) {
    return null;
  } else {
    return (
      <ButtonFancy disabled={disableSkip} clickHandler={incrementHandler}>
        Skip
      </ButtonFancy>
    );
  }
};

const renderContinueButton = (
  notLastStep: boolean,
  disableContinue: boolean,
  incrementHandler: MouseButtonEventFunction
): React.FunctionComponentElement<any> =>
  notLastStep ? (
    <ButtonFancy clickHandler={incrementHandler} disabled={disableContinue}>
      Continue
    </ButtonFancy>
  ) : (
    <ButtonFancy type="submit">Finish</ButtonFancy>
  );

const GettingStartedButtons = ({
  decrementHandler,
  incrementHandler,
  max,
  skipHandler,
  step,
  values
}: GettingStartedButtonsProps): React.FunctionComponentElement<GettingStartedButtonsProps> => {
  const { continue: continueDisabled, skip: skipDisabled } = buildButtonDisabledStates(step, values);
  
  const notFirstStep = step > 0;
  const notLastStep = step < max;

  return (
    <div className="btns-getting-started">
      <ButtonFancy disabled={!notFirstStep} clickHandler={decrementHandler}>
        Back
      </ButtonFancy>
      {renderSkipButton(!notFirstStep, !notLastStep, skipDisabled, incrementHandler, skipHandler)}
      {renderContinueButton(notLastStep, continueDisabled, incrementHandler)}
    </div>
  );
};

export default GettingStartedButtons;
