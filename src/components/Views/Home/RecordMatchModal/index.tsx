import * as React from "react";
import { debounce } from "debounce";

import { RouteComponentProps } from "react-router";

import TypeAhead from "components/Form/TypeAhead";
import FormInput from "components/Form/Input";

import useFormData from "components/Hooks/useFormData";

import { TypeAheadOption } from "components/Form/TypeAhead/models/TypeAheadOption";
import { Player } from "models/Player";

import "./styles.scss";

interface RecordMatchModalProps extends RouteComponentProps {
  potentialAPlayers: Player[];
  potentialBPlayers: Player[];
  searchHandler: Function;
  submitHandler: Function;
}

const RecordMatchModal: React.FunctionComponent<RecordMatchModalProps> = ({
  potentialAPlayers,
  potentialBPlayers,
  searchHandler,
  submitHandler
}: RecordMatchModalProps): React.FunctionComponentElement<RecordMatchModalProps> => {
  const [searchingForPlayerA, setSearchingForPlayerA] = React.useState(false);
  const [searchingForPlayerB, setSearchingForPlayerB] = React.useState(false);

  const { values, updateValues } = useFormData({
    playerA: null,
    playerB: null,
    playerAWins: 0,
    playerALosses: 0,
    playerBWins: 0,
    playerBLosses: 0
  });

  React.useEffect(() => {
    setSearchingForPlayerA(false);
  }, [potentialAPlayers]);

  React.useEffect(() => {
    setSearchingForPlayerB(false);
  }, [potentialBPlayers]);

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    submitHandler(values);
  };

  const handleSearchForPlayerA = (value: string): void => {
    setSearchingForPlayerA(true);

    searchHandler(value);
  };

  const handleSearchForPlayerB = (value: string): void => {
    setSearchingForPlayerB(true);

    searchHandler(value);
  };

  const playerAOptions = potentialAPlayers.map(
    (player: Player): TypeAheadOption => ({
      key: player.id,
      label: player.name
    })
  );

  const playerBOptions = potentialBPlayers.map(
    (player: Player): TypeAheadOption => ({
      key: player.id,
      label: player.name
    })
  );

  return (
    <form className="record-match-modal" onSubmit={handleSubmit}>
      <div className="record-row">
        <TypeAhead
          id="playerA"
          isSearching={searchingForPlayerA}
          label="Player A"
          options={playerAOptions}
          searchHandler={debounce(handleSearchForPlayerA, 250)}
          selectHandler={(option: TypeAheadOption) => {
            updateValues("playerA", option);
          }}
          selectedOption={values.playerA}
        />
        <FormInput
          id="playerAWins"
          label="Wins"
          type="number"
          onChange={(value: string) => updateValues("playerAWins", parseInt(value, 10))}
          value={values.playerAWins}
        />
        <FormInput
          id="playerALosses"
          label="Losses"
          type="number"
          onChange={(value: string) => updateValues("playerALosses", parseInt(value, 10))}
          value={values.playerALosses}
        />
      </div>
      <div className="record-row">
        <TypeAhead
          id="playerB"
          isSearching={searchingForPlayerB}
          label="Player B"
          options={playerBOptions}
          searchHandler={debounce(handleSearchForPlayerB, 250)}
          selectHandler={(option: TypeAheadOption) => {
            updateValues("playerB", option);
          }}
          selectedOption={values.playerB}
        />
        <FormInput
          id="playerBWins"
          label="Wins"
          type="number"
          onChange={(value: string) => updateValues("playerBWins", parseInt(value, 10))}
          value={values.playerBWins}
        />
        <FormInput
          id="playerBLosses"
          label="Losses"
          type="number"
          onChange={(value: string) => updateValues("playerBLosses", parseInt(value, 10))}
          value={values.playerBLosses}
        />
      </div>
    </form>
  );
};

export default RecordMatchModal;
