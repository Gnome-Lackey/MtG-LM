import * as React from "react";
import * as classNames from "classnames";

import { MatchRecord } from "models/Match";

import "./styles.scss";
import { Player } from "models/Player";

interface PlayerRecordListItemProps {
  player: Player;
  playerRecord: MatchRecord;
  loggedInUserRecord: MatchRecord;
  setCode: string;
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
  loggedInUserRecord,
  playerRecord,
  setCode,
}: PlayerRecordListItemProps): React.FunctionComponentElement<PlayerRecordListItemProps> => {
  const isLoggedInUser = loggedInUserRecord.id === playerRecord.id;
  const hasPlayedUser = !isLoggedInUser && loggedInUserRecord.opponentsPlayed.includes(playerRecord.id);
  const hasWinAgainstPlayer = hasPlayedUser && loggedInUserRecord.opponentsBeat.includes(playerRecord.id);

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
        <span className="small">
          ({player.epithet} / {player.userName})
        </span>
      </p>
      <p className="wins">{playerRecord.wins}</p>
      <p className="losses">{playerRecord.losses}</p>
    </li>
  );
};

export default PlayerRecordListItem;
