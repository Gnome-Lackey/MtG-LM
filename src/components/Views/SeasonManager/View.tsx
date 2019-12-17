import * as React from "react";
import { RouteComponentProps } from "react-router";

import SeasonForm from "components/Views/SeasonManager/SeasonForm";
import SeasonList from "components/Views/SeasonManager/SeasonList";

import useDataFetch from "components/Hooks/useDataFetch";

import { Set } from "models/Set";
import { Season } from "models/Season";
import { Player } from "models/Player";

import "./styles.scss";

interface SeasonManagerViewActions {
  requestGetSetByCode: Function;
  requestQueryPlayers: Function;
  emitSelectSeason: Function;
  emitDeselectSeason: Function;
  requestCreateSeason: Function;
  requestGetSeasons: Function;
}

interface SeasonManagerViewProps extends RouteComponentProps {
  actions: SeasonManagerViewActions;
  potentialSets: Set[];
  potentialPlayers: Player[];
  searchForPlayer: boolean;
  searchForSet: boolean;
  selectedSeason: Season;
  seasons: Season[];
}

const SeasonManagerView = ({
  actions,
  potentialPlayers,
  potentialSets,
  searchForPlayer,
  searchForSet,
  selectedSeason,
  seasons
}: SeasonManagerViewProps): React.FunctionComponentElement<SeasonManagerViewProps> => {
  useDataFetch(!seasons.length, actions.requestGetSeasons);

  const [showForm, setShowForm] = React.useState(false);

  const handleSelectSeason = (season: Season): void => {
    actions.emitSelectSeason(season);

    setShowForm(true);
  };

  const handleDeselectSeason = (): void => {
    actions.emitDeselectSeason();

    setShowForm(false);
  };

  const handleCreateNewSeason = (): void => {
    if (selectedSeason) {
      actions.emitDeselectSeason();
    }

    setShowForm(true);
  };

  return (
    <div className="season-manager-view">
      <SeasonList
        createHandler={handleCreateNewSeason}
        deselectHandler={handleDeselectSeason}
        seasons={seasons}
        selectHandler={handleSelectSeason}
        selectedSeason={selectedSeason}
        showForm={showForm}
      />
      {showForm ? (
        <SeasonForm
          potentialPlayers={potentialPlayers}
          potentialSets={potentialSets}
          searchForPlayer={searchForPlayer}
          searchForSet={searchForSet}
          selectedSeason={selectedSeason}
          fetchSetHandler={actions.requestGetSetByCode}
          searchPlayerHandler={actions.requestQueryPlayers}
          submitHandler={actions.requestCreateSeason}
        />
      ) : null}
    </div>
  );
};

export default SeasonManagerView;
