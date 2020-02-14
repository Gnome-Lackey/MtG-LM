import * as React from "react";
import * as classNames from "classnames";

import { Player } from "models/Player";

import "./styles.scss";

interface PlayerRecordListItemProps {
  hasPlayedUser: boolean;
  isLoggedInUser: boolean;
  hasWinAgainstPlayer: boolean;
  player: Player;
}

const renderIcon = (isLoggedInUser: boolean, hasPlayedUser: boolean): JSX.Element => {
  if (isLoggedInUser) {
    return null;
  } else if (hasPlayedUser) {
    return <i className="far fa-reward" />;
  }

  return <i className="far fa-minus-circle" />;
};

const PlayerRecordListItem: React.FunctionComponent<PlayerRecordListItemProps> = ({
  hasPlayedUser,
  isLoggedInUser,
  hasWinAgainstPlayer,
  player
}: PlayerRecordListItemProps): React.FunctionComponentElement<PlayerRecordListItemProps> => (
  <li
    className={classNames("player-record", {
      user: isLoggedInUser,
      win: hasPlayedUser && hasWinAgainstPlayer,
      loss: hasPlayedUser && !hasWinAgainstPlayer
    })}
  >
    {renderIcon(isLoggedInUser, hasPlayedUser)}
    <p className="name">
      {player.displayName}
      <span className="small">({player.userName})</span>
    </p>
    <p className="wins">{player.totalWins}</p>
    <p className="losses">{player.totalLosses}</p>
  </li>
);

export default PlayerRecordListItem;
