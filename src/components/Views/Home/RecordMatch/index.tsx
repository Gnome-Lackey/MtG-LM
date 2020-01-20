import * as React from "react";
import * as uuid from "uuid";

import RecordRow from "components/Views/Home/RecordMatch/RecordRow";
import FormButton from "components/Form/Button";
import ButtonFancy from "components/Common/ButtonFancy";
import Dropdown from "components/Form/Dropdown";

import useFormData from "components/Hooks/useFormData";

import * as seasonMapper from "mappers/seasons";

import { buildInitialFormState, isSubmitDisabled } from "utils/recordMatchForm";

import { PlayerSearchResultMap } from "redux/models/PlayerState";
import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";
import { Season } from "models/Season";

import "./styles.scss";

interface RecordMatchModalContentProps {
  activeSeasons: Season[];
  clearHandler: Function;
  isRequestLoading: boolean;
  playerSearchResultsMap: PlayerSearchResultMap;
  searchHandler: Function;
  submitHandler: Function;
}

const RecordMatchModalContent: React.FunctionComponent<RecordMatchModalContentProps> = ({
  activeSeasons,
  clearHandler,
  isRequestLoading,
  playerSearchResultsMap,
  searchHandler,
  submitHandler
}: RecordMatchModalContentProps): React.FunctionComponentElement<RecordMatchModalContentProps> => {
  const { values, updateValues } = useFormData(buildInitialFormState());

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    submitHandler(values);
  };

  const handleSearchForPlayer = (searchId: string, value: string): void => {
    searchHandler(searchId, value);
  };

  const handleSelectSeason = (option: DropdownOption): void => {
    updateValues("season", option);
  };

  const handleAddPlayer = (): void => {
    updateValues("playerRecords", [
      ...values.playerRecords,
      { id: uuid.v4(), player: null, wins: 0 }
    ]);
  };

  const isDisabled = isSubmitDisabled(values);

  return (
    <form className="record-match-modal" onSubmit={handleSubmit}>
      <div className="record-season">
        <Dropdown
          selectHandler={handleSelectSeason}
          key="season"
          options={activeSeasons.map(seasonMapper.toOption)}
          placeholder="Select match season..."
        />
      </div>
      <div className="record-players">
        {values.playerRecords.map((record) => (
          <RecordRow
            key={record.id}
            record={record}
            playerSearchResultsMap={playerSearchResultsMap}
            clearHandler={clearHandler}
            searchHandler={handleSearchForPlayer}
            updateValues={updateValues}
            playerRecords={values.playerRecords}
          />
        ))}
      </div>
      <div className="record-actions">
        <ButtonFancy clickHandler={handleAddPlayer} type="button" style="highlight">
          Add Player
        </ButtonFancy>
        <FormButton type="submit" loading={isRequestLoading} disabled={isDisabled}>
          Submit
        </FormButton>
      </div>
    </form>
  );
};

export default RecordMatchModalContent;
