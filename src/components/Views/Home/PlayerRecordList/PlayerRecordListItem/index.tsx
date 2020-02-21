import * as React from "react";
import * as classNames from "classnames";

import { Player } from "models/Player";
import { SeasonMetadata } from "models/Season";

import "./styles.scss";

interface PlayerRecordListItemProps {
  player: Player;
  playerMetadata: SeasonMetadata;
  setCode: string;
  userMetadata: SeasonMetadata;
}

const renderIcon = (
  isLoggedInUser: boolean,
  hasPlayedUser: boolean,
  hasWinAgainstPlayer: boolean
): JSX.Element => {
  if (isLoggedInUser || !hasPlayedUser) {
    return null;
  } else if (hasWinAgainstPlayer) {
    return <i className="match-status-icon fas fa-trophy" />;
  }

  return <i className="match-status-icon fas fa-skull" />;
};

const PlayerRecordListItem: React.FunctionComponent<PlayerRecordListItemProps> = ({
  player,
  playerMetadata,
  setCode,
  userMetadata
}: PlayerRecordListItemProps): React.FunctionComponentElement<PlayerRecordListItemProps> => {
  const userMatchWin = userMetadata.matches.find(
    (match) =>
      match.isSeasonPoint &&
      match.winner === userMetadata.player &&
      match.losers.includes(player.id)
  );

  const isLoggedInUser = userMetadata.player === player.id;
  const hasPlayedUser = userMetadata.playedOpponents.includes(player.id);
  const hasWinAgainstPlayer = hasPlayedUser && userMatchWin !== undefined;

  return (
    <li
      className={classNames("player-record", {
        user: isLoggedInUser,
        win: hasWinAgainstPlayer,
        loss: !hasWinAgainstPlayer
      })}
    >
      <i className={`set-icon ss ss-${setCode}`} />
      {renderIcon(isLoggedInUser, hasPlayedUser, hasWinAgainstPlayer)}
      <p className={classNames("name", { unplayed: !hasPlayedUser })}>
        {player.displayName}
        <span className="small">({player.epithet} / {player.userName})</span>
      </p>
      <p className="wins">{playerMetadata.seasonWins}</p>
      <p className="losses">{playerMetadata.seasonLosses}</p>
    </li>
  );
};

export default PlayerRecordListItem;
