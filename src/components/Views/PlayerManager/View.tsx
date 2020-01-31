import * as React from "react";
import { RouteComponentProps } from "react-router";

import PlayerList from "components/Views/PlayerManager/PlayerList";
import PlayerForm from "components/Views/PlayerManager/PlayerForm";

import useDataFetch from "components/Hooks/useDataFetch";

import { PlayerDetails } from "models/Player";

import "./styles.scss";

interface PlayerManagerViewActions {
  requestGetPlayers: Function;
}

interface PlayerManagerViewProps extends RouteComponentProps {
  actions: PlayerManagerViewActions;
  players: PlayerDetails[];
}

const PlayerManagerView = ({
  actions,
  players
}: PlayerManagerViewProps): React.FunctionComponentElement<PlayerManagerViewProps> => {
  useDataFetch(!players.length, actions.requestGetPlayers);

  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="user-manager-view">
      <PlayerList
        deselectHandler={() => {}}
        players={players}
        selectHandler={() => {}}
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
