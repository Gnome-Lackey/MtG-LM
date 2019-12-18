import * as React from "react";

import PlayerList from "components/Views/SeasonManager/SeasonForm/PlayerList";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import TypeAhead from "components/Form/TypeAhead";
import DatePicker from "components/Form/DatePicker";
import FormCheckbox from "components/Form/CheckboxGroup/Checkbox";
import FormButton from "components/Form/Button";

import useFormData from "components/Hooks/useFormData";
import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";

import { Set } from "models/Set";
import { Player } from "models/Player";
import { Season } from "models/Season";

import { DISPLAY_DATE_FORMAT } from "constants/dates";

import "./styles.scss";

interface SeasonFormProps {
  fetchSetHandler: Function;
  isRequestLoading: boolean;
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
        endedDate: selectedSeason.endedOn ? selectedSeason.endedOn : "",
        isActive: selectedSeason.isActive || false
      }
    : {
        set: null,
        players: [],
        startedDate: "",
        endedDate: "",
        isActive: false
      };

const setToOption = (set: Set): TypeAheadOption => ({
  label: set.name,
  key: set.code
});

const isUpdateDisabled = (keys: string[], values: SeasonFields, selectedSeason: Season): boolean =>
  !!selectedSeason && keys.every((key: string) => values[key] === selectedSeason[key]);

const SeasonForm = ({
  fetchSetHandler,
  isRequestLoading,
  potentialPlayers,
  potentialSets,
  searchForPlayer,
  searchForSet,
  searchPlayerHandler,
  selectedSeason,
  submitHandler
}: SeasonFormProps): React.FunctionComponentElement<SeasonFormProps> => {
  const { values, updateValues, resetValues } = useFormData(buildFormState(selectedSeason));

  const setOptions = potentialSets ? potentialSets.map(setToOption) : [];

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    submitHandler(values);
  };

  React.useEffect(() => {
    resetValues(buildFormState(selectedSeason));
  }, [selectedSeason]);

  const invalidEndDate = !values.isActive && !values.endedDate;
  const invalidRequiredFields = !values.startedDate || !values.set;
  const isFormLoading = isRequestLoading || searchForPlayer || searchForSet;
  const isDisabled =
    isFormLoading ||
    invalidRequiredFields ||
    invalidEndDate ||
    isUpdateDisabled(Object.keys(values), values, selectedSeason);

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
        <FormCheckbox
          checked={values.isActive}
          className="season-is-active"
          id="isActive"
          onChange={updateValues}
          label="Will this season be active?"
        />
        <FormButton loading={isRequestLoading} type="submit" disabled={isDisabled}>
          Submit
        </FormButton>
      </div>
      <PlayerList
        players={values.players}
        potentialPlayers={potentialPlayers}
        searchForPlayer={searchForPlayer}
        searchPlayerHandler={searchPlayerHandler}
        updateValues={updateValues}
      />
    </form>
  );
};

export default SeasonForm;
