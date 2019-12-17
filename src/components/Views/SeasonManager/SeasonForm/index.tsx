import * as React from "react";

import useFormData from "components/Hooks/useFormData";
import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import TypeAhead from "components/Form/TypeAhead";
import DatePicker from "components/Form/DatePicker";

import { Set } from "models/Set";
import { Player } from "models/Player";
import { Season } from "models/Season";

import { DISPLAY_DATE_FORMAT } from "constants/dates";

import "./styles.scss";

interface SeasonFormProps {
  fetchSetHandler: Function;
  potentialSets: Set[];
  potentialPlayers: Player[];
  searchForPlayer: boolean;
  searchForSet: boolean;
  searchPlayerHandler: Function;
  selectedSeason?: Season;
  submitHandler: Function;
}

const SeasonForm = ({
  fetchSetHandler,
  potentialPlayers,
  potentialSets,
  searchForPlayer,
  searchForSet,
  searchPlayerHandler,
  selectedSeason,
  submitHandler
}: SeasonFormProps): React.FunctionComponentElement<SeasonFormProps> => {
  const { values, updateValues } = useFormData({
    set: selectedSeason ? { key: selectedSeason.set.id, label: selectedSeason.set.name } : null,
    players: selectedSeason
      ? selectedSeason.players.map((player) => ({
          label: player.displayName,
          subLabel: player.userName,
          key: player.id
        }))
      : [],
    startedDate: selectedSeason ? selectedSeason.startedOn : "",
    endedDate: selectedSeason ? selectedSeason.endedOn : ""
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
    ? potentialPlayers.reduce((options, potentialPlayer): TypeAheadOption[] => {
        if (!values.players.some((player) => player.key === potentialPlayer.id)) {
          options.push({
            label: potentialPlayer.displayName,
            subLabel: potentialPlayer.userName,
            key: potentialPlayer.id
          });
        }

        return options;
      }, [])
    : [];

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    submitHandler(values);
  };

  return (
    <form className="season-form" onSubmit={handleSubmit}>
      <div className="season-detail-fields">
        <DatePicker
          id="startedDate"
          label="Starting Date"
          placeholder={DISPLAY_DATE_FORMAT}
          selectHandler={(value: string) => {
            updateValues("startedDate", value);
          }}
          value={values.startedDate}
        />
        <DatePicker
          id="endedDate"
          label="Ending Date"
          placeholder={DISPLAY_DATE_FORMAT}
          selectHandler={(value: string) => {
            updateValues("endedDate", value);
          }}
          value={values.endedDate}
        />
        <TypeAhead
          id="set"
          isSearching={searchForSet}
          label="Season Set Code"
          options={setOptions}
          searchHandler={fetchSetHandler}
          selectHandler={(option: TypeAheadOption) => {
            updateValues("set", option);
          }}
        />
      </div>
      <div className="season-players">
        <TypeAhead
          autoSubmit
          id="players"
          isSearching={searchForPlayer}
          label="Season Players"
          options={playerOptions}
          searchHandler={searchPlayerHandler}
          selectHandler={(option: TypeAheadOption) => {
            updateValues("players", [...values.players, option]);
          }}
        />
        <ul className="player-list">
          {values.players.map((playerOption) => (
            <li key={playerOption.key} className="player-list-item">
              <p>{playerOption.label}</p>
              <p>{playerOption.subLabel}</p>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SeasonForm;
