import * as React from "react";
import { RouteComponentProps } from "react-router";

import SeasonForm from "components/Views/SeasonManager/SeasonForm";

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

  const handleSelectSeason = (season: Season): void => {
    if (selectedSeason && selectedSeason.id === season.id) {
      actions.emitDeselectSeason();
    } else {
      actions.emitSelectSeason(season);
    }
  };

  return (
    <div className="season-manager-view">
      <ul className="season-list">
        {seasons.map((season) => (
          <li key={season.id} className="season-list-item">
            <button
              type="button"
              className="btn-season"
              onClick={() => {
                handleSelectSeason(season);
              }}
            >
              <p className="set-name">
                <i className={`ss ss-${season.set.code}`} />
                {season.set.name}
              </p>
              <p className="date">{season.startedOn}</p>
            </button>
          </li>
        ))}
      </ul>
      {selectedSeason ? (
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
