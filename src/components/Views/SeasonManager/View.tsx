import * as React from "react";
import { RouteComponentProps } from "react-router";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import useFormData from "components/Hooks/useFormData";
import TypeAhead from "components/Form/TypeAhead";
import DatePicker from "components/Form/DatePicker";

import { Set } from "models/Set";
import { SeasonDetails } from "models/Season";
import { Player } from "models/Player";

import { DISPLAY_DATE_FORMAT } from "constants/dates";

import "./styles.scss";

interface SeasonManagerViewActions {
  requestGetSetByCode: Function;
  requestQueryPlayers: Function;
}

interface SeasonManagerViewProps extends RouteComponentProps {
  actions: SeasonManagerViewActions;
  potentialSets: Set[];
  potentialPlayers: Player[];
  searchForPlayer: boolean;
  searchForSet: boolean;
  seasons: SeasonDetails[];
}

const SeasonManagerView = ({
  actions,
  potentialPlayers,
  potentialSets,
  searchForPlayer,
  searchForSet,
  seasons
}: SeasonManagerViewProps): React.FunctionComponentElement<SeasonManagerViewProps> => {
  const [selectedSeason, setSelectedSeason] = React.useState(null);

  const { values, updateValues } = useFormData({
    setOption: null,
    playerOptions: []
  });

  const setOptions = potentialSets
    ? potentialSets.map(
        (set): TypeAheadOption => ({
          label: set.name,
          key: set.id
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

  return (
    <div className="season-manager-view">
      <ul className="season-list">
        {seasons.map((season) => (
          <li key={season.id} className="season-list-item">
            <button
              type="button"
              onClick={() => {
                setSelectedSeason(season);
              }}
            >
              <p className="date">{season.startedOn}</p>
              <p className="set-name">{season.set.name}</p>
            </button>
          </li>
        ))}
      </ul>
      {selectedSeason ? (
        <form onSubmit={() => console.log("submitted")}>
          <DatePicker 
            id="startingDate"
            label="Starting Date"
            placeholder={DISPLAY_DATE_FORMAT}
            selectHandler={(value: string) => console.log(value)}
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
