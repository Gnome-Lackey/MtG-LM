import * as React from "react";

import ButtonFancy from "components/Common/ButtonFancy";

import useScrollToElement from "components/Hooks/useScrollToElement";

import { GettingStartedFields } from "components/Hooks/useFormData/models/FormFields";

import "./styles.scss";

interface OutroStepProps {
  updateStep: Function;
  values: GettingStartedFields;
}

const OutroStep = ({
  updateStep,
  values
}: OutroStepProps): React.FunctionComponentElement<OutroStepProps> => {
  useScrollToElement("outroContainer", [values]);

  return (
    <div id="outroContainer" className="outro-step">
      <h1 className="line one">We&apos;re all finished!</h1>
      <h3 className="line two">Take a look at your player information.</h3>
      <p className="line three">
        If there are any edits you would like to make just click the back button or the title of the
        section you want to update.
      </p>
      <dl className="line four details">
        <dt>
          <ButtonFancy
            className="outro-link"
            clickHandler={() => {
              updateStep(1);
            }}
          >
            Spirit Animal
          </ButtonFancy>
        </dt>
        <dd>
          <img className="card-image" src={values.favoriteCard.image} alt={values.favoriteCard.name} />
        </dd>
        <dt>
          <ButtonFancy
            className="outro-link"
            clickHandler={() => {
              updateStep(2);
            }}
          >
            Epithet
          </ButtonFancy>
        </dt>
        <dd>
          <span className="emphasis">{values.epithet || "Skipped..."}</span>
        </dd>
      </dl>
    </div>
  );
};

export default OutroStep;
