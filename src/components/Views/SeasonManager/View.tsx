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

  const [showForm, setShowForm] = React.useState(false);

  const handleSelectSeason = (season: Season): void => {
    if (selectedSeason && selectedSeason.id === season.id) {
      actions.emitDeselectSeason();

      setShowForm(false);
    } else {
      actions.emitSelectSeason(season);

      setShowForm(true);
    }
  };

  const handleCreateNewSeason = (): void => {
    if (selectedSeason) {
      actions.emitDeselectSeason();
    }

    setShowForm(true);
  };

  return (
    <div className="season-manager-view">
      <ul className="season-list">
        <li className="season-list-item fixed">
          <button
            type="button"
            className="btn-season"
            onClick={() => {
              handleCreateNewSeason();
            }}
          >
            <i className="fas fa-plus-circle" />
            <span className="title">Create New Season</span>
          </button>
        </li>
        {seasons.map((season) => (
          <li key={season.id} className="season-list-item">
            <button
              type="button"
              className="btn-season"
              onClick={() => {
                handleSelectSeason(season);
              }}
            >
              <div className="season-description">
                <p className="season-set-name">
                  <i className={`ss ss-${season.set.code}`} />
                  {season.set.name}
                </p>
                {season.isActive ? <span className="indicator" /> : null}
              </div>
              <p className="season-date-range">
                {`${season.startedOn} - ${season.endedOn || "present"}`}
              </p>
            </button>
          </li>
        ))}
      </ul>
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
