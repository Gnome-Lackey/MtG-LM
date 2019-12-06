import * as React from "react";
import { RouteComponentProps } from "react-router";

import { Set } from "models/Set";

import "./styles.scss";
import useDataFetch from "components/Hooks/useDataFetch";

interface SeasonManagerViewActions {
  requestSets: Function;
}

interface SeasonManagerViewProps extends RouteComponentProps {
  actions: SeasonManagerViewActions;
  isRequestLoading: boolean;
  sets: Set[];
}

const SeasonManagerView = ({
  actions,
  history,
  isRequestLoading,
  sets
}: SeasonManagerViewProps): React.FunctionComponentElement<SeasonManagerViewProps> => {
  useDataFetch(!sets.length, actions.requestSets);

  return (
    <div className="verify-view">
      <p>Season Manager Page</p>
    </div>
  );
};

export default SeasonManagerView;
