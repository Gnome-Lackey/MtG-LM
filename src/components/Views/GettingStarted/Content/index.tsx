import * as React from "react";

import CardStep from "components/Views/GettingStarted/Steps/CardStep";
import IntroStep from "components/Views/GettingStarted/Steps/IntroStep";
import OutroStep from "components/Views/GettingStarted/Steps/OutroStep";
import EpithetStep from "components/Views/GettingStarted/Steps/EpithetStep";

import { GettingStartedFields } from "components/Hooks/useFormData/models/FormFields";

import { Card } from "models/Scryfall";
import { User } from "models/User";

import "./styles.scss";

interface GettingStartedContentProps {
  cards: Card[];
  isValidated: boolean;
  step: number;
  updateStep: Function;
  updateValues: Function;
  user: User;
  values: GettingStartedFields;
}

const GettingStartedContent = ({
  cards,
  isValidated,
  step,
  updateStep,
  updateValues,
  user,
  values
}: GettingStartedContentProps): React.FunctionComponentElement<GettingStartedContentProps> => {
  React.useEffect(() => {
    if (isValidated) {
    const element = document.querySelector(`.getting-started-content`);

    element.setAttribute("class", "getting-started-content visible");
    }
  }, []);

  const userName = user ? user.userName : "";

  return (
    <div className="getting-started-content">
      {
        [
          <IntroStep key="step-intro" name={userName} />,
          <CardStep
            key="step-card"
            cards={cards}
            selectedCard={values.favoriteCard}
            updateValues={updateValues}
          />,
          <EpithetStep
            key="step-epithet"
            selectedCard={values.favoriteCard}
            selectedEpithet={values.epithet}
            updateValues={updateValues}
            user={user}
          />,
          <OutroStep key="step-outro" updateStep={updateStep} values={values} />
        ][step]
      }
    </div>
  );
};

export default GettingStartedContent;
