import * as React from "react";
import { RouteComponentProps } from "react-router";

import PlayerList from "components/Views/PlayerManager/PlayerList";
import PlayerForm from "components/Views/PlayerManager/PlayerForm";

import useDataFetch from "components/Hooks/useDataFetch";

import { PlayerDetails } from "models/Player";

import "./styles.scss";

interface PlayerManagerViewActions {
  emitSelectPlayerForEditing: Function;
  emitDeselectPlayerForEditing: Function;
  requestGetPlayers: Function;
}

interface PlayerManagerViewProps extends RouteComponentProps {
  actions: PlayerManagerViewActions;
  players: PlayerDetails[];
  selectedPlayer: PlayerDetails;
}

const PlayerManagerView = ({
  actions,
  players,
  selectedPlayer
}: PlayerManagerViewProps): React.FunctionComponentElement<PlayerManagerViewProps> => {
  useDataFetch(!players.length, actions.requestGetPlayers);

  const [showForm, setShowForm] = React.useState(false);

  const handleSelectPlayer = (player: PlayerDetails): void => {
    actions.emitSelectPlayerForEditing(player);

    setShowForm(true);
  };

  const handleDeselectPlayer = (): void => {
    actions.emitDeselectPlayerForEditing();

    setShowForm(false);
  };

  return (
    <div className="user-manager-view">
      <PlayerList
        deselectHandler={handleDeselectPlayer}
        players={players}
        selectHandler={handleSelectPlayer}
        selectedPlayer={selectedPlayer}
      />
      {showForm ? (
        <PlayerForm
          isRequestLoading={false}
          selectedPlayer={selectedPlayer}
          submitHandler={() => {}}
        />
      ) : null}
    </div>
  );
};

export default PlayerManagerView;
