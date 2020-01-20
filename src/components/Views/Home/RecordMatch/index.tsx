import * as React from "react";
import * as uuid from "uuid";

import RecordRow from "components/Views/Home/RecordMatch/RecordRow";
import FormButton from "components/Form/Button";
import ButtonFancy from "components/Common/ButtonFancy";

import useFormData from "components/Hooks/useFormData";

import { buildInitialFormState, isSubmitDisabled } from "utils/recordMatchForm";

import { PlayerSearchResultMap } from "redux/models/PlayerState";

import "./styles.scss";

interface RecordMatchModalContentProps {
  clearHandler: Function;
  isRequestLoading: boolean;
  playerSearchResultsMap: PlayerSearchResultMap;
  searchHandler: Function;
  submitHandler: Function;
}

const RecordMatchModalContent: React.FunctionComponent<RecordMatchModalContentProps> = ({
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

  const handleAddPlayer = (): void => {
    updateValues("playerRecords", [
      ...values.playerRecords,
      { id: uuid.v4(), player: null, wins: 0 }
    ]);
  };

  const isDisabled = isSubmitDisabled(values);

  return (
    <form className="record-match-modal" onSubmit={handleSubmit}>
      <div className="record-container">
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
