import * as React from "react";
import { debounce } from "debounce";

import TypeAhead from "components/Form/TypeAhead";
import FormInput from "components/Form/Input";

import useFormData from "components/Hooks/useFormData";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import { Player } from "models/Player";

import { ACTIVE_PLAYER, DEFENDING_PLAYER } from "constants/players";

import "./styles.scss";
import FormButton from "components/Form/Button";

interface RecordMatchModalContentProps {
  isRequestLoading: boolean;
  potentialAPlayers: Player[];
  potentialBPlayers: Player[];
  searchingForActivePlayers: boolean;
  searchingForDefendingPlayers: boolean;
  searchHandler: Function;
  submitHandler: Function;
}

const RecordMatchModalContent: React.FunctionComponent<RecordMatchModalContentProps> = ({
  isRequestLoading,
  potentialAPlayers,
  potentialBPlayers,
  searchingForActivePlayers,
  searchingForDefendingPlayers,
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
    searchHandler(ACTIVE_PLAYER, value);
  };

  const handleSearchForPlayerB = (value: string): void => {
    searchHandler(DEFENDING_PLAYER, value);
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

  const isDisabled =
    !values.playerA || !values.playerB || values.playerAWins + values.playerAWins > 3;

  const isLoading = searchingForActivePlayers || searchingForDefendingPlayers || isRequestLoading;

  return (
    <form className="record-match-modal" onSubmit={handleSubmit}>
      <div className="record-row">
        <TypeAhead
          id="playerA"
          isSearching={searchingForActivePlayers}
          label="Player A"
          options={playerAOptions}
          searchHandler={debounce(handleSearchForPlayerA, 250)}
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
          isSearching={searchingForDefendingPlayers}
          label="Player B"
          options={playerBOptions}
          searchHandler={debounce(handleSearchForPlayerB, 250)}
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
