import * as React from "react";
import * as uuid from "uuid";

import RecordRow from "components/Views/Home/RecordMatch/RecordRow";
import FormButton from "components/Form/Button";
import ButtonFancy from "components/Common/ButtonFancy";
import Dropdown from "components/Form/Dropdown";

import useFormData from "components/Hooks/useFormData";

import * as seasonMapper from "mappers/seasons";

import { PlayerSearchResultMap } from "redux/player/models/State";
import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";
import { Season } from "models/Season";
import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";

import "./styles.scss";

interface RecordMatchModalContentProps {
  activeSeasons: Season[];
  clearHandler: Function;
  isRequestLoading: boolean;
  playerSearchResultsMap: PlayerSearchResultMap;
  searchHandler: Function;
  selectedSeason: Season;
  submitHandler: Function;
}

const buildInitialFormState = (selectedSeasonOption: DropdownOption): RecordMatchFields => ({
  playerRecords: [
    { id: uuid.v4(), player: null, wins: 0 },
    { id: uuid.v4(), player: null, wins: 0 }
  ],
  season: selectedSeasonOption
});

const isSubmitDisabled = (fields: RecordMatchFields): boolean => {
  const { playerRecords } = fields;

  const hasInvalidSeason = !fields.season;
  const hasInvalidGameCount = playerRecords.reduce((total, record) => total + record.wins, 0) <= 0;
  const hasInvalidPlayers = playerRecords.some((record) => !record.player || record.wins < 0);

  return hasInvalidSeason || hasInvalidGameCount || hasInvalidPlayers;
};

const RecordMatchModalContent: React.FunctionComponent<RecordMatchModalContentProps> = ({
  activeSeasons,
  clearHandler,
  isRequestLoading,
  playerSearchResultsMap,
  searchHandler,
  selectedSeason,
  submitHandler
}: RecordMatchModalContentProps): React.FunctionComponentElement<RecordMatchModalContentProps> => {
  const selectedSeasonOption = selectedSeason ? seasonMapper.toOption(selectedSeason) : null;
  const seasonOptions = activeSeasons.length ? activeSeasons.map(seasonMapper.toOption) : [];

  const { values, updateValues } = useFormData(buildInitialFormState(selectedSeasonOption));

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    submitHandler(values);
  };

  const handleSearchForPlayer = (searchId: string, value: string): void => {
    searchHandler(searchId, value, selectedSeason.id);
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
          heightLimit={50}
          selectHandler={handleSelectSeason}
          key="season"
          emptyMessage="There are currently no active seasons."
          options={seasonOptions}
          placeholder="Select match season..."
          value={values.season}
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
