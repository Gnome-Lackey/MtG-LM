import * as React from "react";

import TypeAhead from "components/Form/TypeAhead";
import FormInput from "components/Form/Input";
import FormButton from "components/Form/Button";

import useFormData from "components/Hooks/useFormData";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import { Player } from "models/Player";

import { PLAYER_A, PLAYER_B } from "constants/players";

import "./styles.scss";

interface RecordMatchModalContentProps {
  clearHandler: Function;
  isRequestLoading: boolean;
  potentialAPlayers: Player[];
  potentialBPlayers: Player[];
  searchingForAPlayers: boolean;
  searchingForBPlayers: boolean;
  searchHandler: Function;
  submitHandler: Function;
}

const RecordMatchModalContent: React.FunctionComponent<RecordMatchModalContentProps> = ({
  clearHandler,
  isRequestLoading,
  potentialAPlayers,
  potentialBPlayers,
  searchingForAPlayers,
  searchingForBPlayers,
  searchHandler,
  submitHandler
}: RecordMatchModalContentProps): React.FunctionComponentElement<RecordMatchModalContentProps> => {
  const { values, updateValues } = useFormData({
    playerA: null,
    playerB: null,
    playerAWins: 0,
    playerBWins: 0
  });

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    submitHandler(values);
  };

  const handleSearchForPlayerA = (value: string): void => {
    searchHandler(PLAYER_A, value);
  };

  const handleSearchForPlayerB = (value: string): void => {
    searchHandler(PLAYER_B, value);
  };

  const handleClearForPlayerA = (): void => {
    clearHandler(PLAYER_A);
  };

  const handleClearForPlayerB = (): void => {
    clearHandler(PLAYER_B);
  };

  const playerAOptions = potentialAPlayers.reduce(
    (aOptions: TypeAheadOption[], player: Player): TypeAheadOption[] => {
      if (!values.playerB || values.playerB.key !== player.id) {
        aOptions.push({
          label: player.displayName,
          key: player.id,
          subLabel: player.userName
        });
      }

      return aOptions;
    },
    []
  );

  const playerBOptions = potentialBPlayers.reduce(
    (bOptions: TypeAheadOption[], player: Player): TypeAheadOption[] => {
      if (!values.playerA || values.playerA.key !== player.id) {
        bOptions.push({
          label: player.displayName,
          key: player.id,
          subLabel: player.userName
        });
      }

      return bOptions;
    },
    []
  );

  const totalGames = values.playerAWins + values.playerBWins;
  const isDisabled = !values.playerA || !values.playerB || totalGames > 3;
  const isLoading = searchingForAPlayers || searchingForBPlayers || isRequestLoading;

  return (
    <form className="record-match-modal" onSubmit={handleSubmit}>
      <div className="record-row">
        <TypeAhead
          id="playerA"
          isSearching={searchingForAPlayers}
          label="Player A"
          options={playerAOptions}
          clearHandler={handleClearForPlayerA}
          searchHandler={handleSearchForPlayerA}
          selectHandler={(option: TypeAheadOption) => {
            updateValues("playerA", option);
          }}
        />
        <FormInput
          id="playerAWins"
          label="Wins"
          type="number"
          onChange={updateValues}
          value={values.playerAWins}
        />
      </div>
      <div className="record-row">
        <TypeAhead
          id="playerB"
          isSearching={searchingForBPlayers}
          label="Player B"
          clearHandler={handleClearForPlayerB}
          options={playerBOptions}
          searchHandler={handleSearchForPlayerB}
          selectHandler={(option: TypeAheadOption) => {
            updateValues("playerB", option);
          }}
        />
        <FormInput
          id="playerBWins"
          label="Wins"
          type="number"
          onChange={updateValues}
          value={values.playerBWins}
        />
      </div>
      <div className="record-actions">
        <FormButton type="submit" loading={isLoading} disabled={isDisabled}>
          Submit
        </FormButton>
      </div>
    </form>
  );
};

export default RecordMatchModalContent;
