import * as React from "react";

import { Player } from "models/Player";
import { User } from "models/User";

import PlayerRecordListItem from "components/Views/Home/PlayerRecordList/PlayerRecordListItem";

import "./styles.scss";

interface PlayerRecordListProps {
  players: Player[];
  user: User;
}

const PlayerRecordList: React.FunctionComponent<PlayerRecordListProps> = ({
  players,
  user
}: PlayerRecordListProps): React.FunctionComponentElement<PlayerRecordListProps> => (
  <ul className="player-record-list">
    <li className="record-headers">
      <p className="header name">Player Name</p>
      <p className="header">Total Wins</p>
      <p className="header">Total Losses</p>
    </li>
    {players.map((player) => (
      <PlayerRecordListItem key={player.id} player={player} userId={user && user.id} />
    ))}
  </ul>
);

export default PlayerRecordList;