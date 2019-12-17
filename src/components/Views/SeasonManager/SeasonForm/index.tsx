import * as React from "react";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import TypeAhead from "components/Form/TypeAhead";
import DatePicker from "components/Form/DatePicker";

import useFormData from "components/Hooks/useFormData";
import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";

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

const buildFormState = (selectedSeason: Season): SeasonFields =>
  selectedSeason
    ? {
        set: { key: selectedSeason.set.id, label: selectedSeason.set.name },
        players: selectedSeason.players.map((player) => ({
          label: player.displayName,
          subLabel: player.userName,
          key: player.id
        })),
        startedDate: selectedSeason.startedOn ? selectedSeason.startedOn : "",
        endedDate: selectedSeason.endedOn ? selectedSeason.endedOn : ""
      }
    : {
        set: null,
        players: [],
        startedDate: "",
        endedDate: ""
      };

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
  const { values, updateValues, resetValues } = useFormData(buildFormState(selectedSeason));

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

  const handleRemovePlayer = (key: string): void => {
    const updatedPlayers = values.players.filter((player) => player.key !== key);

    updateValues("players", updatedPlayers);
  };

  React.useEffect(() => {
    resetValues(buildFormState(selectedSeason));
  }, [selectedSeason]);

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
              <p className="player-name">
                {playerOption.label}
              </p>
              <p className="player-epithet">
                {playerOption.subLabel}
              </p>
              <button
                className="btn-remove"
                type="button"
                onClick={() => handleRemovePlayer(playerOption.key)}
              >
                <i className="fas fa-times-circle" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SeasonForm;
