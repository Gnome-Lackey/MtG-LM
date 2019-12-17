import * as React from "react";
import { RouteComponentProps } from "react-router";

import useFormData from "components/Hooks/useFormData";
import useDataFetch from "components/Hooks/useDataFetch";
import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import TypeAhead from "components/Form/TypeAhead";
import DatePicker from "components/Form/DatePicker";

import { Set } from "models/Set";
import { Season } from "models/Season";
import { Player } from "models/Player";

import { DISPLAY_DATE_FORMAT } from "constants/dates";

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

  const { values, updateValues } = useFormData({
    setOption: null,
    playerOptions: [],
    startedDate: "",
    endedDate: ""
  });

  const setOptions = potentialSets
    ? potentialSets.map(
        (set): TypeAheadOption => ({
          label: set.name,
          key: set.code
        })
      )
    : [];

  const playerOptions = potentialPlayers
    ? potentialPlayers.reduce((options, player): TypeAheadOption[] => {
        if (!values.playerOptions.some((playerOption) => playerOption.key === player.id)) {
          options.push({
            label: player.displayName,
            subLabel: player.userName,
            key: player.id
          });
        }

        return options;
      }, [])
    : [];

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    actions.requestCreateSeason(values);
  };

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
              onClick={() => {
                handleSelectSeason(season);
              }}
            >
              <p className="date">{season.startedOn}</p>
              <p className="set-name">{season.set.name}</p>
            </button>
          </li>
        ))}
      </ul>
      {selectedSeason ? (
        <form onSubmit={handleSubmit}>
          <DatePicker
            id="dateStarted"
            label="Starting Date"
            placeholder={DISPLAY_DATE_FORMAT}
            selectHandler={(value: string) => {
              updateValues("dateStarted", value);
            }}
          />
          <DatePicker
            id="dateEnded"
            label="Ending Date"
            placeholder={DISPLAY_DATE_FORMAT}
            selectHandler={(value: string) => {
              updateValues("dateEnded", value);
            }}
          />
          <TypeAhead
            id="setOption"
            isSearching={searchForSet}
            label="Season Set Code"
            options={setOptions}
            searchHandler={actions.requestGetSetByCode}
            selectHandler={(option: TypeAheadOption) => {
              updateValues("setOption", option);
            }}
          />
          <TypeAhead
            autoSubmit
            id="playerOptions"
            isSearching={searchForPlayer}
            label="Season Players"
            options={playerOptions}
            searchHandler={actions.requestQueryPlayers}
            selectHandler={(option: TypeAheadOption) => {
              updateValues("playerOptions", [...values.playerOptions, option]);
            }}
          />
          <ul className="player-list">
            {values.playerOptions.map((playerOption) => (
              <li key={playerOption.key} className="player-list-item">
                <p>{playerOption.label}</p>
                <p>{playerOption.subLabel}</p>
              </li>
            ))}
          </ul>
        </form>
      ) : null}
    </div>
  );
};

export default SeasonManagerView;
