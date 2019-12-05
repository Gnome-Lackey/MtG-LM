import * as React from "react";
import * as classNames from "classnames";

import { Player } from "models/Player";

import "./styles.scss";

interface PlayerRecordListItemProps {
  player: Player;
  userId: string;
}

const PlayerRecordListItem: React.FunctionComponent<PlayerRecordListItemProps> = ({
  player,
  userId
}: PlayerRecordListItemProps): React.FunctionComponentElement<PlayerRecordListItemProps> => (
  <li className={classNames("player-record", { user: userId === player.id })}>
    <p className="name">
      {player.displayName}&nbsp;
      <span className="small">({player.userName})</span>
    </p>
    <p className="wins">{player.totalWins}</p>
    <p className="losses">{player.totalLosses}</p>
  </li>
);

export default PlayerRecordListItem;
