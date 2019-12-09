import * as React from "react";
import { RouteComponentProps } from "react-router";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import useFormData from "components/Hooks/useFormData";
import TypeAhead from "components/Form/TypeAhead";

import { Set } from "models/Set";
import { Season } from "models/Season";

import "./styles.scss";

interface SeasonManagerViewActions {
  requestGetSetByCode: Function;
}

interface SeasonManagerViewProps extends RouteComponentProps {
  actions: SeasonManagerViewActions;
  potentialSet: Set;
  searchForSet: boolean;
  seasons: Season[];
}

const SeasonManagerView = ({
  actions,
  history,
  potentialSet,
  searchForSet,
  seasons
}: SeasonManagerViewProps): React.FunctionComponentElement<SeasonManagerViewProps> => {
  const { values, updateValues } = useFormData({
    code: null
  });

  const setOptions = potentialSet
    ? [
        {
          label: potentialSet.name,
          key: potentialSet.id
        }
      ]
    : [];

  return (
    <div className="season-manager-view">
      <TypeAhead
        id="code"
        isSearching={searchForSet}
        label="Set Code"
        options={setOptions}
        searchHandler={actions.requestGetSetByCode}
        selectHandler={(option: TypeAheadOption) => {
          updateValues("code", option);
        }}
      />
    </div>
  );
};

export default SeasonManagerView;
