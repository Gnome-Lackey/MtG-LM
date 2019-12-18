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
import moment = require("moment");

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

const setToOption = (set: Set): TypeAheadOption => ({
  label: set.name,
  key: set.code
});

const buildFormState = (selectedSeason: Season): SeasonFields =>
  selectedSeason
    ? {
        set: setToOption(selectedSeason.set),
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

const isUpdateDisabled = (values: SeasonFields, season: Season): boolean =>
  !!season &&
  values.startedDate === season.startedOn &&
  values.isActive === season.isActive &&
  values.set.key === season.set.code &&
  (!values.endedDate || values.endedDate === season.endedOn) &&
  values.players.every(
    (player) => !!season.players.find((seasonPlayer) => seasonPlayer.id === player.key)
  );

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

    if (selectedSeason) {
      submitHandler(selectedSeason.id, values);
    } else {
      submitHandler(values);
    }
  };

  React.useEffect(() => {
    resetValues(buildFormState(selectedSeason));
  }, [selectedSeason]);

  const invalidDates =
    !values.endedDate ||
    moment(values.startedDate, DISPLAY_DATE_FORMAT).isAfter(
      moment(values.endedDate, DISPLAY_DATE_FORMAT)
    );

  const invalidEndDate = !values.isActive && !values.endedDate;
  const invalidRequiredFields = !values.startedDate || !values.set;
  const isFormLoading = isRequestLoading || searchForPlayer || searchForSet;
  const updateDisabled = isUpdateDisabled(values, selectedSeason);

  const isDisabled = isFormLoading || invalidRequiredFields || invalidEndDate || invalidDates || updateDisabled;

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
        <div className="set-container">
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
          {values.set ? <i className={`set-icon ss ss-${values.set.key}`} /> : null}
        </div>
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
