import * as React from "react";

import PlayerList from "components/Views/SeasonManager/SeasonForm/PlayerList";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import TypeAhead from "components/Form/TypeAhead";
import DatePicker from "components/Form/DatePicker";
import FormCheckbox from "components/Form/CheckboxGroup/Checkbox";
import FormButton from "components/Form/Button";

import useFormData from "components/Hooks/useFormData";

import * as setMapper from "mappers/sets";

import { Set } from "models/Set";
import { Player } from "models/Player";
import { Season } from "models/Season";

import { isSubmitDisabled, buildInitialFormState } from "utils/seasonForm";

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
  const { values, updateValues, resetValues } = useFormData(buildInitialFormState(selectedSeason));

  const setOptions = potentialSets ? potentialSets.map(setMapper.toOption) : [];

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    if (selectedSeason) {
      submitHandler(selectedSeason.id, values);
    } else {
      submitHandler(values);
    }
  };

  React.useEffect(() => {
    resetValues(buildInitialFormState(selectedSeason));
  }, [selectedSeason]);

  const isFormLoading = isRequestLoading || searchForPlayer || searchForSet;
  const isDisabled = isSubmitDisabled(selectedSeason, values, isFormLoading);

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
