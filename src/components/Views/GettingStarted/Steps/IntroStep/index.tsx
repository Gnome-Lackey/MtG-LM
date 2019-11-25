import * as React from "react";

import "./styles.scss";

interface IntroStepProps {
  name: string;
}

const IntroStep = ({ name }: IntroStepProps): React.FunctionComponentElement<IntroStepProps> => (
  <div className="intro-step">
    <h1 className="line one">Welcome, Master {name}!</h1>
    <h3 className="line two">I&apos;ve been expecting you.</h3>
    <p className="line three">
      I&apos;ve scoured countless realms of the infinite cosmos. Yet I can&apos;t find any of your creations.
      Could it be you haven&apos;t created any yet? An outrageous presumption I know. I&apos;ll have
      myself flogged, but before I do so, if you&apos;d like to create a new world I would be
      more than happy to help.
    </p>
    <div className="section last">
      <span className="line four">
        Just click the <span className="emphasis">continue</span> button below ...&nbsp;
      </span>
      <small className="line five">
        or you can click <span className="emphasis">home</span>, and I will continue on to my
        flogging.
      </small>
    </div>
  </div>
);

export default IntroStep;
