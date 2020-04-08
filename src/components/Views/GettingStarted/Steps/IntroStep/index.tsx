import * as React from "react";

import "./styles.scss";

interface IntroStepProps {
  name: string;
}

const IntroStep = ({ name }: IntroStepProps): React.FunctionComponentElement<IntroStepProps> => (
  <div className="intro-step">
    <h1 className="line one">Welcome, Planeswalker {name}!</h1>
    <h3 className="line two">You&apos;ve been expected.</h3>
    <p className="line three">
      Before you are welcomed in to the league we must ask you a few questions so that we may
      determine if you are worthy enough to enter.
    </p>
    <div className="section last">
      <span className="line four">
        To get started just click the <span className="emphasis">continue</span> button below
        ...&nbsp;
      </span>
    </div>
  </div>
);

export default IntroStep;
