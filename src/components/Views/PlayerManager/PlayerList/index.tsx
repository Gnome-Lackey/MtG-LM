import * as React from "react";

import { PlayerDetails } from "models/Player";

import PlayerListItem from "./PlayerListItem";

import "./styles.scss";

interface PlayerListProps {
  deselectHandler: Function;
  players: PlayerDetails[];
  selectHandler: Function;
  selectedPlayer: PlayerDetails;
}

const PlayerList = ({
  deselectHandler,
  players,
  selectHandler,
  selectedPlayer
}: PlayerListProps): React.FunctionComponentElement<PlayerListProps> => (
  <ul className="player-list">
    {players.map((player) => (
      <PlayerListItem
        key={player.id}
        deselectHandler={deselectHandler}
        player={player}
        selectedPlayer={selectedPlayer}
        selectHandler={selectHandler}
      />
    ))}
  </ul>
);
export default PlayerList;
