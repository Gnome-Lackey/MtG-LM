import * as React from "react";
import { RouteComponentProps } from "react-router";

import GettingStartedContent from "components/Views/GettingStarted/Content";
import GettingStartedButtons from "components/Views/GettingStarted/Buttons";
import ErrorMessage from "components/Common/ErrorMessage";
import Spinner from "components/Common/Spinner";

import useErrorMessage from "components/Hooks/useErrorMessage";
import useFormData from "components/Hooks/useFormData";
import useAuth from "components/Hooks/useAuth";

import { ErrorState } from "redux/models/ErrorState";

import { Card } from "models/Card";
import { User } from "models/User";

import { ROUTES } from "constants/routes";
import { DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE } from "constants/errors";

import "./styles.scss";

interface GettingStartedActions {
  emitResetError: Function;
  requestValidation: Function;
  requestCreatePlayer: Function;
  requestGettingStartedCards: Function;
}

interface GettingStartedViewProps extends RouteComponentProps {
  actions: GettingStartedActions;
  cards: Card[];
  errors: ErrorState;
  isRequestLoading: boolean;
  user: User;
  validated: boolean;
}

const FADE_IN_TIMEOUT = 750;
const MAX_STEP = 3;

const handleAnimation = (callback: Function): void => {
  const element = document.querySelector(`.getting-started-content.visible`);

  element.setAttribute("class", `getting-started-content`);

  setTimeout(() => callback(element), FADE_IN_TIMEOUT);
};

const handleStepIncrement = (step: number, setStep: Function): void => {
  handleAnimation((element: Element) => {
    if (step !== MAX_STEP) {
      element.setAttribute("class", `getting-started-content visible`);
      setStep(step + 1);
    }
  });
};

const handleStepDecrement = (step: number, setStep: Function): void => {
  handleAnimation((element: Element) => {
    if (step > 0) {
      element.setAttribute("class", `getting-started-content visible`);
      setStep(step - 1);
    }
  });
};

const GettingStartedView = ({
  actions,
  cards,
  errors,
  history,
  isRequestLoading,
  user,
  validated
}: GettingStartedViewProps): React.FunctionComponentElement<GettingStartedViewProps> => {
  const { values, updateValues } = useFormData({
    epithet: "",
    favoriteCard: null
  });

  const errorMessage = useErrorMessage(
    DOMAIN_ERROR_GETTING_STARTED,
    VIEW_ERROR_GETTING_STARTED_CREATE,
    errors,
    actions.emitResetError
  );

  const [step, setStep] = React.useState(0);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const isValidated = useAuth(validated, actions.requestValidation, history.push);
  const showSpinner = !isValidated || isRequestLoading;

  React.useEffect(() => {
    if (!pageLoaded) {
      setPageLoaded(true);

      actions.requestGettingStartedCards();
    }
  }, [pageLoaded]);

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    if (step === MAX_STEP) {
      actions.requestCreatePlayer(values);
    } else {
      handleStepIncrement(step, setStep);
    }
  };

  return (
    <React.Fragment>
      <form className="form-getting-started" onSubmit={handleSubmit}>
        <GettingStartedContent
          cards={cards}
          isValidated={isValidated}
          step={step}
          updateStep={setStep}
          updateValues={updateValues}
          user={user}
          values={values}
        />
        {errorMessage ? <ErrorMessage inline>{errorMessage}</ErrorMessage> : null}
        <GettingStartedButtons
          decrementHandler={() => {
            handleStepDecrement(step, setStep);
          }}
          incrementHandler={() => {
            handleStepIncrement(step, setStep);
          }}
          max={MAX_STEP}
          skipHandler={() => {
            history.push(ROUTES.HOME_PAGE);
          }}
          step={step}
          values={values}
        />
      </form>
      {showSpinner ? <Spinner /> : null}
    </React.Fragment>
  );
};

export default GettingStartedView;
